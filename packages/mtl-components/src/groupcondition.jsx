import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import { findDOMNode } from 'react-dom';
import { Popover, Input, Modal, Icon, Button, Checkbox, Radio, Transfer, Select } from 'antd';
import Row from './row';
import Col from './col';
import Input2 from './input';
import * as groupConditionRedux from '../../redux/groupCondition';
import InputSearch from '../common/InputSearch';
import SvgIcon from 'SvgIcon';
import EChartDesign from '../echart/echart/eChartDesign';
import EChartPanelDisplay from '../echart/panel/eChartPanelDisplay';
// import EChartPanelList from '../echart/panel/eChartPanelList';


import * as eChartDemoData from '../echart/eChartDemoData';
const RadioGroup = Radio.Group;
class GroupCondition extends React.Component {
  constructor(props) {
    super(props);
    const { viewModel } = props;
    const { billNo } = viewModel.getParams();
    const { groupConditionState, groupConditionRedux } = this.props;
    let viewid = this.props.viewid ? this.props.viewid : "";
    let bPublished = viewid ? true : false;
    groupConditionRedux.initConditionListValue(billNo, { billnum: billNo, bShowList: false, bShowCard: false, viewid }, viewModel);
    this.state = {
      billnum: billNo,
      // bCancelSetting: false,
      bIgnoreAuth: false,
      viewid: viewid,
      bPublished: bPublished,
      name: viewModel.getParams().name ? viewModel.getParams().name : "",
      bUseZhiBiao: false
    };

    this.groupSchemasMeta = {
      cControlType: 'Select',
      modelType: 'ListModel',
      cItemName: 'groupSchemas',
      valueField: 'id',
      textField: 'name',
    };
    viewModel.addProperty(this.groupSchemasMeta.cItemName, new cb.models[this.groupSchemasMeta.modelType](this.groupSchemasMeta));
    this.noGroupAndAuth = false;
  }

  componentDidMount() {
  }
  componentWillUnmount() {
  }
  componentWillUpdate(nextProps, nextState) {
  }
  componentDidUpdate() {
  }

  // 监听外部props的变化, 如果变化了需要更新组件的state
  componentWillReceiveProps(nextProps) {
  }
  switchGroupSchema(id, name) {
    const { viewModel } = this.props;

    let tmp = [];
    if (id)
      tmp.push({ id, name });
    viewModel.get('groupSchemas').setDataSource(tmp);
    viewModel.get('groupSchemas').setValue(id);
    viewModel.biz.do("switchGroupSchema", viewModel, { groupSchemaId: id, groupSchemaName: name });
  }

  handleBodyClick = (e) => {
    const { groupConditionState, groupConditionRedux } = this.props;
    // if (this.contains(this.refs.input_search, e.target)) return;
    if (e.target && cb.dom(e.target).parents('div.ant-popover').length) return;
    if (e.target.parentElement.className == "ant-input-group-addon") return;
    if (e.target.parentElement.className == "ant-popover-open") return;
    if (e.target.tagName == "CANVAS") return;
    if (e.target.parentElement.parentElement.className == "ant-popover-open") return;
    if (e.target.parentElement.className == "ant-input-wrapper ant-input-group") return;
    if (groupConditionState[this.getBillNum()].bShowCard == true) {
      if (groupConditionState[this.getBillNum()].editCondition.columnDefineInfo.bShowDefine == true) {
        this.showColumnDefine(false, {})
      }
      return;
    }
    document.body.removeEventListener('click', this.handleBodyClick);
    groupConditionRedux.setValue(this.getBillNum(), { bShowList: false });
  }
  render() {
    let self = this;
    const { groupConditionState, groupConditionRedux } = self.props;
    if (groupConditionState[this.getBillNum()] == undefined)
      return <div />;
    // let type = groupConditionState[this.getBillNum()].textMouseEnterId == 4 && groupConditionState[this.getBillNum()].currentName != "" ? "close" : (groupConditionState[self.getBillNum()].bShowList ? "up" : "down");

    // let button = <div>
    //   <Icon
    //     //onClick={() => self.ShowList()}
    //     onClick={type == "close" ? () => self.chooseCondition() : () => self.ShowList()}
    //     type={type}
    //     onMouseEnter={() => this.onTextMouseEnter(true, 4)}
    //     onMouseLeave={() => this.onTextMouseEnter(false, 4)}
    //   />
    // </div>;
    let bNeedClose = groupConditionState[this.getBillNum()].textMouseEnterId == 4 && groupConditionState[this.getBillNum()].currentName != "" ? true : false;
    let type = groupConditionState[self.getBillNum()].bShowList ? "up" : "down";

    let button = <div>
      {bNeedClose ? <Icon
        onClick={() => self.chooseCondition()}
        type={"close-circle"}
        onMouseEnter={() => this.onTextMouseEnter(true, 4)}
        onMouseLeave={() => this.onTextMouseEnter(false, 4)}
      /> : null}
      <Icon
        onClick={() => self.ShowList()}
        type={type}
        onMouseEnter={() => this.onTextMouseEnter(true, 4)}
        onMouseLeave={() => this.onTextMouseEnter(false, 4)}
      />
    </div>;



    let conditionList = null;
    conditionList = this.getConditionListRender();
    let conditionPop = (

      <div>
        <div className="Grouping-condition-left">{groupConditionState[this.getBillNum()].cShowCaption}:</div>
        <Popover
          overlayStyle={{ width: "236px" }}
          content={conditionList} trigger={"click"}
          visible={groupConditionState[this.getBillNum()].bShowList}>
          <div className="Grouping-condition">
            <div className="Grouping-condition-input">
              <span className="Grouping-condition-span"
                onMouseEnter={() => this.onTextMouseEnter(true, 4)}
                onMouseLeave={() => this.onTextMouseEnter(false, 4)}
                style={{ cursor: "pointer" }}
                onClick={() => this.ShowList()}
                overlayStyle={{ width: "100px" }}>
                {groupConditionState[this.getBillNum()].currentName}
              </span>
              {button}
            </div>
          </div>
        </Popover>
      </div>
    );
    let conditionCard = this.getConditionCardRender();
    let eChartSetting = this.eChartSetting_getRender();
    let style = {};
    if (this.state.bPublished) {
      style = { display: "none" };
    }
    return <div className="groupCondition" style={style}  >
      {conditionPop}
      {conditionCard}
      {eChartSetting}
    </div>;
  }

  ShowList = () => {
    if (this.noGroupAndAuth == true) {
      cb.utils.alert("没有任何分组信息。");
      return;
    }
    document.body.addEventListener('click', this.handleBodyClick);
    const { groupConditionState, groupConditionRedux } = this.props;
    groupConditionRedux.showList(this.getBillNum(), !groupConditionState[this.getBillNum()].bShowList);
  }

  getConditionListRender() {
    let self = this;
    const { groupConditionState, groupConditionRedux } = this.props;
    let conditionList = groupConditionState[this.getBillNum()].conditionList;
    let currentId = groupConditionState[this.getBillNum()].currentId;
    let renderList = [];
    let bAuthAdd = groupConditionState[this.getBillNum()].bAuthAdd;
    let bAuthEdit = groupConditionState[this.getBillNum()].bAuthEdit;
    let bAuthDel = groupConditionState[this.getBillNum()].bAuthDel;
    if (self.state.bIgnoreAuth === true) {
      bAuthAdd = true;
      bAuthEdit = true;
      bAuthDel = true;
    }

    if (conditionList && conditionList.length > 0) {
      // if (conditionList.length == 1) {
      //   // conditionList[0].isDefault = true;
      //   currentId = conditionList[0].id;
      // }
      conditionList.forEach(function (element, index) {
        let item;
        let isChecked = element.id == currentId ? true : false;
        let itemChecked = isChecked ? <span className="groupCondition-Checked"><i className="anticon icon-xuanzhong1" checked={isChecked}></i>  </span > : <span className="groupCondition-Checked">  </span >;
        let isDefault = element.isDefault ? element.isDefault : false;
        let itemDefault = isDefault ? <span className="groupCondition-Default"> <span className="crossdefault-btn">默认</span>  </span> : <span className="groupCondition-Default">  </span>;
        let isMouseEnter = element.isMouseEnter ? element.isMouseEnter : false;
        let itemEnter = isMouseEnter ?
          <span className={"groupCondition-MouseEnter" + (groupConditionState[this.getBillNum()].textMouseEnterId > 0 && groupConditionState[this.getBillNum()].textMouseEnterId <= 3 ? groupConditionState[this.getBillNum()].textMouseEnterId : "")}>
            {isDefault ? null : <span
              onMouseEnter={() => this.onTextMouseEnter(true, 1)}
              onMouseLeave={() => this.onTextMouseEnter(false, 1)}
              onClick={() => this.setDefaultCondition(element.id)}>设为默认</span>
            }
            <span
              onMouseEnter={() => this.onTextMouseEnter(true, 2)}
              onMouseLeave={() => this.onTextMouseEnter(false, 2)}
              onClick={() => this.editConditionInfo(element.id)}
              style={{ display: bAuthEdit == true ? "" : 'none' }}
            >设置</span>
            <span
              onMouseEnter={() => this.onTextMouseEnter(true, 3)}
              onMouseLeave={() => this.onTextMouseEnter(false, 3)}
              onClick={() => this.deleteCondition(element.id)}
              style={{ display: bAuthDel == true ? "" : 'none' }}
            >删除</span>

          </span> : <span className="groupCondition-MouseEnter"> </span  >;

        item = (
          <Row style={{ minHeight: "25px" }}
            onMouseEnter={(e) => this.onMouseEnter(true, e, element.id)}
            onMouseLeave={(e) => this.onMouseEnter(false, e, element.id)}>
            {itemChecked}
            <span style={{ cursor: "pointer" }} onClick={() => this.chooseCondition(element.id, element.name)}> {element.name ? element.name : element.id}  </span>
            {itemDefault}
            {itemEnter}
          </Row>
        )
        renderList.push(item);
      }, this);
    }
    if (renderList.length < 1 && bAuthAdd == false)
      this.noGroupAndAuth = true;
    else
      this.noGroupAndAuth = false;



    return (
      <div className={"group-add-grouping-count " + (bAuthAdd == false ? "group-add-grouping-count-noauth" : "")}>
        <div style={{ overflow: "auto", maxHeight: "258px", paddingBottom: "2px" }} >{renderList}</div>
        <div className="group-add-grouping">
          <div
            onClick={() => this.addConditionInfo()}
            style={{ display: bAuthAdd == true ? "" : 'none' }}
          ><SvgIcon type="plus" />新增分组</div>
        </div>
      </div>
    );
    // return (
    //   <div className="group-add-grouping-count ">
    //     <div style={{ overflow: "auto", maxHeight: "258px", paddingBottom: "2px" }} >{renderList}</div>
    //     {groupConditionState[this.getBillNum()].bAuthAdd == true ? <div className="group-add-grouping">
    //       <div
    //         onClick={() => this.addConditionInfo()}
    //       ><SvgIcon type="plus" />新增分组</div>
    //     </div> : ""}
    //   </div>
    // );
  }

  addConditionInfo() {
    const { groupConditionRedux } = this.props;
    groupConditionRedux.editConditionInfo(this.getBillNum(), "");
  }
  editConditionInfo(id) {
    const { groupConditionRedux } = this.props;
    groupConditionRedux.editConditionInfo(this.getBillNum(), id);
  }

  setDefaultCondition(id) {
    const { groupConditionRedux, viewModel } = this.props;
    groupConditionRedux.setDefaultCondition(this.getBillNum(), id, viewModel);
  }
  getBillNum() {

    return this.state.billnum;
    // let reduxBillNum = this.state.billnum;
    // if (!!this.state.viewid)
    //   reduxBillNum = reduxBillNum + "_" + this.state.viewid;
    // return reduxBillNum;
  }

  deleteCondition(id) {
    const { viewModel, groupConditionRedux } = this.props;
    groupConditionRedux.deleteCondition(this.getBillNum(), id, viewModel);
  }
  chooseCondition(id, name) {

    const { groupConditionState, groupConditionRedux } = this.props;
    if (groupConditionState[this.getBillNum()].currentName || name) {
      this.switchGroupSchema(id ? id : null, name);
      groupConditionRedux.chooseCondition(this.getBillNum(), id);
    }
  }
  onMouseEnter(bEnter, e, id) {
    const { groupConditionRedux } = this.props;
    groupConditionRedux.conditiOnMouseEnter(this.getBillNum(), id, bEnter);
  }

  onTextMouseEnter(bEnter, id) {
    const { groupConditionRedux } = this.props;
    groupConditionRedux.conditiOnTextMouseEnter(this.getBillNum(), id, bEnter);
  }

  handleOk = (e) => {
    const { groupConditionState, groupConditionRedux } = this.props;

    let condition = groupConditionState[this.getBillNum()].editCondition;
    let eChart = groupConditionState[this.getBillNum()].eChart;

    if (eChart && (eChart.displayType == 2 || eChart.displayType == 3) && _.isEmpty(eChart.eChartConfig) == true) {
      cb.utils.alert("请设置图形报表信息。");

    }
    else if (condition.name == undefined || condition.name.trim() == "") {
      cb.utils.alert("名称不可为空。");
    }
    else if (condition.dataSource_Selected.length == 0) {
      cb.utils.alert("没有选择列信息。");
    }
    else if (condition.isPc == false && condition.isMobile == false) {
      cb.utils.alert("请选择适用于PC/移动。");
    }
    else {
      const { viewModel } = this.props;
      groupConditionRedux.saveCondition(this.getBillNum(), viewModel);
    }
  }
  handleCancel = (e) => {
    const { groupConditionState, groupConditionRedux } = this.props;
    groupConditionRedux.cancelEdit(this.getBillNum());
  }


  editCondition_SetValue = (fieldName, fieldValue) => {
    const { groupConditionState, groupConditionRedux } = this.props;
    groupConditionRedux.editCondition_SetValue(this.getBillNum(), fieldName, fieldValue);
  }

  editCondition_SetIsCrossTable = (fieldName, fieldValue) => {
    const { groupConditionState, groupConditionRedux } = this.props;
    groupConditionRedux.editCondition_SetIsCrossTable(this.getBillNum(), fieldName, fieldValue);
  }
  getConditionCardRender() {
    const { groupConditionState, groupConditionRedux } = this.props;
    let bEdit = groupConditionState[this.getBillNum()].editCondition.bEdit;
    let content;
    if (groupConditionState[this.getBillNum()].bShowCard == true) {
      let card;
      if (groupConditionState[this.getBillNum()].editCondition.isCrossTable)
        card = this.getCrossCardRender();
      else
        card = this.getGroupCardRender();


      //   暂时显示界面处理
      if (bEdit == false && eChartDemoData.demoConfig.isTestPanelDisplay == true) {
        card = <EChartPanelDisplay />;
        return <Modal
          width={1200}
          height={1000}
          onOk={(e) => this.handleOk(e)}
          onCancel={(e) => this.handleCancel(e)}
          visible={true}
        >
          {card}
        </Modal>;
      }
      content =
        <Modal className='crossGroupingModal'
          title={bEdit ? "编辑" : "新增"}
          onOk={(e) => this.handleOk(e)}
          onCancel={(e) => this.handleCancel(e)}
          visible={true}
        >
          {card}
        </Modal>;
    }
    return content;
  }
  handleScroll = (direction, e) => {
    console.log('direction:', direction);
    console.log('target:', e.target);
  }

  moveItems = (bToRight) => {
    const { groupConditionState, groupConditionRedux } = this.props;
    groupConditionRedux.editCondition_MoveItems(this.getBillNum(), bToRight);

  }

  selectItems = (groupType, selectedKey, bSelected, bSelectedItems) => {
    const { groupConditionState, groupConditionRedux } = this.props;
    groupConditionRedux.editCondition_SelectedKey(this.getBillNum(), groupType, selectedKey, bSelected, bSelectedItems);
  }
  // filterOption = (inputValue, option) => {
  //   return option.title.indexOf(inputValue) > -1;
  // }

  getGroupCardRender() {
    let self = this;
    const { groupConditionState, groupConditionRedux } = this.props;
    let bEdit = groupConditionState[this.getBillNum()].editCondition.bEdit;
    let editCondition = groupConditionState[this.getBillNum()].editCondition;
    let leftContentCheckBoxs = [];
    let rightContentCheckBoxs_0 = [];
    let rightContentCheckBoxs_3 = [];
    let leftDisabledKeys = [];
    let bToRightEnable = false;
    let bToLeftEnable = false;
    editCondition.dataSource_Selected.forEach(function (ele, index) {
      let button = self.getColumnDefine(editCondition.columnDefineInfo, ele);
      if (ele.groupType == 0) {
        rightContentCheckBoxs_0.push(
          <Row title={ele.tooltip || ele.caption} >
            <Checkbox
              checked={ele.bSelected ? ele.bSelected : false}
              onChange={(e) => self.selectItems(ele.groupType, ele.fieldname, e.target.checked, true)}>
              {ele.caption}
            </Checkbox>
            {button}
          </Row>);
      }
      else if (ele.groupType == 3) {
        rightContentCheckBoxs_3.push(
          <Row title={ele.tooltip || ele.caption} >
            <Checkbox
              checked={ele.bSelected ? ele.bSelected : false}
              onChange={(e) => self.selectItems(ele.groupType, ele.fieldname, e.target.checked, true)}>
              {ele.caption}
            </Checkbox>
            {button}
          </Row>);
      }
      leftDisabledKeys.push(ele.fieldname);
      if (ele.groupType == editCondition.focusedGroupType)//&& ele.bSelected
        bToLeftEnable = true;
    });

    editCondition.dataSource_UnSelected.forEach(function (ele, index) {
      if (ele.caption.indexOf(editCondition.keyWord) > -1) {
        let bDisabled = leftDisabledKeys.indexOf(ele.fieldname) > -1 ? true : false;
        let bChecked = bDisabled || ele.bSelected ? true : false;

        leftContentCheckBoxs.push(
          <Row title={ele.tooltip || ele.caption} >
            <Checkbox
              checked={bChecked}
              disabled={bDisabled}
              onChange={(e) => self.selectItems(ele.groupType, ele.fieldname, e.target.checked, false)}>
              {ele.caption}
            </Checkbox>
          </Row>);
        if (bDisabled == false)// && (ele.bSelected ? ele.bSelected : false) == false
          bToRightEnable = true;
      }
    });
    let RadioControl = [];
    RadioControl.push(<span className="crosstypeName"><i className="anticon anticon-star"></i>类型</span>);
    if (bEdit == false || !editCondition.isCrossTable) {
      RadioControl.push(<span className="crosstypeNameList"><Radio checked={!editCondition.isCrossTable} onChange={(e) => this.editCondition_SetIsCrossTable("isCrossTable", !e.target.checked)}></Radio></span>);
      RadioControl.push(<span style={{ cursor: "pointer" }} onClick={() => this.editCondition_SetIsCrossTable("isCrossTable", false)}>分组</span>);
    }
    if (bEdit == false || editCondition.isCrossTable) {
      RadioControl.push(<span className="crosstypeNameList"><Radio checked={editCondition.isCrossTable} onChange={(e) => this.editCondition_SetIsCrossTable("isCrossTable", e.target.checked)}></Radio></span>);
      RadioControl.push(<span style={{ cursor: "pointer" }} onClick={() => this.editCondition_SetIsCrossTable("isCrossTable", true)}>交叉</span>);
    }

    let eChart = groupConditionState[this.getBillNum()].eChart;
    let chartType = this.getChartType();

    return <div>
      <Row className="crosstype">
        {RadioControl}
      </Row>
      <Row colCount={12} className="crosstype">
        <Col span={1} className="crosstypeName crosstypeline"><i className="anticon anticon-star nametitlemarginstar"></i>名称</Col>
        <Col span={1} />
        <Col span={4} className="crosstypeNameList crossinput"><Input defaultValue={editCondition.name} onChange={(e) => this.editCondition_SetValue("name", e.target.value)} /> </Col>
        <Col span={1} />
        <Col span={5} className="crosscheckbox"><Checkbox checked={editCondition.isDefault} onChange={(e) => this.editCondition_SetValue("isDefault", e.target.checked)} >设为默认</Checkbox></Col>
      </Row>
      <Row className="crosstype">
        <span className="eChart-displayTitle"><i className="anticon anticon-star"></i>布局</span>
        <div className="eChart-global">
          <span className="eChart_DisplayType"><Radio checked={eChart.displayType == 3 ? true : false} onChange={(e) => this.eChartSetting_SetDisplayType(3)}></Radio></span>
          <span className="" style={{ cursor: "pointer" }} onClick={() => this.eChartSetting_SetDisplayType(3)} >图+表</span>
          <span className="eChart_DisplayType"><Radio checked={eChart.displayType == 2 ? true : false} onChange={(e) => this.eChartSetting_SetDisplayType(2)}></Radio></span>
          <span className="" style={{ cursor: "pointer" }} onClick={() => this.eChartSetting_SetDisplayType(2)} >图</span>
          <span className="eChart_DisplayType"><Radio checked={(eChart.displayType == 2 || eChart.displayType == 3) ? false : true} onChange={(e) => this.eChartSetting_SetDisplayType(1)}></Radio></span>
          <span className="" style={{ cursor: "pointer" }} onClick={() => this.eChartSetting_SetDisplayType(1)} >表</span>
          <span className="eChart_Setting"><Button disabled={(eChart.displayType == 2 || eChart.displayType == 3) ? false : true} onClick={() => this.showEChartSetting(true)}>设置图形报表</Button></span >
        </div>
      </Row>
      <Row className="crosstype">
        <span className="eChart-ApplyAt"><i className="anticon anticon-star"></i>展现</span>
        <span className="eChart-ApplyAtPc" style={{ cursor: "pointer" }} ><Checkbox checked={editCondition.isPc} onChange={(e) => this.editCondition_SetValue("isPc", e.target.checked)} >PC端展现</Checkbox></span>
        <span className="eChart-ApplyAtMobile" style={{ cursor: "pointer" }} ><Checkbox disabled={chartType == "ranktable" ? true : false} checked={editCondition.isMobile} onChange={(e) => this.editCondition_SetValue("isMobile", e.target.checked)} >移动端展现</Checkbox></span>
      </Row>
      <Row colCount={12}>
        <Col span={5} className="crossadddata">
          <div>
            <Row className="crossaddnamemargin">添加数据项</Row>
            <div className="crossselectborder">
              <InputSearch placeholder="请输入关键字"
                value={editCondition.keyWord}
                onChange={(value) => this.editCondition_SetValue("keyWord", value.currentTarget.value)}
                /*onPressEnter={this.InputKeyWord}
                onSearch={this.InputKeyWord}*/
                onDelete={() => this.editCondition_SetValue("keyWord", "")}
              />
              <Row className="crossadddatalist">{leftContentCheckBoxs}</Row>
            </div>
          </div>
        </Col>
        <Col span={2} className="crossbtncount">
          <Button disabled={!bToRightEnable} onClick={() => this.moveItems(true)} className={bToRightEnable ? "icon-right-enabled" : "icon-right-disabled"}></Button>
          <Button disabled={!bToLeftEnable} onClick={() => this.moveItems(false)} className={bToLeftEnable ? "icon-left-enabled" : "icon-left-disabled"}></Button>
        </Col>
        <Col span={5} className="selecteddata">
          <div>
            <Row className="crossaddnamemargin">已选数据项</Row>
            <div className="groupCondition-SelectedItem">
              <div onClick={() => this.editCondition_SetValue("focusedGroupType", 0)} className="groupCondition-SelectedItem-Row2">
                <div className={"titlemore  titlemore-none" + (editCondition.focusedGroupType == 0 ? " groupCondition-SelectedItem-Selected" : "")}><span>维度</span></div>
                <div className="titlename-list3">{rightContentCheckBoxs_0}</div>
              </div>
              <div onClick={() => this.editCondition_SetValue("focusedGroupType", 3)} className="groupCondition-SelectedItem-Row2">
                <div className={"titlemore" + (editCondition.focusedGroupType == 3 ? " groupCondition-SelectedItem-Selected" : "")}>
                  <span>指标</span>
                  <div className="groupCondition-HideAllZeroRow" style={{ display: '' }}>
                    <Checkbox checked={!editCondition.isDisplayZero}
                      onChange={(e) => this.editCondition_SetValue("isDisplayZero", !e.target.checked)} >不显示指标全为零的数据行</Checkbox>
                  </div>
                </div>
                <div className="titlename-list3">{rightContentCheckBoxs_3}</div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>;
  }
  getChartType() {
    const { groupConditionState } = this.props;
    let chartType = _.get(groupConditionState[this.getBillNum()], 'eChart.eChartConfig.chart1.yySetting.type');
    return chartType;
  }

  eChartSetting_SetDisplayType = (value) => {
    const { groupConditionState, groupConditionRedux } = this.props;
    groupConditionRedux.eChartSetting_SetDisplayType(this.getBillNum(), value);
  }

  showEChartSetting = (bShow) => {
    const { groupConditionState, groupConditionRedux } = this.props;
    // this.state.bCancelSetting = false;
    groupConditionRedux.eChartSetting_Show(this.getBillNum(), bShow);
  }



  eChartSetting_getRender = () => {
    const { groupConditionState, groupConditionRedux } = this.props;
    let content = null;
    let bShowEChartSetting = groupConditionState[this.getBillNum()].bShowEChartSetting;
    if (bShowEChartSetting == true) {
      content = <Modal
        className="eChartSetting_Modal"
        title="设置图形报表"
        visible={true}
        footer={null}
        onCancel={() => this.showEChartSetting(false)}

      >
        <div className="eChartSetting_Control">
          <EChartDesign
            billnum={this.getBillNum()}
            chartKey="chart1"
            reportFields={groupConditionState[this.getBillNum()].editCondition.dataSource_Selected}
          // bCancelSetting={this.state.bCancelSetting}
          />
        </div>
      </Modal>;
    }
    return content;
  }
  // cancelSetting() {
  //   this.setState({ bCancelSetting: true });
  // }
  setColumnDefineValue(groupType, fieldname, defineName, value) {
    const { groupConditionState, groupConditionRedux } = this.props;
    groupConditionRedux.setColumnDefineValue(this.getBillNum(), groupType, fieldname, defineName, value);
  }

  /*getColumnDefineRender(itemEle, defineData) {
    // "data": [
    //         {
    //             "controltype": "select",
    //             "name": "function",
    //             "caption": "函数",
    //             "enumArray": "[{\"value\":\"日期\",\"key\":\"fn_formatdateyyyymmdd\"},{\"value\":\"年\",\"key\":\"year\"},{\"value\":\"月\",\"key\":\"month\"}]",
    //             "value": "fn_formatdateyyyymmdd"
    //         },
    //     ]
    const { groupConditionState, groupConditionRedux } = this.props;
    let self = this;
    let renderList = [];
    if (defineData && defineData.length > 0) {
      defineData.forEach(function (ele, index) {
        let item;
        if (ele.controltype == "select") {
          let options = new Array();
          if (ele.enumArray && ele.enumArray.length) {
            let arr = JSON.parse(ele.enumArray);
            arr.forEach(function (ele2) {
              options.push(<Option value={ele2.key}>{ele2.value}</Option>);
            });
          }
          item =
            <div>
              <span>{ele.caption} </span>
              <Select value={ele.value}
                notFoundContent="无法找到"
                onChange={e => this.setColumnDefineValue(itemEle.groupType, itemEle.fieldname, ele.name, e)}>
                {options}
              </Select>
            </div>;

        }
        else if (ele.controltype == "checkbox") {
          item = <Checkbox
            checked={ele.value == "true" ? true : false}
            onChange={(e) => self.setColumnDefineValue(itemEle.groupType, itemEle.fieldname, ele.name, e.target.checked.toString())}>
            {ele.caption}
          </Checkbox>;
        }
        if (item)
          renderList.push(<div  >{item}</div>);
      }, this);
    }

    return (
      <div className="group-add-grouping-count">
        <div  >{renderList}</div>
        <div >
          <Button type={"primary"} onClick={() => self.SaveColumnDefine(true)}>保存</Button>
          <Button type={"default"} onClick={() => self.SaveColumnDefine(false)}>取消</Button>
        </div>
      </div>
    );
  }*/



  getColumnDefineRender(itemEle, defineData) {
    // "data": [
    //         {
    //             "controltype": "select",
    //             "name": "function",
    //             "caption": "函数",
    //             "enumArray": "[{\"value\":\"日期\",\"key\":\"fn_formatdateyyyymmdd\"},{\"value\":\"年\",\"key\":\"year\"},{\"value\":\"月\",\"key\":\"month\"}]",
    //             "value": "fn_formatdateyyyymmdd"
    //         },
    //     ]
    {/*<RadioGroup onChange={this.onChange} value={this.state.value}>
        <Radio value={1}>A</Radio>
        <Radio value={2}>B</Radio>
        <Radio value={3}>C</Radio>
        <Radio value={4}>D</Radio>
      </RadioGroup>*/}
    const { groupConditionState, groupConditionRedux } = this.props;
    let self = this;
    let renderList = [];
    if (defineData && defineData.length > 0) {
      defineData.forEach(function (ele, index) {
        let item;
        if (ele.controltype == "select") {
          let options = new Array();
          if (ele.enumArray && ele.enumArray.length) {
            let arr = JSON.parse(ele.enumArray);
            arr.forEach(function (ele2) {
              options.push(<Radio value={ele2.key}>{ele2.value}</Radio>);
            });
          }
          item =
            <div>
              <span>{ele.caption} </span>
              <RadioGroup
                value={ele.value}
                onChange={e => this.setColumnDefineValue(itemEle.groupType, itemEle.fieldname, ele.name, e.target.value)}>
                {options}
              </RadioGroup>
            </div>;

        }
        else if (ele.controltype == "checkbox") {
          item = <Checkbox
            checked={ele.value == "true" ? true : false}
            onChange={(e) => self.setColumnDefineValue(itemEle.groupType, itemEle.fieldname, ele.name, e.target.checked.toString())}>
            {ele.caption}
          </Checkbox>;
        }
        if (item)
          renderList.push(<div  >{item}</div>);
      }, this);
    }

    return (
      <div className="group-add-grouping-count">
        <div  >{renderList}</div>
        <div className="footer-btn">
          <Button type={"primary"} onClick={() => self.SaveColumnDefine(true)}>保存</Button>
          <Button type={"default"} onClick={() => self.SaveColumnDefine(false)}>取消</Button>
        </div>
      </div>
    );
  }


  SaveColumnDefine(bSave) {
    const { groupConditionState, groupConditionRedux } = this.props;
    groupConditionRedux.editCondition_SaveColumnDefine(this.getBillNum(), bSave);


  }
  getColumnDefine(columnDefineInfo, itemEle) {
    let showIt = columnDefineInfo.bShowDefine
      && (columnDefineInfo.itemEle ? columnDefineInfo.itemEle.groupType : -1) == itemEle.groupType
      && (columnDefineInfo.itemEle ? columnDefineInfo.itemEle.fieldname : "") == itemEle.fieldname;

    if (itemEle.canSet || itemEle.groupType == 1) {
      let columnDefineRender = undefined;
      // if (showIt) {
      columnDefineRender = this.getColumnDefineRender(itemEle, columnDefineInfo.defineData);
      // }
      let conditionPop = (
        <Popover
          overlayClassName="groupCondition-ColumnDefine"
          content={columnDefineRender}
          trigger={"click"}
          visible={showIt}>
          <div className="groupCondition-ColumnDefine-Design">
            <span
              style={{ cursor: "pointer" }}
              onClick={() => this.showColumnDefine(!columnDefineInfo.bShowDefine, itemEle)}
            >
              设置
          </span>
          </div>
        </Popover>);
      let cMemo = itemEle.cColumnDefineMemo;
      if (cMemo == undefined && itemEle.settings && itemEle.settings.length > 0) {
        cMemo = _.join(itemEle.settings, '/');
      }
      let cColumnDefineMemo;
      if (_.isEmpty(cMemo) == false)
        cColumnDefineMemo = <div className="columnDeinfe_Memo-count"><span>(</span> <span className="columnDeinfe_Memo" title={cMemo}>{cMemo}</span> <span>)</span></div>;
      return <div>{cColumnDefineMemo} {conditionPop}</div>;
    }
    else {
      return undefined;
    }
  }
  showColumnDefine(bShowDefine, itemEle) {
    const { groupConditionState, groupConditionRedux } = this.props;
    groupConditionRedux.editCondition_ShowColumnDefine(this.getBillNum(), bShowDefine, itemEle);
  }


  getCrossCardRender() {
    let self = this;
    const { groupConditionState, groupConditionRedux } = this.props;
    let bEdit = groupConditionState[this.getBillNum()].editCondition.bEdit;
    let editCondition = groupConditionState[this.getBillNum()].editCondition;
    let leftContentCheckBoxs = [];
    let rightContentCheckBoxs_0 = [];
    let rightContentCheckBoxs_1 = [];
    let rightContentCheckBoxs_2 = [];
    let rightContentCheckBoxs_3 = [];
    let leftDisabledKeys = [];
    let bToRightEnable = false;
    let bToLeftEnable = false;

    // groupType 值
    // 分组  0 分组项  3  统计项
    // 交叉  0 行标题  1 列标题  2 交叉点
    editCondition.dataSource_Selected.forEach(function (ele, index) {
      let button = self.getColumnDefine(editCondition.columnDefineInfo, ele);
      if (ele.groupType == 0) {
        rightContentCheckBoxs_0.push(
          <Row title={ele.tooltip || ele.caption} >
            <Checkbox
              checked={ele.bSelected ? ele.bSelected : false}
              onChange={(e) => self.selectItems(ele.groupType, ele.fieldname, e.target.checked, true)}>
              {ele.caption}
            </Checkbox>
            {button}
          </Row>);
        if (editCondition.focusedGroupType == 0 || editCondition.focusedGroupType == 2)
          leftDisabledKeys.push(ele.fieldname);
      }
      if (ele.groupType == 1) {
        rightContentCheckBoxs_1.push(
          <Row title={ele.tooltip || ele.caption} >
            <Checkbox
              checked={ele.bSelected ? ele.bSelected : false}
              onChange={(e) => self.selectItems(ele.groupType, ele.fieldname, e.target.checked, true)}>
              {ele.caption}
            </Checkbox>
            {button}
          </Row>);
        if (editCondition.focusedGroupType == 1 || editCondition.focusedGroupType == 2)
          leftDisabledKeys.push(ele.fieldname);
      }
      if (ele.groupType == 2) {
        rightContentCheckBoxs_2.push(
          <Row title={ele.tooltip || ele.caption} >
            <Checkbox
              checked={ele.bSelected ? ele.bSelected : false}
              onChange={(e) => self.selectItems(ele.groupType, ele.fieldname, e.target.checked, true)}>
              {ele.caption}
            </Checkbox>
            {button}
          </Row>);
        leftDisabledKeys.push(ele.fieldname);
      }
      if (ele.groupType == 3) {
        rightContentCheckBoxs_3.push(
          <Row title={ele.tooltip || ele.caption} >
            <Checkbox
              checked={ele.bSelected ? ele.bSelected : false}
              onChange={(e) => self.selectItems(ele.groupType, ele.fieldname, e.target.checked, true)}>
              {ele.caption}
            </Checkbox>
            {button}
          </Row>);
        leftDisabledKeys.push(ele.fieldname);
      }
      if (ele.groupType == editCondition.focusedGroupType)//&& ele.bSelected
        bToLeftEnable = true;
    });

    editCondition.dataSource_UnSelected.forEach(function (ele, index) {
      if (ele.caption.indexOf(editCondition.keyWord) > -1) {
        let bDisabled = leftDisabledKeys.indexOf(ele.fieldname) > -1 ? true : false;
        let bChecked = bDisabled || ele.bSelected ? true : false;

        leftContentCheckBoxs.push(
          <Row title={ele.tooltip || ele.caption} >
            <Checkbox
              checked={bChecked}
              disabled={bDisabled}
              onChange={(e) => self.selectItems(ele.groupType, ele.fieldname, e.target.checked, false)}>
              {ele.caption}
            </Checkbox>
          </Row>);
        if (bDisabled == false)//&& (ele.bSelected ? ele.bSelected : false) == false
          bToRightEnable = true;
      }
    });

    let RadioControl = [];
    RadioControl.push(<span className="crosstypeName"><i className="anticon anticon-star"></i> 类型</span>);
    if (bEdit == false || !editCondition.isCrossTable) {
      RadioControl.push(<span className="crosstypeNameList"><Radio checked={!editCondition.isCrossTable} onChange={(e) => this.editCondition_SetIsCrossTable("isCrossTable", !e.target.checked)}></Radio></span>);
      RadioControl.push(<span style={{ cursor: "pointer" }} onClick={() => this.editCondition_SetIsCrossTable("isCrossTable", false)}>分组</span>);
    }
    if (bEdit == false || editCondition.isCrossTable) {
      RadioControl.push(<span className="crosstypeNameList"><Radio checked={editCondition.isCrossTable} onChange={(e) => this.editCondition_SetIsCrossTable("isCrossTable", e.target.checked)}></Radio></span>);
      RadioControl.push(<span style={{ cursor: "pointer" }} onClick={() => this.editCondition_SetIsCrossTable("isCrossTable", true)}>交叉</span>);
    }


    return <div>
      <Row className="crosstype">
        {RadioControl}
      </Row>
      <Row colCount={12} className="crosstype">
        <Col span={1} className="crosstypeName crosstypeline"><i className="anticon anticon-star nametitlemarginstar"></i> 名称</Col>
        <Col span={1} />
        <Col span={4} className="crosstypeNameList crossinput"><Input defaultValue={editCondition.name} onChange={(e) => this.editCondition_SetValue("name", e.target.value)} /> </Col>
        <Col span={1} />
        {/*<Col span={5} className="crosscheckbox">
          <Checkbox checked={editCondition.bDisplayCrossPoint}
            onChange={(e) => this.editCondition_SetValue("bDisplayCrossPoint", e.target.checked)} >显示交叉点横向汇总</Checkbox>
        </Col>*/}
      </Row>
      <Row colCount={12} className="crosstype">
        <span className="eChart-ApplyAt"><i className="anticon anticon-star"></i>展现</span>
        <span className="eChart-ApplyAtPc" style={{ cursor: "pointer" }} ><Checkbox checked={editCondition.isPc} onChange={(e) => this.editCondition_SetValue("isPc", e.target.checked)} >PC端展现</Checkbox></span>
        <span className="eChart-ApplyAtMobile" style={{ cursor: "pointer" }} ><Checkbox disabled={true} checked={editCondition.isMobile} onChange={(e) => this.editCondition_SetValue("isMobile", e.target.checked)} >移动端展现</Checkbox></span>
      </Row>

      <Row colCount={12}>
        <Col span={5} className="crossadddata">
          <div>
            <Row className="crossaddnamemargin">添加数据项</Row>
            <div className="crossselectborder crossselectborder2">
              <InputSearch placeholder="请输入关键字"
                value={editCondition.keyWord}
                onChange={(value) => this.editCondition_SetValue("keyWord", value.currentTarget.value)}
                /*onPressEnter={this.InputKeyWord}
                onSearch={this.InputKeyWord}*/
                onDelete={() => this.editCondition_SetValue("keyWord", "")}
              />
              <Row className="crossadddatalist">{leftContentCheckBoxs}</Row>
            </div>
          </div>
        </Col>
        <Col span={2} className="crossbtncount">
          <Button disabled={!bToRightEnable} onClick={() => this.moveItems(true)} className={bToRightEnable ? "icon-right-enabled" : "icon-right-disabled"}></Button>
          <Button disabled={!bToLeftEnable} onClick={() => this.moveItems(false)} className={bToLeftEnable ? "icon-left-enabled" : "icon-left-disabled"}></Button>
        </Col>
        <Col span={5} className="selecteddata">
          <div className="groupCondition-Selected">
            <Row className="crossaddnamemargin">已选数据项</Row>
            <div className="groupCondition-SelectedItem groupCondition-SelectedItem2">
              <div onClick={() => this.editCondition_SetValue("focusedGroupType", 0)} className={"groupCondition-SelectedItem-Row groupCondition-SelectedItemNum" + (this.state.bUseZhiBiao ? "_4" : "_3")}>
                <div className={"titlemore  titlemore-none" + (editCondition.focusedGroupType == 0 ? " groupCondition-SelectedItem-Selected" : "")}><span>行标题</span></div>
                <div className="titlename-list">{rightContentCheckBoxs_0}</div>
              </div>
              <div onClick={() => this.editCondition_SetValue("focusedGroupType", 1)} className={"groupCondition-SelectedItem-Row groupCondition-SelectedItemNum" + (this.state.bUseZhiBiao ? "_4" : "_3")}>
                <div className={"titlemore" + (editCondition.focusedGroupType == 1 ? " groupCondition-SelectedItem-Selected" : "")}><span>列标题</span></div>
                <div className="titlename-list">{rightContentCheckBoxs_1}</div>
              </div>

              <div onClick={() => this.editCondition_SetValue("focusedGroupType", 2)} className={"groupCondition-SelectedItem-Row groupCondition-SelectedItemNum" + (this.state.bUseZhiBiao ? "_4" : "_3")}>
                <div className={"titlemore" + (editCondition.focusedGroupType == 2 ? " groupCondition-SelectedItem-Selected" : "")}>
                  <span>交叉点</span>
                  <div className="groupCondition-HideAllZeroRow" style={{ display: 'none' }}>
                    <Checkbox checked={!editCondition.isDisplayZero}
                      onChange={(e) => this.editCondition_SetValue("isDisplayZero", !e.target.checked)} >不显示指标全为零的数据行</Checkbox>
                  </div>
                </div>
                <div className="titlename-list">{rightContentCheckBoxs_2}</div>
              </div>
              <div style={{ display: "" }} className={"groupCondition-SelectedItem-zhibiao groupCondition-SelectedItemNum" + (this.state.bUseZhiBiao ? "_4" : "_3")}>
                <div
                  onClick={() => this.zhiBiaoClicked()} className={"titlemore" + (editCondition.focusedGroupType == 3 ? " groupCondition-SelectedItem-Selected" : "")}>
                  <span>指标</span>
                  <Icon type={this.state.bUseZhiBiao ? "up" : "down"} />
                </div>
                <div onClick={() => this.editCondition_SetValue("focusedGroupType", 3)} className="titlename-list">{rightContentCheckBoxs_3}</div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>;

  }

  zhiBiaoClicked() {

    this.state.bUseZhiBiao = !this.state.bUseZhiBiao;
    if (this.state.bUseZhiBiao) {
      this.editCondition_SetValue("focusedGroupType", 3);
    }
    else {
      this.editCondition_SetValue("focusedGroupType", 0);
    }
  }
  // shouldComponentUpdate(nextProps, nextState) {
  //   if (nextProps.groupConditionState === this.props.groupConditionState)
  //     return false;
  //   return true;
  // }

}

function mapStateToProps(state) {
  return {
    groupConditionState: state.groupCondition.toJS()
  }
}

function mapDispatchToProps(dispatch) {
  return {
    groupConditionRedux: bindActionCreators(groupConditionRedux, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupCondition);
