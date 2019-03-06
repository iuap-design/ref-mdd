import React from 'react';
//import { Row, Col } from 'antd';
import Row from './row';
import Col from './col';

export default class LabelControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      value: this.props.value,
      control: this.props.control,
      visible: !props.bHidden,
      style: this.props.style,
      hideControl: this.props.hideControl,
      isInFilterJSX: this.props.isInFilterJSX
    }
    this.getBaseControl = this.getBaseControl.bind(this);
  }
  componentDidMount() {
    if (this.props.model)
      this.props.model.addListener(this);
  }

  componentWillUnmount() {
    if (this.props.model)
      this.props.model.removeListener(this);
  }
  componentDidUpdate() {
    if (this.props.model)
      this.props.model.addListener(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      title: nextProps.title,
      control: nextProps.control,
      style: nextProps.style
    });
  }
  getBaseControl() {
    return <div style={this.state.style}>{this.state.value}</div>
  }
  render() {
    let title = this.state.title;
    let control = this.state.control ? this.state.control : this.getBaseControl();
    let selfStyle = this.state.visible ? {} : { display: "none" };
    let m;


    if (this.state.hideControl == true) {
      m = (<Row style={selfStyle} colCount={3}>
        {
          title && <Col className='label-control' span={3}>{title}</Col>
        }
      </Row>)
    }
    else if (this.state.isInFilterJSX == true) {
      m = (<Row colCount={24}>
        {
          title && <Col className='label-control'>{title}</Col>
        }
        <div className='input-control'>{control}</div>
      </Row>);

      /*m = (<div className='input-control' >
        {
          title && <Col className='label-control' style={{ width: '88px' }}>{title}</Col>
        }
        <div className='input-control'>{control}</div>
      </div>);*/

      /*m = (<Row colCount={24}>
        {
          title && <Col className='label-control' style={{ width: '88px' }}>{title}</Col>
        }
        <div className='input-control'>{control}</div>
      </Row>);*/
      /*m = (<Row colCount={24}>
        {
          title && <Col className='label-control' span={12}>{title}</Col>
        }
        <Col className='input-control' span={12}>{control}</Col>
      </Row>);*/
    }
    else {
      let titleClassName = this.props.titleClassName ? this.props.titleClassName : '';
      m = (<Row style={selfStyle} colCount={10}>
        {
          title && <Col className={'label-control ' + titleClassName} span={4}>{title}</Col>
        }
        <Col className='input-control control-width' span={6} >{control}</Col>
      </Row>)
    }
    return m;

  }
}
