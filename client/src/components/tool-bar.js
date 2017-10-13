import React ,{Component} from  'react'
import { Button, Form, Input, Select} from 'antd';
import _ from 'lodash';
import store from '../store/configure'
import {JGGRID_RELOAD} from '../actions/def'

const ButtonGroup = Button.Group;
const FormItem = Form.Item;

class SearchToolBarForm_ extends Component{
    constructor(){
        super();
        this.renderCtrls = this.renderCtrls.bind(this);
    }

    renderCtrls(item){
        const { getFieldDecorator } = this.props.form;

        switch(item.type){
            case 'input':
                return(
                    <FormItem label={item.text} hasFeedback key={item.name}>
                        {
                            getFieldDecorator(item.name,{
                                ruels:item.rules
                            })(<Input placeholder={item.palaceHolder}/>)
                        }
                    </FormItem>
                );
            case 'select':
                let ops = [{key:'请选择',value:''}];

                _(item.options).forEach(function (value,key) {
                    ops.push({key,value});
                });

                return(
                    <FormItem label={item.text} hasFeedback  key={item.name}>
                        <Select defaultValue={item.default}>
                            {
                                ops.map(op=>(
                                    <Select.Option value={''+op.value} key={op.value}>{op.key}</Select.Option>
                                ))
                            }

                        </Select>
                    </FormItem>
                );
        }
    }

    render(){
        let items = this.props.tools.items;
        let btn =this.props.tools.searchBtn;
        return(
            <Form className="my-tb-left" layout={'inline'} >
                {items.map(item=>(this.renderCtrls(item)))}
                <FormItem >
                    <Button type="primary" icon={btn.icon}>{btn.text}</Button>
                </FormItem>
            </Form>
        )
    }
}

const SearchToolBarForm = Form.create()(SearchToolBarForm_);

class ToolBar extends Component {

    render() {
        let config = this.props.config;
        let rightTool = config.rightTools;

        return (
            <div className="my-tb">
                <SearchToolBarForm tools={config.leftTools}/>
                <div className="my-tb-right">
                    {rightTool.isReload?<Button icon="reload" onClick={()=>{$("#dataGrid").trigger('reloadGrid')}}/>:''}
                    <ButtonGroup>
                        {
                            rightTool.items.map(btn=>(
                                <Button icon={btn.icon} key={btn.name} >{btn.name}</Button>
                            ))
                        }
                    </ButtonGroup>
                </div>
            </div>

        )
    }
}


ToolBar.propTypes = {

};


export default ToolBar;

