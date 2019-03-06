import React, { Component } from 'react';
import { Popover, Input, Modal, Icon, Button, Checkbox, Radio, Transfer, Select } from 'antd';
// import Row from './row';
// import Col from './col';
import SvgIcon from 'SvgIcon';
import * as  eChartCommon from '../echart/eChartCommon';
import * as  eChartProxy from '../echart/eChartProxy';

const RadioGroup = Radio.Group;
export default class PublishMenu extends React.Component {
  constructor(props) {
    super(props);
    const { viewModel } = props;
    this.state = {
      bShowCard: false,
      params: {},
      content: null
    }
  }

  componentDidMount() {
    let self = this;
    this.props.viewModel.on('setPublishMenuInfo', (params) => {
      self.setState({ params });
    });
  }

  render() {
    let self = this;
    let type = self.state.bShowCard ? "up" : "down";
    let content = self.getPublishMenuCard();
    let className = this.props.className;

    let conditionPop = (
      <div style={{ float: "left" }} className={className} >
        <Popover
          placement="bottom"
          overlayClassName=""
          content={content}
          trigger={"click"}
          visible={self.state.bShowCard}
          onVisibleChange={(visible) => self.onCardVisibleChange(visible, self)}
        >
          <Button
            onClick={() => self.ShowCard()}
            type={type}
          >
            <SvgIcon type="fabufangan" className={"icon-fabufangan"} />
            <span>{self.props.name ? self.props.name : "发布菜单"}</span>
          </Button>
        </Popover>
      </div>
    );
    return conditionPop;
  }

  onCardVisibleChange(visible, self) {

    if (visible == false) {
      self.setState({ bShowCard: false });
    }
  }


  ShowCard() {
    let bShowCard = !this.state.bShowCard;
    if (bShowCard) {
      this.setState({ params: {}, content: {}, bShowCard: true });
      this.props.viewModel.execute('getPublishMenuInfo');
    }
    else {
      this.setState({ params: {}, bShowCard: false });
    }
  }
  getPublishMenuCard() {

    let self = this;
    let content = self.state.content;
    let params = self.state.params;
    if (self.state.bShowCard == true && _.isEmpty(params) == false) {

      // let name = self.state.params.name;
      // let groupSchemaName = self.state.groupSchemaName;
      let name = params.name;
      let groupSchemaName = params.groupSchemaName ? params.groupSchemaName : "";

      content = <div className="publishMenu">
        <div className="publishMenu_count">
          <span>方案名称:</span>
          <Input
            id="publishMenu_Title"
            placeholder="请输入"
            defaultValue={name + "_" + groupSchemaName}
          />
          <div className="pc-mobile-show pc-mobile-show-margin">
            <Checkbox disabled={!self.state.params.isPc} className="publishMenu_Pc" defaultChecked={false}>PC端展现</Checkbox>
          </div>
          <div className="pc-mobile-show">
            <Checkbox disabled={!self.state.params.isMobile} className="publishMenu_Mobile" defaultChecked={false}>移动端展现</Checkbox>
          </div>
        </div>
        <div className="footer-btn">
          <Button type={"primary"} onClick={() => this.handleOk()}>确定</Button>
          <Button type={"default"} onClick={() => this.handleCancel()}>取消</Button>
        </div>
      </div>
      self.state.content = content;
    }
    return content;

  }



  handleOk = (e) => {

    let self = this;
    let ele = document.getElementById('publishMenu_Title');
    let arr = document.getElementsByClassName("publishMenu_Mobile");
    let arr2 = document.getElementsByClassName("publishMenu_Pc");
    let isMobile = arr[0].control.checked;
    let isPc = arr2[0].control.checked;
    let name = ele.value;
    if (name == "" || name.length > 16) {
      cb.utils.alert("名称不可为空且长度小于16个字。");
      return;
    }
    let outerparams = { menu_name: name };
    let outercallback = (json) => {
      if (json.code === 200) {
        if (!!json.data) {
          cb.utils.confirm('已经存在当前菜单，是否覆盖？', function () {
            self.saveMenu(name, json.data, isMobile, isPc);
          });
        }
        else {
          self.saveMenu(name, "", isMobile, isPc);
        }
      }
    }
    eChartProxy.doProxy(eChartProxy.url.menuExists, 'GET', outerparams, outercallback);

  }
  saveMenu = (name, code, isMobile, isPc) => {
    let self = this;
    let billnum = self.state.params.billnum;
    const filterViewModel = this.props.viewModel.getCache('FilterViewModel');
    const predicateValue = filterViewModel && filterViewModel.getCache('predicateValue');
    let currentCondition = self.state.params.condition;
    if (predicateValue && currentCondition && currentCondition.commonVOs && currentCondition.commonVOs.length) {
      currentCondition = JSON.parse(JSON.stringify(currentCondition));
      currentCondition.commonVOs.forEach(item => {
        if (!predicateValue[item.itemName]) return;
        item.value1 = predicateValue[item.itemName];
        delete item.value2;
      });
    }
    let condition = JSON.stringify(currentCondition);
    let params = { billnum, name, condition, isMobile, isPc };
    if (!!code)
      params.menu_code = code;
    if (!!self.state.params.groupSchemaId)
      params.groupSchemaId = self.state.params.groupSchemaId;
    let callback = (json) => {
      if (json.code === 200) {
        cb.utils.alert("报表方案已发布。");
        self.setState({ bShowCard: false });
      }
      else {
        eChartCommon.LogChartInfo("发布报表方案失败。err ", json.message, 999);
        cb.utils.alert(json.message);
        self.setState({ bShowCard: false });
      }
    }
    eChartProxy.doProxy(eChartProxy.url.publishMenu, 'POST', params, callback);
  }
  handleCancel = (e) => {
    this.setState({ bShowCard: false });
  }

}


