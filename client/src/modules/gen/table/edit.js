import React                                    from 'react'
import {connect}                                from 'react-redux'
import {Form, Modal}    from 'antd';
import JqgridWrapper                            from '../../grid/index'
import BaseComponent                            from "../../base/BaseComponent";
import u                                        from '../../../utils'
import colModel                                 from './colModel'
import tableColModel                            from './tableColModel'
import {List}                                   from 'immutable'

class GenEditForm extends BaseComponent {
    constructor(props) {
        super(props);
        let $t = this;

        $t.extend("List", "Form");
        $t.baseUrl = '/api/gen/';
        $t.moduleName = '业务表';
        $t.state.colModel = List(colModel).toJS();

        $t.setGridInitParam({
            url: $t.encodeUrl('findTableColumn'),
            baseUrl: $t.baseUrl,
            gridName: "sysGenEdit",
            inlineEdit: true,
            pagerAble: false,
            rownumbers: false,
            colModel: tableColModel,
            ondblClickRow: null
        });

        $t.saveData = () => {
            let list;
            $t.saveEditList();
            list = $t.getGrid().getRowData(null, true);
            $t.defaultSaveData('saveBatch', 'post', data => ({data, list}), () => {
                let {grid} = $t.props.location;
                if (grid) {
                    grid.trigger('reloadGrid');
                }

                $t.reload()
            })
        };


        $t.beforeBindData = (type, row) => {
        };

        $t.setDefaultData = (row) => {
            return row;
        };

        $t.loadTableInfo = (tableName) => {
            let grid = $t.getGrid();
            grid.setGridParam({postData: {tableName}});
            grid.trigger('reloadGrid');
        };

        $t.regEvent('didMount', () => {
            $t.register($t.props.form);
            u.get($t.encodeUrl('getTableList'), (bean) => {
                if (bean.success()) {
                    let column = _.find(colModel, col => col.name === 'name');
                    if (column) {
                        let value = [];
                        bean.data.forEach(op => {
                            value.push({value: op, label: op});
                        });

                        if (!column.editoptions) {
                            column.editoptions = {};
                        }

                        column.editoptions.value = value;
                        $t.setState({colModel: List(colModel).toJS()});
                    }
                }
            });
        })
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
                    <Form ref="form" className="my-form-square" children={this.renderRows(this.props.form,this.state.colModel,4)}/>
                    <JqgridWrapper options={this.gridOptions} ref="grid"/>
                </div>
            </Modal>
        )
    }
}

export default  Form.create()(GenEditForm);

