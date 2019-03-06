import React from 'react';
import { /*Row, Col,*/ Input, Icon } from 'antd';
import classNames from 'classnames';
import Row from './row';
import Col from './col';
import Label from './label';
import text from './text';
import Button from './button';
import ReferModal from '../refer';
// const InputGroup = Input.Group;
// const Search = Input.Search;
import SvgIcon from 'SvgIcon';
import env from '../../helpers/env';

export default class ReferControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      touch: env.INTERACTIVE_MODE === 'touch',
      bIsNull: props.bIsNull,
      visible: !props.bHidden,
      focus: false,
      modalVisible: false,
      value: this.props.value,
      referType: '',
      disabled: this.props.disabled || false,
      width: 600,
      title: '参照',
      err: '',
      msg: '',
      showClear: false,
      focused: false,
    };
    this.onClick = this.onClick.bind(this);
    this.close = this.close.bind(this);
    this.handleBodyClick = this.handleBodyClick.bind(this);
  }
  getModel() {
    return this.props.model || this.model;
  }
  componentDidMount() {
    if (this.props.model)
      this.props.model.addListener(this);
    if (this.props.focus)
      this.refs.inputSearch.refs.input.focus();
    document.body.addEventListener('click', this.handleBodyClick);
  }
  componentDidUpdate() {
    if (this.props.model)
      this.props.model.addListener(this);
    // if (this.props.focus)
    //   this.refs.input.refs.input.focus();
  }
  componentWillReceiveProps(nextProps) {
    if (!this.props.model && nextProps.model)
      nextProps.model.addListener(this);
    if (nextProps.value === this.props.value) return;
    this.setState({ value: nextProps.value });
    if (typeof this.props.valueChange == 'function')
      this.props.valueChange(nextProps.value);
  }
  componentWillUnmount() {
    document.body.removeEventListener('click', this.handleBodyClick);
    let model = this.getModel();
    if (model)
      model.removeListener(this);
  }
  handleInputChange = (e) => {
    if (!e.target.value) {
      let model = this.getModel();
      if (model)
        model.setValue(null, true);
    }
    this.setState({
      value: e.target.value
    });
  }
  emitEmpty = () => {
    const model = this.getModel();
    if (model)
      model.setValue(null, true);
    this.refs.inputSearch.refs.input.focus();
  }
  handleBodyClick = (e) => {
    if (!this.refs.inputSearch) return;
    if (e.target === this.refs.inputSearch.refs.input || e.target.classList.contains('anticon-canzhao') || e.target.classList.contains('anticon-close-circle')) return;
    document.body.removeEventListener('click', this.handleBodyClick);
    this.setState({ focused: false });
    let model = this.getModel();
    if (model)
      model.execute('blur');
  }
  handleFocus = (e) => {
    let model = this.getModel();
    if (!model && this.props.cRefType) {
      this.model = new cb.models.ReferModel({ cRefType: this.props.cRefType, multiple: this.props.multiple, isList: this.props.isList ? true : false, value: this.props.value });
      this.model.addListener(this);
      model = this.getModel();
    }
    if (model)
      model.browse(false, vm => {
        this.vm = vm;
      });
    this.setState({ focused: true });
  }
  open(e) {
    document.body.removeEventListener('click', this.handleBodyClick);
    this.setState({
      referType: e.referType,
      vm: e.vm,
      modalVisible: true
    });
  }
  close() {
    this.setState({ modalVisible: false, focused: false });
    let model = this.getModel();
    if (model)
      model.execute('blur');
  }
  setValue(value) {
    document.body.removeEventListener('click', this.handleBodyClick);
    this.setState({
      modalVisible: false,
      value: value
    });
    if (!this.isEnterMode) return;
    this.isEnterMode = false;
    let model = this.getModel();
    if (model)
      model.execute('blur');
  }
  onClick() {
    let model = this.getModel();
    if (!model && this.props.cRefType) {
      this.model = new cb.models.ReferModel({ cRefType: this.props.cRefType, multiple: this.props.multiple, isList: this.props.isList ? true : false, value: this.props.value });
      this.model.addListener(this);
      model = this.getModel();
    }
    if (model)
      model.browse();
  }
  handleJointQuery() {
    let model = this.getModel();
    if (!model && this.props.cRefType) {
      this.model = new cb.models.ReferModel({ cRefType: this.props.cRefType, multiple: this.props.multiple, isList: this.props.isList ? true : false, value: this.props.value });
      this.model.addListener(this);
    }
    model = this.getModel();
    if (model)
      model.fireEvent('jointQuery');
  }
  handleOnPressEnter(e) {
    if (this.isEnterMode) return;
    this.isEnterMode = true;
    e.nativeEvent.stopImmediatePropagation();
    e.nativeEvent.stopPropagation();
    let model = this.getModel();
    if (model) {
      model.fireEvent('pressEnter', this.state.value);
    }
    this.vm && this.vm.fireEvent('pressEnter', { value: this.state.value, model: model, callback: this.resetEnterMode });
  }
  resetEnterMode = () => {
    this.isEnterMode = false;
  }
  handleInputBlur(e) {
    let value = e.target.value === '' ? null : e.target.value;
    if (this.props.model)
      this.props.model.setState('text', value);
    this.setState({ focused: false });
  }
  setDisabled(val) {
    this.setState({
      disabled: val
    });
  }
  validate(val) {
    this.setState({
      err: 'has-' + val.type,
      msg: val.message
    });
  }
  onMouseEnter = () => {
    this.setState({ showClear: true });
  }
  onMouseLeave = () => {
    this.setState({ showClear: false });
  }
  baseControl() {
    let baseControl;
    if (this.state.readOnly) {
      baseControl = text(this.state.value);
    }
    else {
      const { style, size, placeholder } = this.props;
      let referTitle = '';
      if (this.props.title) {
        referTitle = <Col span={6}>{this.props.title}</Col>;
      }

      const btnCls = classNames({
        'ant-search-btn': true,
        //'ant-search-btn-noempty': !!this.state.value.trim(),
      });

      const searchCls = classNames({
        'ant-search-input': true,
        'ant-search-input-focus': this.state.focus,
      });
      //{this.props.cShowCaptionaa ? <Col span={6}>{this.props.cShowCaptionaa}</Col> : null}
      let suffix;
      if (!this.state.disabled) {
        const suffixItems = [];
        if (this.state.value && (this.state.showClear || this.state.touch || this.state.focused))
          suffixItems.push(<Icon type="close-circle" onClick={this.emitEmpty} />);
        suffixItems.push(<Icon type="canzhao" onClick={this.onClick} />);
        suffix = <div>{suffixItems}</div>
      }
      baseControl = (
        <Row className={this.state.err}>
          <Col span="line">
            <div className="ant-search-input-wrapper" onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} style={style}>

              <Input readOnly={this.state.touch} ref="inputSearch" disabled={this.state.disabled} placeholder={placeholder}
                value={this.state.value} onFocus={this.handleFocus} onChange={e => this.handleInputChange(e)}
                suffix={suffix} onPressEnter={e => this.handleOnPressEnter(e)}
                onBlur={e => this.handleInputBlur(e)} onClick={this.state.touch ? this.onClick : null}
              />
              <ReferModal visible={this.state.modalVisible} close={this.close} title={this.props.cShowCaption ? this.props.cShowCaption : this.props.title} model={this.state.vm} afterOkClick={this.props.afterOkClick} referType={this.state.referType} />
            </div>
          </Col>
        </Row>
      )
    }
    return baseControl;
  }
  getControl() {
    const { bJointQuery, cShowCaption } = this.props;
    let title = bJointQuery ? <a onClick={e => this.handleJointQuery(e)}>{cShowCaption}</a> : cShowCaption;
    title = !this.state.readOnly && this.state.bIsNull === false && cShowCaption ? <label><Icon type='star' />{title}</label> : <label>{title}</label>;
    let control = (cShowCaption ? <Label control={this.baseControl()} title={title} /> : this.baseControl());
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
