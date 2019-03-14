/**
 * 弹出编辑
 */
import React, { Component } from 'react';
import { Col, Row, FormControl, Label } from "tinper-bee";
import { actions } from "mirrorx";
import Form from 'bee-form';
import { Error, Info } from 'utils';
import PopDialog from 'components/Pop';
import FormError from 'components/FormError';

const { FormItem } = Form;

class OrgModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            btnFlag: props.btnFlag,//当前按钮状态
            rowData: props.rowData,//数据
        }
    }
    titleArr = ["新增", "修改", "详情"];

    componentWillReceiveProps(nextProps) {
        this.setState({
            btnFlag: nextProps.btnFlag,
            rowData: nextProps.rowData
        });
    }

    onSubmitEdit = () => {
        let _this = this;
        const { btnFlag } = _this.state;
        const { rowData: { id } } = _this.props;
        _this.props.form.validateFields(async (err, values) => {
            if (!err) {
                switch (btnFlag) {
                    case 0:
                        let resultInsert = await actions.app.postInsert(values);
                        if (resultInsert) {
                            this.onCloseEdit();
                            actions.app.loadList();
                            Info('数据添加成功,已刷新');
                        } else {
                            Error('添加数据失败');
                        }
                        break;
                    case 1:
                        let resultUpdate = await actions.app.postUpdate({ id, ...values });
                        if (resultUpdate) {
                            this.onCloseEdit();
                            actions.app.loadList();
                            Info('数据修改成功,已刷新');
                        } else {
                            Error('修改数据失败');
                        }
                        break;
                    case 2:

                        break;

                    default:
                        break;
                }
            }
        });
    }
    onCloseEdit = () => {
        let { close } = this.props;
        close && close();
    }

    /**
     *
     * @description 底部按钮是否显示处理函数
     * @param {Number} btnFlag 为页面标识
     * @returns footer中的底部按钮
     */
    onHandleBtns = (btnFlag) => {
        let _this = this;
        let btns = [
            {
                label: '确定',
                fun: _this.onSubmitEdit,
                icon: 'uf-correct'
            },

            {
                label: '取消',
                fun: this.onCloseEdit,
                icon: 'uf-back'
            }
        ];

        if (btnFlag == 2) {
            btns = [];
        }
        return btns;
    }
    render() {
        let _this = this;
        const { form, editModelVisible } = _this.props;
        const { rowData, btnFlag } = _this.state;
        const { getFieldProps, getFieldError } = form;
        let btns = _this.onHandleBtns(btnFlag);
        const {
            id,
            code,
            name,
            ts
        } = rowData;
        return (
            <div>
                <PopDialog show={editModelVisible}
                    title={this.titleArr[btnFlag]}
                    size='lg'
                    btns={btns}
                    autoFocus={false}
                    enforceFocus={false}
                    close={this.onCloseEdit}>
                    <Row className='form-panel'>
                        <Col md={6} xs={6} sm={6}>
                            <FormItem>
                                <Label>编码</Label>
                                <FormControl disabled={btnFlag == 2}
                                    {...getFieldProps('code', {
                                        initialValue: code || '',
                                        rules: [{
                                            required: true,
                                            message: '请输入编码',
                                        }]
                                    })}
                                />
                                <FormError errorMsg={getFieldError('code')} />
                            </FormItem>
                        </Col>
                        <Col md={6} xs={6} sm={6}>
                            <FormItem>
                                <Label>名称</Label>
                                <FormControl disabled={btnFlag == 2}
                                    {...getFieldProps('name', {
                                        initialValue: name || '',
                                        rules: [{
                                            required: true,
                                            message: '请输入名称',
                                        }]
                                    })}
                                />
                                <FormError errorMsg={getFieldError('name')} />
                                <FormControl type="hidden"
                                    {...getFieldProps('id', {
                                        initialValue: id
                                    })}
                                />
                                <FormControl type="hidden"
                                    {...getFieldProps('ts', {
                                        initialValue: ts
                                    })}
                                />
                            </FormItem>
                        </Col>
                    </Row>
                </PopDialog>
            </div>
        );
    }
}

OrgModal.displayName = 'OrgModal';
export default Form.createForm()(OrgModal);