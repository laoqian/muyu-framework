import React from 'react'
import {Row, Col, Form, Modal} from 'antd'
import _ from 'lodash'
import Loading from '../../layouts/loading'

const FormItem = Form.Item;

let FormComponent = function (){
    let $t  = this;
    let {u} = this;
    let state ={
        editData: null,
        submiting: false
    };

    if($t.state){
        Object.assign($t.state,state)
    }else{
        $t.state =state;
    }

    $t.modalClick = (type) => {
        if (type === 'ok') {
            $t.setState({submiting: true});

            if(!_.isFunction($t.saveData)){
                $t.defaultSaveData();
            }else{
                $t.saveData();
            }
        } else {
            $t.props.history.push('/');
        }
    };

    $t.defaultSaveData = (url,beforeSave,afterSave) => {
        let {validateFields} = $t.props.form;

        validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                if (!$t.state.editData) {
                    $t.state.editData = {};
                }
                let data;
                Object.assign($t.state.editData, values);
                if (_.isFunction(beforeSave)) {
                    data = beforeSave($t.state.editData);
                }else{
                    data = $t.state.editData;
                }

                u.get($t.encodeUrl(url ? url : 'save'), data, function (data) {
                    if (data.success()) {
                        u.success(data.msg);
                    }else{
                        u.error(data.msg);
                    }

                    if(_.isFunction(afterSave)){
                        afterSave(data);
                    }

                    $t.setState({submiting:false});
                })
            }
        });
    };

    $t.bindDataOnce = () => {
        let {row, type} = $t.props.location;
        const {setFieldsValue} = $t.props.form;

        if (!$t.props.location.binded) {
            $t.props.location.binded = true;

            switch (type) {
                case 'add':
                    if (row) {
                        $t.state.editData = {parentId: row.parentId};
                        setFieldsValue($t.filter(row));
                    }
                    break;
                case 'modify':
                    $t.state.editData = row;
                    setFieldsValue($t.filter(row));
                    break;
            }
        }
    };

    $t.title = () => {
        let title = $t.moduleName + '添加';
        let {type,binded} = $t.props.location;

        if (binded) {
            switch (type) {
                case 'modify':
                    title = $t.moduleName + `修改-${this.state.editData.id}`;
                    break;
                case 'add':
                    title = $t.moduleName + '添加';
                    break;
            }
        }

        return title;
    };

    $t.componentDidMount = () => {
        $t.bindDataOnce();
    };

    $t.componentDidUpdate = () => {
        $t.bindDataOnce();
    };

    $t.componentWillReceiveProps = () => {
        $t.state.submiting = false;
    };

    if(!$t.render){
        $t.render = () => {
            let style = this.style;
            if (!style) {
                style = {width: '400px', height: '460px'};
            }

            return (
                <Modal
                    title={this.title()}
                    wrapClassName="vertical-center-modal"
                    visible={true}
                    onOk={() => this.modalClick('ok')}
                    onCancel={() => this.modalClick('cancel')}
                    confirmLoading={this.state.submiting}
                >
                    <Form ref="userForm" className="my-form-square" style={style} children={this.u.renderRows(this.props.form,this.colModel,this.groupNum)}/>
                    {this.loadingData ? <Loading isLayerHide={true} text={this.state.loadingText}/> : ''}
                </Modal>
            )
        };
    };
}


export default FormComponent;