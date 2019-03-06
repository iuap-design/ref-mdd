import React, { Component } from 'react';
import { Radio, DatePicker } from 'antd';
import moment from 'moment';
import Row from './row';
import Col from './col';
import Label from './label';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

export default class PredicateDatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      predicateValue: null,
      startValue: null,
      endValue: null,
      endOpen: false,
      format: 'YYYY-MM-DD',
      startSuffix: ' 00:00:00',
      endSuffix: ' 23:59:59'
    };
  }
  componentDidMount() {
    if (this.props.model)
      this.props.model.addListener(this);
  }
  componentDidUpdate() {
    if (this.props.model)
      this.props.model.addListener(this);
  }
  componentWillUnmount() {
    if (this.props.model)
      this.props.model.removeListener(this);
  }
  setListenerState(params) {
    const { valueField, textField, value, dataSource, defaultValue } = params;
    this.valueField = valueField;
    this.textField = textField;
    delete params.valueField;
    delete params.textField;
    delete params.value;
    this.setState(params);
    if (defaultValue === false) {
      this.setValue(value && value[valueField] || value);
    } else {
      this.setValue(cb.utils.isEmpty(value) ? dataSource && dataSource.length && dataSource[0][valueField] : value[valueField] || value);
    }
  }
  setValue(value) {
    if (cb.utils.isEmpty(value)) {
      this.setState({ predicateValue: null, startValue: null, endValue: null });
    } else if (typeof value === 'object') {
      const { value1, value2, predicateValue } = value;
      const startValue = value1 && moment(value1) || null, endValue = value2 && moment(value2) || null;
      // const predicateValue = this.fitPredicateValue(startValue, endValue);
      this.setState({ predicateValue, startValue, endValue });
    } else {
      this.onPredicateChange(value);
    }
  }
  onPredicateChange(predicateValue) {
    const { format, startSuffix, endSuffix } = this.state;
    switch (predicateValue) {
      case '0':
        const today = moment().format(format);
        this.setModelValue(today + startSuffix, today + endSuffix, predicateValue);
        break;
      case '-1':
        const yesterday = moment().subtract(1, 'days').format(format);
        this.setModelValue(yesterday + startSuffix, yesterday + endSuffix, predicateValue);
        break;
      case '-7':
        this.setModelValue(moment().subtract(6, 'day').format(format) + startSuffix, moment().format(format) + endSuffix, predicateValue);
        break;
      case '-30':
        this.setModelValue(moment().subtract(29, 'day').format(format) + startSuffix, moment().format(format) + endSuffix, predicateValue);
        break;
    }
  }
  disabledStartDate = (startValue) => {
    const { endValue, format, endSuffix } = this.state;
    if (!startValue || !endValue)
      return false;
    const endDate = moment(endValue.format(format) + endSuffix, format + ' HH:mm:ss');
    return startValue.valueOf() > endDate.valueOf();
  }
  disabledEndDate = (endValue) => {
    const { startValue, format, startSuffix } = this.state;
    if (!endValue || !startValue)
      return false;
    const startDate = moment(startValue.format(format) + startSuffix, format + ' HH:mm:ss');
    return endValue.valueOf() < startDate.valueOf();
  }
  onStartChange = (value) => {
    const { format, startSuffix, endSuffix, endValue } = this.state;
    const value1 = value && value.format(format) + startSuffix || null;
    const value2 = endValue && endValue.format(format) + endSuffix || null;
    this.setModelValue(value1, null);
  }
  onEndChange = (value) => {
    const { startValue, format, startSuffix, endSuffix } = this.state;
    const value1 = startValue && startValue.format(format) + startSuffix || null;
    const value2 = value && value.format(format) + endSuffix || null;
    const predicateValue = this.fitPredicateValue(value1, value2);
    this.setModelValue(value1, value2, predicateValue);
  }
  setModelValue(value1, value2, predicateValue) {
    this.props.model.setValue({ value1, value2, predicateValue }, true);
  }
  handleStartOpenChange = (open) => {
    const { endValue } = this.state;
    if (!open)
      this.setState({ endOpen: true });
  }
  handleEndOpenChange = (open) => {
    this.setState({ endOpen: open });
  }
  fitPredicateValue(startValue, endValue) {
    const { format } = this.state;
    const startString = startValue && startValue.format(format);
    const endString = endValue && endValue.format(format);
    if (!startString || !endString) return;
    const today = moment().format(format);
    if (startString === today && endString === today)
      return '0';
    const yesterday = moment().subtract(1, 'days').format(format);
    if (startString === yesterday && endString === yesterday)
      return '-1';
    if (startString === moment().subtract(6, 'day').format(format) && endString === today)
      return '-7';
    if (startString === moment().subtract(29, 'days').format(format) && endString === today)
      return '-30';
  }
  baseControl() {
    const { dataSource } = this.state;
    if (!dataSource || !dataSource.length)
      return null;
    const valueField = this.valueField, textField = this.textField;
    const options = [];
    dataSource.forEach(item => {
      options.push(<RadioButton value={item[valueField]}>{item[textField]}</RadioButton>);
    });
    const { predicateValue, startValue, endValue, endOpen } = this.state;
    let isInPanel = this.props.isInPanel ? this.props.isInPanel : false;
    return (
      <Row className="m-b-10">
        <div style={{ float: 'left' }} className="m-r-10">
          <RadioGroup value={predicateValue} onChange={e => this.onPredicateChange(e.target.value)}>
            {options}
          </RadioGroup>
        </div>
        {isInPanel == false ?
          <div style={{ float: 'left' }}>
            <Row colCount={3}>
              <Col span={1} className="m-r-10">
                <DatePicker
                  disabledDate={this.disabledStartDate}
                  value={startValue}
                  onChange={this.onStartChange}
                  onOpenChange={this.handleStartOpenChange}
                />
              </Col>

              <div style={{ float: 'left' }} className="m-r-10">至</div>
              <Col span={1}>
                <DatePicker
                  disabledDate={this.disabledEndDate}
                  value={endValue}
                  onChange={this.onEndChange}
                  open={endOpen}
                  onOpenChange={this.handleEndOpenChange}
                />
              </Col>
            </Row>
          </div> : ""}
      </Row>
    );
  }
  render() {
    const { cShowCaption } = this.props;
    const control = this.baseControl();
    let isInPanel = this.props.isInPanel ? this.props.isInPanel : false;
    return (
      <div className='basic-predicate-data-picker'>
        {cShowCaption && isInPanel == false ? <Label isInFilterJSX control={control} title={cShowCaption} /> : control}
      </div>
    );
  }
}
