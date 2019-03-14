import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { is } from 'immutable';
import RefTreeBaseUI from 'ref-tree';
import { refValParse } from '../../utils';
import request from '../../utils/request';
const noop = () => {
};
const getTreeList = (url,param, content="",  jsonp = false) => request(url, {
	method: 'get',
	params: Object.assign(param,{content}),
	jsonp: jsonp
});
// data:this.treeData,树的所有节点，curKey:正在操作的节点的key值，
// child:1.request请求得到的该key下的子节点，或者缓存中该key下的子节点
const clearChild = (data, curKey, child) => {
	data.map((item) => {
		if (curKey == item.id) {
			item.children = child;
		} else if (item.children){
			 clearChild( item.children,curKey,child);
		}else{
		}
	});
	return data;
};
const propTypes = {
	checkedArray: PropTypes.array, //  指定已选择数据id
	param: PropTypes.object,
	lazyModal: PropTypes.bool,
	lazyParam:PropTypes.array, // 20190127懒加载需要多传参数，暂时不对外暴露
	onCancel: PropTypes.func,
	onSave: PropTypes.func,
	value: PropTypes.string,
	matchUrl: PropTypes.string,
	jsonp: PropTypes.object,
	headers:PropTypes.object,
	onMatchInitValue: PropTypes.func,
	refModelUrl:PropTypes.object,
	onAfterAjax: PropTypes.func,
};
const defaultProps = {
	checkStrictly: false,
	checkedArray: [], //  指定已选择数据id
	lazyModal: false,
	lazyParam:[],// 20190127懒加载需要多传参数，暂时不对外暴露
	param: {
		refCode: '',
	},
	onCancel: noop,
	onSave: noop,
	value: '',
}

class Tree extends Component {
	constructor(props) {
		super(props);
		const { checkedArray, valueField } = props;
		this.state = {
			showLoading:false,
			selectedArray: checkedArray || [], //  记录保存的选择项
			checkedKeys: checkedArray.map(item=>{
				return item[valueField];
			}),
			expandedKeys: [],
			onSaveCheckItems: [],
			isAfterAjax: false,
			showLoading: false
		};
		
		this.treeData = [];
		this.treeDataCache = {};
	}
	shouldComponentUpdate(nextProps, nextState){
		return !is(nextState, this.state) || nextProps.showModal !== this.props.showModal;
	}
	componentWillReceiveProps(nextProps) {
		let { strictMode,checkedArray,valueField } = nextProps;
		//严格模式下每次打开必须重置数据
		if( nextProps.showModal && !this.props.showModal ){ //正在打开弹窗
			if( strictMode || !this.treeData.length ) {
				//开启严格模式 
				this.setState({
					showLoading: true
				},() => {
					this.initComponent();
				});
			}
			//20190124因為不再走constructor，导致checkedKeys和selectedArray不一致
			if(checkedArray.length>0){
				this.setState({
					selectedArray: checkedArray || [], //  记录保存的选择项
					checkedKeys: checkedArray.map(item=>{
						return item[valueField];
					}),
				})
			}
		}
	}
	initComponent = () => {
		let { matchUrl, param, value, jsonp, headers, checkedArray, onMatchInitValue } = this.props;
		this.getRefTreeData();
		//当有已选值，不做校验，即二次打开弹出层不做校验
		let valueMap = refValParse(value)
		if(checkedArray.length != 0 || !valueMap.refpk) return;
		if(matchUrl){
			request(matchUrl, { 
				method: 'post',
				data: {
					...param,
					refCode: param.refCode,
					pk_val: valueMap.refpk.split(',') || ''
				},
				jsonp: jsonp,
				headers
				
			}).then(response=>{
				let { data = [] } = response || {};
				if(Object.prototype.toString.call(onMatchInitValue) === '[object Function]'){
					onMatchInitValue(data);
				}
				this.setState({
					checkedArray: data,
					selectedArray: data,
					showLoading: false,
					checkedKeys: data.map(item=>{
						return item.refpk;
					})
				});
			}).catch(()=>{
				this.setState({
					checkedArray: [],
					selectedArray: [],
					showLoading: false,
					checkedKeys: []
				});
			});
		}else{
			//当时不使用 matchUrl 做校验时，直接使用默认数护具标记选项，但数据完整性会变弱。
			this.setState({
				checkedArray: [valueMap],
				selectedArray: [valueMap],
				showLoading: false,
				checkedKeys: valueMap.refpk.split(',')
			});
		}
		
	}
	//   获取树组件数据
	getRefTreeData(value) {
		let { param, refModelUrl, lazyModal, onAfterAjax, jsonp } = this.props;
		const URL = refModelUrl.treeUrl;
		param = Object.assign(param, {
			treeNode: "",
			treeloadData: lazyModal
		});
		getTreeList(URL, param, value, jsonp).then((res) => {
			if (onAfterAjax && !this.state.isAfterAjax) {
				onAfterAjax(res)
				this.setState({ isAfterAjax: true })
            }
            res = {"data":[{"code":"org1","children":[{"code":"bj","name":"北京总部-简","pid":"a4cf0601-51e6-4012-9967-b7a64a4b2d47","refcode":"bj","refpk":"5305416e-e7b4-4051-90bd-12d12942295b","id":"5305416e-e7b4-4051-90bd-12d12942295b","isLeaf":"true","refname":"北京总部-简"},{"code":"xd","name":"新道-简","pid":"a4cf0601-51e6-4012-9967-b7a64a4b2d47","refcode":"xd","refpk":"b691afff-ea83-4a3f-affa-beb2be9cba52","id":"b691afff-ea83-4a3f-affa-beb2be9cba52","isLeaf":"true","refname":"新道-简"},{"code":"yy3","name":"test3","pid":"a4cf0601-51e6-4012-9967-b7a64a4b2d47","refcode":"yy3","refpk":"e75694d9-7c00-4e9e-9573-d29465ae79a9","id":"e75694d9-7c00-4e9e-9573-d29465ae79a9","isLeaf":"true","refname":"test3"},{"code":"yy1","name":"test1","pid":"a4cf0601-51e6-4012-9967-b7a64a4b2d47","refcode":"yy1","refpk":"fd32ceeb-57a8-4f44-816e-fa660f5715ab","id":"fd32ceeb-57a8-4f44-816e-fa660f5715ab","isLeaf":"true","refname":"test1"}],"name":"用友集团","refcode":"org1","refpk":"a4cf0601-51e6-4012-9967-b7a64a4b2d47","id":"a4cf0601-51e6-4012-9967-b7a64a4b2d47","refname":"用友集团"}],"page":{"pageSize":100,"currPageIndex":0,"pageCount":0,"totalElements":0},"allpks":null};
            let { data=[] } = res;
            
			if (data && data.length > 0) {
				if (lazyModal) {
					data = data.map((item) => {
						delete item.children;
						return item;
					})
				}
				this.treeData = data;
				this.setState({
					showLoading: false
				});
				if (data[0].id) {
					this.setState({
						expandedKeys: [data[0].id],
					});
				}
			} else {
				this.treeData = [];
				this.setState({
					showLoading: false,
				});
			}
		}).catch(()=>{
			this.treeData = [];
			this.setState({
				showLoading: false
			});
		});
	}
	onLoadData = (treeNode) => {
		return new Promise((resolve) => {
			this.getRefTreeloadData(treeNode.props.eventKey,treeNode.props.attr)
			resolve();
		});
	}
	/**
	 * 懒加载
	 * @param {选择的节点} treeNode 
	 */
	getRefTreeloadData(treeNode,treeNodeAttr) {
		let { param, refModelUrl, lazyModal, tabData, jsonp ,lazyParam} = this.props;
		const URL = refModelUrl.treeUrl;
		if(this.treeDataCache[treeNode]){
			this.treeData = clearChild(this.treeData, treeNode, this.treeDataCache[treeNode]);
			this.setState({
				showLoading: false
			});
			return ;
		}
		//lazyModal 懒加载模式,懒加载的参数传递与其他的不一样
		// 两种情况，单树只需要一个参数，组合树需要多个参数
		if(!lazyParam.length){
			param = Object.assign(param, {
				treeNode: treeNode,
				treeloadData: lazyModal
			});
		}else{
			let treeNodeVal = {};
			treeNodeVal['refpk'] = treeNode;
			lazyParam.forEach(key=>{
				treeNodeVal[key] = treeNodeAttr[key]
			});
			param = Object.assign(param, {
				treeNode: JSON.stringify(treeNodeVal),
				treeloadData: lazyModal
			});
		}
		
		this.setState({
			showLoading: true
		});
		getTreeList(URL, param, "", jsonp).then((res) => {
			if (res) {
				let { data = [] } = res;
				this.treeDataCache[treeNode] = data;
				if(data.length !== 0){
					this.treeData = clearChild(this.treeData, treeNode, data);
				}
			}
			this.setState({
				showLoading: false
			});
			
		}).catch(()=>{
			this.setState({
				showLoading: false
			});
		});
	}

	
	render() {
		const {showLoading,selectedArray,checkedKeys,expandedKeys,onSaveCheckItems } = this.state;
		let childrenProps = Object.assign({},this.props,{
			treeData:this.treeData,
			showLoading:showLoading,
			selectedArray: selectedArray, //  记录保存的选择项
			checkedKeys: checkedKeys,
			expandedKeys: expandedKeys,
			onSaveCheckItems: onSaveCheckItems,
        });
        
        
		return (
			<RefTreeBaseUI {...childrenProps}/>
		);
	}
}
Tree.propTypes = propTypes;
Tree.defaultProps = defaultProps;
export default Tree;
