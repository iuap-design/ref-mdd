import React, { Component } from 'react';
import { Map, Marker, Polygon, Polyline, PolyEditor, Circle, CircleEditor } from 'react-amap';
import Label from './label';
import text from './text';
import Row from './row';
import { Input } from 'antd';

let defaultPosition = ['116.238822', '40.068734']
export default class AMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bIsNull: props.bIsNull,
      address: '',
      position: props.position || ['116.238822', '40.068734'],
      inputChangeAddress: null,
      isBig: false,
      smallStyles: { position: 'relative', marginTop: '10px', height: '160px' },
      colNumber: props.iColWidth,
      deliveryMethod: '', /* 配送范围：'polygon'：多边形, 'circle': 圆形 */
      circleRadius: 5000, /* 只有deliveryMethod=‘circle’此属性才会生效 */
    }
    this.editorEvents = {
      created: this.PolyEditorCreated,
      addnode: this.PolyEditorClose,
      adjust: this.PolyEditorClose,
      removenode: this.PolyEditorClose,
      end: this.PolyEditorClose,
    };
    this.circleEditorEvents = {
      created: this.circleEditorCreated,
      addnode: this.circleEditorClose,
      adjust: this.circleEditorClose,
      removenode: this.circleEditorClose,
      end: this.circleEditorClose,
    }
    this.polygonStyle = {
      fillOpacity: 0.3,
      fillColor: '#588CE9',
      strokeColor: '#588CE9',
      // strokeWeight: 3,
    }

  }

  PolyEditorCreated = (ins) => {
    this.PolyEditorInstance = ins
    this.mapInstance.setFitView(this.mapInstance.getAllOverlays())
  }
  circleEditorCreated = (ins) => {
    this.circleEditorInstance = ins
    this.mapInstance.setFitView(this.mapInstance.getAllOverlays())
  }
  mapCreated = (ins) => {
    this.mapInstance = ins
  }
  /* 节点增删改都从新计算 */
  PolyEditorClose = (obj) => {
    let currentPathCollect = obj.target.getPath();
    if (this.props.model && obj.type !== 'end') 
      this.props.model.execute('polygonPath', currentPathCollect);
  }
  circleEditorClose = (obj) => {
    let currentRadius = obj.target.getRadius();
    if (this.props.model) 
      this.props.model.execute('circleRadius', currentRadius);
  }

  shouldComponentUpdate(nextProps, nextState){
    if(nextState.deliveryMethod === 'circle' && this.state.deliveryMethod === 'polygon'){
      this.PolyEditorInstance && this.PolyEditorInstance.close()
    }
    return true
  }

  componentDidMount() {
    if (this.props.model)
      this.props.model.addListener(this);
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.flag === this.state.flag) return;
    this.props.model.getParent().execute('afterRenderComponent');
  }
  setListenerState(params) {
    const { value } = params;
    delete params.value;
    this.setState(params);
    if (value)
      this.setValue(value);
  }
  setValue(value) {//value格式：{ longitude: 'id', latitude: 'name', address: 'remote' }
    if (!value || this.isValueEqual(value.longitude, value.latitude, value.address)) return;
    var locationX = value.longitude || '116.238822';
    var locationY = value.latitude || '40.068734';
    var address = value.address;
    this.setState({ position: [locationX, locationY], address });
  }
  isValueEqual(longitude, latitude, address1) {
    const { position, address } = this.state;
    return longitude === position[0] && latitude === position[1] && address1 === address;
  }
  addressToLngLat = (address) => {
    if (!address) return;
    var proxy = cb.rest.DynamicProxy.create({
      geocoder: { url: 'geocoder', method: 'GET', options: { token: false, uniform: false } }
    });
    proxy.geocoder({ address: address }, function (err, result) {
      if (err) {
        console.error(err.message);
        return;
      }
      if (!result) return
      const position = result.geocodes[0].location;
      const lng = position.split(',')[0];
      const lat = position.split(',')[1];
      console.log(lng);
      console.log(lat);
      if (this.props.model){
        this.props.model.setValue({ longitude: lng, latitude: lat, address: address }, true);
        /* 位置改变，抛出一个默认的以此为中心的栅栏 */
        let path = this.getDefaultPolygonPath()
        let collectPath = path.map(ele=>{
          return {Q:ele.latitude,N:ele.longitude,lng:ele.longitude,lat:ele.latitude}
        })
        this.props.model.execute('polygonPath', collectPath);
      }
    }, this);
  }
  locationToAddress = (location, longitude, latitude) => {
    if (!location) return;
    var proxy = cb.rest.DynamicProxy.create({
      geocoder: { url: 'geoaddress', method: 'GET', options: { token: false, uniform: false } }
    });
    proxy.geocoder({ location: location }, function (err, result) {
      if (err) {
        console.error(err.message);
        return;
      }
      this.props.model.setValue({ longitude: longitude, latitude: latitude, address: result.regeocode.formatted_address }, true);
    }, this);
  }
  mapEvents = (e) => {
    let location = e.lnglat.lng + ',' + e.lnglat.lat;
    this.locationToAddress(location, e.lnglat.lng, e.lnglat.lat);
  }
  getAmap() {
    let position = this.state.position;
    const markerCenter = {
      longitude: position[0],
      latitude: position[1],
    }
    const events = {
      click: this.mapEvents,
      created: this.mapCreated,
    }
    let innerContent = this.getInnerAmap(markerCenter)
    return (
      <div style={this.state.isBig ? this.state.bigStyles : this.state.smallStyles}>
        <Map
          center={markerCenter}
          zoom={14}
          events={events}
        >
          <Marker position={markerCenter} />
          {innerContent}
        </Map>
        <button onClick={() => this.handleButtonClick()} style={{ position: 'absolute', top: '3px', right: '2px', zIndex: '99' }}>{this.state.isBig ? '缩小' : '展开'}</button>
      </div>
    )
  }

  getInnerAmap(markerCenter){
    let defaultPolygonPath = this.getDefaultPolygonPath()
    if(this.state.deliveryMethod === 'polygon'){
      return (
        <Polygon path={defaultPolygonPath} style={this.polygonStyle}>
            <PolyEditor active={true} events={this.editorEvents} />
        </Polygon>
      )
    } else if (this.state.deliveryMethod === 'circle'){
      return (
        <Circle radius={this.state.circleRadius || 5000} center={markerCenter} style={this.polygonStyle} events={this.circleEditorEvents}>
            {/* <CircleEditor events={this.circleEditorEvents} active={this.state.__active} /> */}
        </Circle>
      )
    } else {
      return null
    }
  }

  getDefaultPolygonPath(){
    let defaultPosition = this.state.position
    if(this.state.polygonPath)
      return this.state.polygonPath
    return [
      {longitude: Number(defaultPosition[0])-0.05, latitude: Number(defaultPosition[1])-0.04 },
      {longitude: Number(defaultPosition[0])-0.05, latitude: Number(defaultPosition[1])+0.04 },
      {longitude: Number(defaultPosition[0])+0.05, latitude: Number(defaultPosition[1])+0.04 },
      {longitude: Number(defaultPosition[0])+0.05, latitude: Number(defaultPosition[1])-0.04 },
    ]
  }

  handleButtonClick() {
    this.setState({
      isBig: !this.state.isBig,
      bigStyles: {
        position: 'relative',
        width: (this.state.colNumber == 2) ? (document.body.clientWidth - 342 - 67) : ((document.body.clientWidth - 390) * 0.8 - 204),
        height: (this.state.colNumber == 2) ? ((document.body.clientWidth - 342 - 67)*0.5) : (((document.body.clientWidth - 390) * 0.8 - 204)*0.5),
        marginTop: '10px'
      },
    });
  }

  baseControl() {
    let { inputChangeAddress, address } = this.state;
    return (
      <Row>
        {
          this.state.readOnly ? text(address) :
            <Input value={address}
              onChange={e => this.handleInputChange(e)}
              onPressEnter={e => this.onPressEnter(e)}
              onBlur={e => this.handleInputBlur(e)} />
        }
        {this.getAmap()}
      </Row>
    );
  }
  handleInputChange(e) {
    this.setState({
      address: e.target.value
    });
  }
  onPressEnter(e) {
    let value = e.target.value;
    this.addressToLngLat(value);
  }
  handleInputBlur(e) {
    let value = e.target.value;
    if (value === this.state.address) return;
    this.addressToLngLat(value);
  }
  getControl() {
    const { cShowCaption } = this.props;
    const title = !this.state.readOnly && this.state.bIsNull === false && cShowCaption ? <label><Icon type='star' />{cShowCaption}</label> : <label>{cShowCaption}</label>;
    let control = (cShowCaption ? <Label control={this.baseControl()} title={title} /> : this.baseControl());
    return control;
  }
  render() {
    let control = this.getControl();
    return (
      <div className='map'>
        {control}
      </div>
    );
  }
}
