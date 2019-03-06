import React, { Component } from 'react';
import Label from './label';
import text from './text';
import Row from './row';
import { Input } from 'antd';

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bIsNull: props.bIsNull,
      value: '',
      position: this.props.position || '用友软件园',
      locationX: this.props.locationX || '',
      locationY: this.props.locationY || '',
      big: false,
      styles: {
        width: this.props.samllWidth || '280px',
        height: this.props.smallHeight || '160px',
        position: 'relative'
      },
      boxStyles: {
        width: this.props.samllWidth || '280px',
        height: this.props.smallHeight || '160px'
      },
      mapChangeBigStyle: { marginTop: '10px' }
    }
    this.handleClick = this.handleClick.bind(this);

    this.first = true;
    this.lastPosition = null;
  }
  componentDidMount() {

    if (this.props.model)
      this.props.model.addListener(this);
    // if(!this.map)
    // var self = this;
    cb.requireInner(['http://api.map.baidu.com/getscript?v=2.0&ak=Xc0b88CMj1YgLa1rTLvLungBPKmIaoMo'], () => {
      this.map = new BMap.Map(this.refs.allmap);
      this.setState({ flag: true });
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.flag === this.state.flag) return;
    this.props.model.getParent().execute('afterRenderComponent');
  }
  isValueEqual(longitude, latitude, address) {
    const { locationX, locationY, position } = this.state;
    return longitude === locationX && latitude === locationY && address === position;
  }
  setValue(value) {//value格式：{ longitude: 'id', latitude: 'name', address: 'remote' }
    if (this.isValueEqual(value.longitude, value.latitude, value.address)) return;
    var locationX = value.longitude;
    var locationY = value.latitude;
    var position = value.address;
    var value = position;

    // if (this.state.locationX != locationX || this.state.locationY != locationY || this.state.position != position)
    this.setState({ locationX, locationY, position, value });
  }
  componentWillReceiveProps(nextProps) {
    if (!this.props.position || this.props.position === nextProps.position) return
    this.setState({
      position: nextProps.position
    })
  }
  getmap() {
    if (!this.map) {
      return (<div ref="allmap"></div>);
    } else {
      if (this.state.position != '') {
        if (this.state.position !== this.lastPosition) {
          this.lastPosition = this.state.position;
          var self = this;
          // 创建地址解析器实例
          var myGeo = new BMap.Geocoder();
          // 将地址解析结果显示在地图上,并调整地图视野
          myGeo.getPoint(this.state.position, function (point) {

            if (point) {
              self.map.centerAndZoom(point, 16);
              self.map.addOverlay(new BMap.Marker(point));
              self.map.enableScrollWheelZoom(true);

              if (self.props.model) {
                //地址解析成坐标
                var localSearch = new BMap.LocalSearch(self.map);
                localSearch.enableAutoViewport(); //允许自动调节窗体大小
                var keyword = self.state.position;
                localSearch.setSearchCompleteCallback(function (searchResult) {
                  if (self.first) {
                    self.first = false;
                    return;
                  }
                  var poi = searchResult.getPoi(0);
                  if (self.isValueEqual(poi.point.lng, poi.point.lat, self.state.position)) return;
                  var value = {};
                  value.longitude = poi.point.lng;
                  value.latitude = poi.point.lat;
                  value.address = self.state.position;
                  self.props.model.setValue(value, true);
                });
                localSearch.search(keyword);
              }
            } else {

              function myFun(result) {
                var cityName = result.name;
                self.map.setCenter(cityName);
              }
              var myCity = new BMap.LocalCity();
              myCity.get(myFun);
              cb.utils.alert('您输入的地址有误，请填写正确的地址', 'warning')
            }
          }, "北京市");
        };
      }
      if (this.state.position == '' && this.state.locationX != '' && this.state.locationY != '') {
        this.map.clearOverlays();
        var new_point = new BMap.Point(this.state.locationX, this.state.locationY);
        this.map.centerAndZoom(new_point, 16);
        this.map.enableScrollWheelZoom(true);
        var marker = new BMap.Marker(new_point);  // 创建标注
        this.map.addOverlay(marker);              // 将标注添加到地图中
        this.map.panTo(new_point);
      }
      return (
        <div style={this.state.mapChangeBigStyle}>
          <div style={this.state.boxStyles}>
            <div style={this.state.styles} ref="allmap"></div>
            <button style={{ position: 'absolute', top: '0', right: '0', zIndex: '99' }} onClick={this.handleClick}>{this.state.big ? '缩小' : '展开'}</button>
          </div>
        </div>
      );
    }
  }
  baseControl() {
    let { value, position } = this.state;
    if (value && typeof value === 'object')
      value = position;
    return (
      <Row>
        {
          this.state.readOnly ? text(value) :
            <Input value={value}
              onChange={e => this.handleInputChange(e)}
              onPressEnter={e => this.onPressEnter(e)}
              onBlur={e => this.handleInputBlur(e)} />
        }
        {this.getmap()}
      </Row>
    );
  }
  handleInputChange(e) {
    this.setState({
      value: e.target.value
    });
  }
  onPressEnter(e) {
    let value = e.target.value;
    this.setState({
      position: value
    })
  }
  handleInputBlur(e) {
    let value = e.target.value;
    if (value === this.state.position) return;
    this.setState({
      position: value
    })
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
  handleClick() {
    var self = this;
    if (this.state.big == false) {
      self.setState({
        styles: { width: self.props.bigWidth || '100%', height: self.props.bigHeight || '800px' },
        boxStyles: { width: self.props.bigWidth || '800px', height: self.props.bigHeight || '800px' },
        mapChangeBigStyle: { width: (document.body.clientWidth - 342 - 67), marginTop: '10px' },
        big: true
      })
    };
    if (this.state.big == true) {
      self.setState({
        styles: { width: self.props.smallWidth || '280px', height: self.props.smallHeight || '160px' },
        boxStyles: { width: self.props.smallWidth || '280px', height: self.props.smallHeight || '160px' },
        mapChangeBigStyle: { marginTop: '10px' },
        big: false
      })
    }
  }
}
