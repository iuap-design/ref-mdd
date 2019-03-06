import React, { Component } from 'react';
import { Upload, Icon } from 'antd';
import { Label, Row } from './index';

export default class Avatar extends Component {
  constructor(props) {
    super(props);
    const { cStyle } = props;
    let config = null;
    if (cStyle) {
      try {
        config = JSON.parse(cStyle);
      } catch (e) {
        config = {};
      }
    }
    this.state = Object.assign({
      displaymode: 'default',
      bIsNull: props.bIsNull,
      visible: !props.bHidden,
      err: '',
      msg: ''
    }, config);
    this.DocumentServerAddress = 'https://oivs4lxfc.bkt.clouddn.com';
    const proxy = cb.rest.DynamicProxy.create({ getFileServerUrl: { url: '/pub/fileupload/getFileServerUrl.do', method: 'GET' } });
    proxy.getFileServerUrl((err, result) => {
      if (result)
        this.DocumentServerAddress = result;
    });
  }
  componentDidMount() {
    if (this.props.model)
      this.props.model.addListener(this);
  }
  componentWillUnmount() {
    if (this.props.model)
      this.props.model.removeListener(this);
  }
  beforeUpload(file) {
    const isJPGOrPNG = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJPGOrPNG)
      cb.utils.alert('图片仅支持JPG、PNG格式', 'error');
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M)
      cb.utils.alert('文件必须小于2M', 'error');
    return isJPGOrPNG && isLt2M;
  }
  handleChange = (info) => {
    if (info.file.status === 'done') {
      if (info.file.response.code == 200) {
        const value = this.DocumentServerAddress + info.file.response.data;
        if (this.props.model)
          this.props.model.setValue(value, true);
        cb.utils.alert(`${info.file.name} 上传成功！`, 'success');
      } else {
        cb.utils.alert(`${info.file.name} 上传失败！${info.file.response.code} : ${info.file.response.message}`, 'error');
      }
    } else if (info.file.status === 'error') {
      cb.utils.alert(`${info.file.name} 上传失败！${info.file.response.code} : ${info.file.response.message}`, 'error');
    }
  }
  validate(val) {
    this.setState({
      err: 'has-' + val.type,
      msg: val.message
    });
  }
  baseControl() {
    const { readOnly, value, tooltip, displaymode } = this.state;
    const className = `basic-avatar-${displaymode}`;
    if (readOnly)
      return (
        value && value != '' ?
          <img className={className} src={value} alt="" />
          :
          <div className={`no-avatar-man ${className}`}></div>
      );
    const action = '/upload?token=' + cb.rest.AppContext.token;
    return (
      <Row className={`face-img ${className}`}>
        <Upload
          className="avatar-uploader"
          showUploadList={false}
          action={action}
          beforeUpload={this.beforeUpload}
          onChange={this.handleChange}
          accept="image/gif,image/jpeg,image/png,image/x-ms-bmp"
        >
          {
            value ?
              <div className='info-person info-person-01'>
                <img src={value + '?imageView2/1/w/80/h/80'} alt="" />
                <div className='info-person-mask'><Icon type='uploadimg' /><p>修改图片</p></div>
              </div> :
              <div className='info-person info-person-01'>
                <span>ICON</span>
                <Icon type='plus' className="avatar-uploader-trigger" />
                <div className='info-person-mask'><Icon type='uploadimg' /><p>上传图片</p></div>
              </div>
          }
        </Upload>
        <span>{tooltip || '图标仅支持JPG、PNG格式，文件小于2M（方形图）'}</span>
      </Row>
    );
  }
  getControl() {
    const { cShowCaption } = this.props;
    const title = !this.state.readOnly && this.state.bIsNull === false && cShowCaption ? <label><Icon type='star' />{cShowCaption}</label> : <label>{cShowCaption}</label>;
    let control = (cShowCaption ? <Label titleClassName='logo-face-label' control={this.baseControl()} title={title} /> : this.baseControl());
    return control;
  }
  render() {
    const control = this.getControl();
    let style = this.state.visible ? {} : { display: "none" };
    let errClass = 'has-feedback ' + this.state.err;
    return (
      <div style={style} className={errClass}>
        {control}
        <div className="ant-form-explain">{this.state.msg}</div>
      </div>
    );
  }
}
