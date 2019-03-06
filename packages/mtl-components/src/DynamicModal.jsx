import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Modal } from 'antd';
import Container from '../meta/Container';

import * as ModalIndex from '../../../../common/components/modal';

import * as dynamicModalActions from '../../redux/dynamicModal';

const ModalMap = {};
Object.assign(ModalMap, ModalIndex);

class DynamicModal extends Component {
  close() {
    const { dynamicModalActions } = this.props;
    dynamicModalActions.closeModal();
  }
  handleOk(viewModel, groupCode) {
    viewModel.promiseExecute('afterOkClick', { key: groupCode }, () => {
      this.close();
    });
  }
  handleSave = () => {
    const { dynamicModal, dynamicModalActions } = this.props;
    const viewModel = dynamicModal.content.vm;
    const beforeSave = (beforeActData, callback) => {
      beforeActData.close = function () {
        dynamicModalActions.closeModal();
      };
      viewModel.promiseExecute('beforeSave', beforeActData, callback);
    };
    const afterSave = (afterActData, callback) => {
      viewModel.promiseExecute('afterSave', afterActData, function () {
        callback && callback(afterActData);
      });
    };
    viewModel.biz.action().save(viewModel.getParams().billNo, viewModel, null, beforeSave, function (afterSaveData) {
      afterSave(afterSaveData, function () {
        if (afterSaveData.err) {
          cb.utils.alert(afterSaveData.err.message, 'error');
          return;
        }
        dynamicModalActions.closeModal();
        const parentViewModel = viewModel.getCache('parentViewModel');
        if (parentViewModel)
          parentViewModel.execute('back');
      });
    });
  }
  render() {
    const { dynamicModal } = this.props;
    if (!dynamicModal.showModal)
      return null;
    const { groupCode, viewModel, title, content } = dynamicModal;
    if (groupCode) {
      const meta = viewModel.getViewMeta(groupCode);
      const containerType = meta.cControlType && meta.cControlType.trim().toLocaleLowerCase();
      if (containerType === 'modal') {
        const container = Object.assign({}, meta, { cControlType: 'div' });
        const width = 800;
        return (
          <Modal className='Table' visible title={meta.cName} width={846} onOk={() => this.handleOk(viewModel, groupCode)} onCancel={() => this.close()} width={width} maskClosable={false}>
            <Container className='modal-container' meta={container} viewModel={viewModel} width={width} parents='Modal' />
          </Modal>
        );
      }
      return null;
    }
    if (content) {
      const width = content.metaData.view.iWidth;
      return (
        <Modal visible title={title} width={width} onOk={this.handleSave} onCancel={() => this.close()} maskClosable={false}>
          <Container meta={content.metaData.view} viewModel={content.vm} width={width} parents='Modal' />
        </Modal>
      );
    }
    const ComName = ModalMap[dynamicModal.key];
    if (!ComName)
      return null;
    return <ComName {...dynamicModal.data} close={() => this.close()} />;
  }
}

function mapStateToProps(state) {
  return {
    dynamicModal: state.dynamicModal.toJS()
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dynamicModalActions: bindActionCreators(dynamicModalActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DynamicModal);
