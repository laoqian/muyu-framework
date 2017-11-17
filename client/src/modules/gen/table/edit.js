import React                                    from 'react'
import {connect}                                from 'react-redux'
import {Form, Modal,Select}    from 'antd';
import {userGet}                                from '../../../redux/actions/user'
import {notification}                           from 'antd';
import JqgridWrapper                            from '../../grid/index'
import BaseComponent                            from "../../base/BaseComponent";
import u                                        from '../../../utils'
import colModel                                 from './colModel'
import tableColModel                            from './tableColModel'

const Option = Select.Option;

class GenEditForm extends BaseComponent {
    constructor(props) {
        super(props);
        let $t = this;

        $t.extend("List","Form");
        $t.baseUrl      = '/api/gen/';
        $t.moduleName   = '业务表';

        $t.setGridInitParam({
            url             : $t.encodeUrl('findTableColumn'),
            baseUrl         : $t.baseUrl,
            gridName        : "sysGenEdit",
            inlineEdit      : true,
            pagerAble       : false,
            rownumbers      : false,
            colModel        : tableColModel,
            ondblClickRow   : null
        });

        this.saveData = () => {
            let list;
            this.saveEditList();
            list = this.getGrid().getRowData(null,true);
            this.defaultSaveData('save',data=>{data,list})
        };



        $t.loadTableInfo = (tableName)=>{
            let grid =$t.getGrid();
            grid.setGridParam({postData: {tableName}});
            grid.trigger('reloadGrid');
        };


        $t.componentDidMount = () => {
            $t.bindDataOnce();
            this.register(this.props.form);

            u.get($t.encodeUrl('getTableList'),(bean)=>{
                if(bean.success()){
                    let name =_.find(colModel,col=>col.name ==='name');
                    if(name) {
                        let select = name.component;
                        bean.data.forEach(op => {
                            select.props.children.push(<Option value={op}>{op}</Option>)
                        });
                    }
                }
            });
        };
    }



    render() {

        return (
            <Modal
                title={this.title()}
                wrapClassName="vertical-center-modal"
                visible={true}
                onOk={() => this.modalClick('ok')}
                onCancel={() => this.modalClick('cancel')}
                confirmLoading={this.state.submiting}
            >
                <div style={{width: '1200px', height: '600px'}} className="flex-vs">
                    <Form ref="form" className="my-form-square" children={this.u.renderRows(this.props.form,colModel,4)}/>
                    <JqgridWrapper options={this.gridOptions} ref="grid"/>
                </div>
            </Modal>
        )
    }
}

export default  Form.create()(GenEditForm);

