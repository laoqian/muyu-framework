import React ,{Component} from  'react'
import { Button, Icon, Form, Input, Tooltip,  Cascader, Select, Row, Col, Checkbox,  AutoComplete } from 'antd';
import _ from 'lodash';

const ButtonGroup = Button.Group;
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;


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
                    <FormItem label={item.text} hasFeedback key={item.value}>
                        {
                            getFieldDecorator(item.name,{
                                ruels:item.rules
                            })(<Input placeholder={item.palaceHolder}/>)
                        }
                    </FormItem>
                );
            case 'select':
                let ops = [];

                _(item.options).forEach(function (value,key) {
                    ops.push({key,value});
                });

                return(
                    <FormItem label={item.text} hasFeedback  key={item.value}>
                        <Select defaultValue={item.default}>
                            {
                                ops.map(op=>(
                                    <Option value={''+op.value} key={op.value}>{op.key}</Option>
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
                {items.map(item=>this.renderCtrls(item))}
                <FormItem >
                    <Button type="primary" icon={btn.icon}>{btn.text}</Button>
                </FormItem>
            </Form>
        )
    }
}

const SearchToolBarForm = Form.create()(SearchToolBarForm_);

class ToolBar extends Component {

    constructor(props){
        super(props);
    }

    render() {
        let config = this.props.config;
        let rightTool = config.rightTools;
        let reload ='';
        if(rightTool.isReload){
            reload =(<Button icon="reload"></Button>)
        }

        return (
            <div className="my-tb">
                <SearchToolBarForm tools={config.leftTools}/>
                <div className="my-tb-right">
                    {reload}

                    <ButtonGroup>
                        {
                            rightTool.items.map(btn=>(
                                <Button icon={btn.icon} key={btn.name}>{btn.name}</Button>
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

