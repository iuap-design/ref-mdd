import React, { Component } from 'react';
import { Popover, Input, Modal, Icon, Button, Checkbox, Radio, Transfer, Select } from 'antd';
// import Row from './row';
// import Col from './col';
import SvgIcon from 'SvgIcon';
import * as  eChartCommon from '../echart/eChartCommon';
import * as  eChartProxy from '../echart/eChartProxy';
const RadioGroup = Radio.Group;
export default class SumAreaSetting extends React.Component {
  constructor(props) {
    super(props);
    const { viewModel } = props;
    const { billNo } = viewModel.getParams();
    this.state = {
      billnum: billNo,
      bShowList: false,
      showCardFieldName: "",
      showCardEle: {},
      bOnlyShowSelected: true,
      inMouseField: "",
      sumConfig: {}
    }
  }

  componentDidMount() { }

  render() {
    let self = this;
    let type = self.state.bShowList ? "up" : "down";
    let listContent2 = this.getListContent();
    let className = this.props.className;
    let conditionPop = (
      <div style={{ float: 'left' }} className={className}>
        <Popover
          placement="bottom"
          overlayClassName="sumareasetting_list"
          // overlayStyle={{ width: "600px" }}
          content={listContent2}
          trigger={"click"}
          visible={self.state.bShowList && _.isEmpty(listContent2) == false}
          onVisibleChange={(visible) => self.onVisibleChange(visible, self)}
        >
          <Button onClick={() => self.ShowList()} type={type}  >
            <SvgIcon type="huizongshezhi" className={"icon-huizongshezhi"} />
            <span>{self.props.name ? self.props.name : "汇总设置"}</span>
          </Button>
        </Popover>
      </div>
    );
    return conditionPop;
  }
  onVisibleChange(visible, self) {

    if (visible == false && self.state.showCardFieldName == "") {
      self.setState({ bShowList: false, showCardFieldName: "", bOnlyShowSelected: true });
    }
  }
  ShowList = () => {

    let self = this;
    let bShowList = !self.state.bShowList;
    if (bShowList == true) {
      self.setState({ bShowList, sumConfig: {}, showCardFieldName: "", bOnlyShowSelected: true });
      self.getConfig();
    }
    else {
      // self.setState({ bShowList, showCardFieldName: "", bOnlyShowSelected: true });
    }
  }

  sortClick(type, fieldname) {
    let sumConfig = this.state.sumConfig;
    let curIndex = _.findIndex(sumConfig.items, function (o) { return o.fieldname == fieldname })
    let index2 = -1;
    if (type == "up") {
      index2 = _.findLastIndex(
        sumConfig.items,
        function (o, index) {
          return o.selected == 1 && index < curIndex;
        });
    }
    else {
      index2 = _.findIndex(sumConfig.items,
        function (o, index) {
          return o.selected == 1 && index > curIndex;
        });
    }
    if (index2 >= 0 && index2 < sumConfig.items.length) {
      let tmp = sumConfig.items[curIndex];
      sumConfig.items[curIndex] = sumConfig.items[index2];
      sumConfig.items[index2] = tmp;
    }
    this.setState({ sumConfig });
  }
  ShowCard(ele) {
    let showCardEle = _.cloneDeep(ele);
    this.setState({ showCardEle: showCardEle, showCardFieldName: ele.fieldname });
  }
  onMouseEnter(bFlag, fieldname, index) {
    if (bFlag) {
      this.setState({ inMouseField: fieldname });
    }
    else {
      this.setState({ inMouseField: "" });
    }
  }

  onChecked(e, element, index) {
    let checked = e.target.checked;
    let sumConfig = this.state.sumConfig;
    if (checked && _.filter(sumConfig.items, function (o) { return o.selected == 1; }).length >= 8) {
      cb.utils.alert("最多选择8个汇总项。");
      this.setState({});
    }
    else {
      sumConfig.items[index].selected = checked ? 1 : 0;
      this.setState({ sumConfig });
    }
  }

  setShowCaption(value) {
    // let sumConfig = this.state.sumConfig;
    // let items = sumConfig.items;
    // let tmp = _.find(items, function (o) { return o.fieldname == fieldname });
    // if (tmp)
    //   tmp.showCaption = value;
    // this.setState({ sumConfig });
    let self = this;
    let showCardEle = self.state.showCardEle;
    showCardEle.showCaption = value;
    this.setState({ showCardEle });
  }

  handleRadioChange(value) {
    let self = this;
    let showCardEle = self.state.showCardEle;
    showCardEle.value = value;
    this.setState({ showCardEle });
  }

  handleCardOk() {
    let self = this;
    let showCardEle = self.state.showCardEle;
    let sumConfig = this.state.sumConfig;
    let tmp = _.find(sumConfig.items, function (o) { return o.fieldname == self.state.showCardFieldName });
    tmp.value = showCardEle.value;
    tmp.showCaption = showCardEle.showCaption;
    this.setState({ sumConfig, showCardFieldName: "" });
  }

  handleCardCancel() {
    this.setState({ showCardFieldName: "" });
  }


  getCardContent() {
    let self = this;
    let cardContent;
    let ele = self.state.showCardEle;
    // let items = self.state.sumConfig.items
    // let ele = _.find(items, function (o) { return o.fieldname == self.state.showCardFieldName });
    if (ele) {
      cardContent =
        <div>
          <div className="sumareasetting_disname">
            <span>显示名称:</span>
            <Input
              placeholder="显示名称"
              value={ele.showCaption ? ele.showCaption : ""}
              onChange={(e) => self.setShowCaption(e.target.value)}
            />
          </div>
          <div>
            <RadioGroup
              onChange={(e) => self.handleRadioChange(e.target.value)}
              value={ele.value ? ele.value : "sum"}>
              <Radio value={"sum"}>汇总</Radio>
              <Radio value={"count"}>计数</Radio>
              <Radio value={"avg"}>平均</Radio>
              <Radio value={"min"}>最小</Radio>
              <Radio value={"max"}>最大</Radio>
              <Radio value={"count_distinct"}>去重计数</Radio>
            </RadioGroup>
          </div>
          <div className="footer-btn">
            <Button type={"primary"} onClick={() => this.handleCardOk()}>确定</Button>
            <Button type={"default"} onClick={() => this.handleCardCancel()}>取消</Button>
          </div>
        </div>
    }

    return cardContent;
  }
  onCardVisibleChange(visible, self) {

    if (visible == false) {
      self.setState({ showCardFieldName: "" });
    }
  }

  getListContent() {
    let self = this;
    if (_.isEmpty(self.state.sumConfig)) {//|| self.state.bShowList == false
      return null;
    }
    else {
      let listContent = [];
      let listContentInner = [];
      let bOnlyShowSelected = self.state.bOnlyShowSelected ? true : false;
      listContent.push(
        <div className="sumarea_list_caption">
          <span className="sumareaset-left">汇总设置</span>
          <Checkbox
            title={"只显示已选"}
            checked={bOnlyShowSelected}
            onChange={(e) => { self.setState({ bOnlyShowSelected: !bOnlyShowSelected }) }}>
            {"只显示已选"}
          </Checkbox>
        </div>
      );
      let cardContent;//= this.getCardContent()
      let items = self.state.sumConfig.items
      let methordObj = { "sum": "汇总", "count": "计数", "avg": "平均", "min": "最小", "max": "最大", "count_distinct": "去重计数", }
      items.forEach(function (ele, index) {
        let item;
        let selected = ele.selected == 1 ? 1 : 0;
        cardContent = null;
        if (self.state.showCardEle.fieldname == ele.fieldname) {
          cardContent = self.getCardContent();
        }
        let showCurrent = (self.state.showCardFieldName == ele.fieldname ? true : false);
        if (selected || bOnlyShowSelected == false) {
          let bShowUpDown = (selected && ele.fieldname == self.state.inMouseField ? true : false);
          let updown = bShowUpDown ?
            <span className="sumarea_list_updown">
              <Button style={{ borderWidth: 0 }} icon="arrow-up" onClick={() => self.sortClick('up', ele.fieldname)}></Button>
              <Button style={{ borderWidth: 0 }} icon="arrow-down" onClick={() => self.sortClick('down', ele.fieldname)}></Button>
            </span>
            :
            <span></span>;
          item =
            <div className="sumarea_list_item"
              onMouseEnter={(e) => self.onMouseEnter(true, ele.fieldname, index)}
              onMouseLeave={(e) => self.onMouseEnter(false, ele.fieldname, index)}>
              <div className="sumarea_list_item_1" >
                <Checkbox title={ele.caption} checked={selected == 1 ? true : false} onChange={(e) => self.onChecked(e, ele, index)}>
                  {ele.caption}
                </Checkbox>
                <div className="sumarea_showcaption_all">
                  {ele.showCaption ? <div><span className="sumarea_showcaption_1">(</span> <span className="sumarea_showcaption_2"> {ele.showCaption}</span><span className="sumarea_showcaption_3">)</span> </div> : ""}
                </div>
              </div>
              {/* <Input
                placeholder="显示名称"
                value={ele.showCaption ? ele.showCaption : ""}
                onChange={(e) => self.setShowCaption(ele.fieldname, e.target.value)}
                style={{ width: '100px' }}
              /> */}
              <Popover
                placement="bottom"
                overlayClassName="sumareasetting_card"
                // overlayStyle={{ width: "600px" }}
                content={cardContent}
                trigger={"click"}
                visible={showCurrent}
                onVisibleChange={(visible) => self.onCardVisibleChange(visible, self)}
              >
                <div className="summary_select_all">
                  <Button
                    className={"sumarea_list_itemarrow_" + (showCurrent ? "1" : "0")}
                    disabled={!selected}
                    onClick={() => self.ShowCard(ele)}
                  >
                    {methordObj[ele.value ? ele.value : "sum"]}
                  </Button>
                  <Icon
                    type={showCurrent ? "up" : "down"}
                  />
                </div>
              </Popover>


              {updown}
            </div>;

          listContentInner.push(item);
        }
      }, this);
      listContent.push(<div className="sumarea_list_items">{listContentInner}</div>);
      return (
        <div>
          <div>{listContent}</div>
          <div className="footer-btn">
            <Button type={"primary"} onClick={() => this.handleOk()}>确定</Button>
            <Button type={"default"} onClick={() => this.handleCancel()}>取消</Button>
            <div className="sumarea_list_8">
              <span className="sumarea_list_8_1" >最多选择</span>
              <span className="sumarea_list_8_2" >8</span>
              <span className="sumarea_list_8_3" >个汇总项</span>
            </div>
          </div>
        </div>
      );

    }
  }


  handleOk = () => {
    let self = this;
    let sumConfig = self.state.sumConfig;
    let params = {};
    params.billnum = self.state.billnum;
    params.id = sumConfig.id;
    params.name = sumConfig.name;
    params.items = _.filter(sumConfig.items, function (o) { return o.selected == 1; });
    params.items.forEach((ele) => {
      if (!ele.value)
        ele.value = "sum";
    });
    params.isOnlyTotal = true;
    let callback = (json) => {
      if (json.code === 200) {
        self.setState({ bShowList: false, showCardFieldName: "", bOnlyShowSelected: true });
        self.props.viewModel.execute('saveSumArea');
      }
      if (json.code !== 200) {
        console.log("保存汇总区设置失败。信息 : " + (json.message ? json.message : JSON.stringify(json)).toString());
        // self.setState({ bShowList: false });
      }
    }
    eChartProxy.doProxy(eChartProxy.url.saveTotalSchema, 'POST', params, callback);

  }
  handleCancel = () => {
    this.setState({ bShowList: false, showCardFieldName: "", bOnlyShowSelected: true });
  }

  getConfig() {

    let self = this;
    let param = { billnum: self.state.billnum, isOnlyTotal: true };
    let callback = (json) => {
      if (json.code === 200) {
        if (json.data) {
          eChartCommon.LogChartInfo("设置汇总区  eChartConfig", json.data.chartConfig, 7);
          self.setState({ sumConfig: json.data });
          return;
        }
      }
      eChartCommon.LogChartInfo("设置汇总区_配置信息读取失败或者交叉表不支持 查询参数 =" + JSON.stringify(param) + "  json.message", json.message, 999);
    }
    eChartProxy.doProxy(eChartProxy.url.getTotalSetting, 'GET', param, callback);

  }

}


