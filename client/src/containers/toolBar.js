import React ,{Component} from  'react'
import { Button, Form, Input, Select} from 'antd';
import {connect} from 'react-redux'
import _ from 'lodash';

const ButtonGroup = Button.Group;
const FormItem = Form.Item;

class SearchToolBarForm_ extends Component{
    constructor(props){
        super(props);

        this.renderCtrls =(item)=>{
            const { getFieldDecorator } = this.props.form;
            let children;
            switch(item.type){
                case 'input':
                    children =  <Input placeholder={item.palaceHolder}/>;
                    break;
                case 'select':
                    let ops = [{key:'请选择',value:''}];
                    _(item.options).forEach(function (value,key) {
                        ops.push({key,value});
                    });

                    children = <Select defaultValue={item.default}
                                       children={ops.map(op=>(<Select.Option value={''+op.value} key={op.value}>{op.key}</Select.Option>))}/>
            }

            return children?<FormItem
                                label={item.text}
                                hasFeedback
                                key={item.name}
                                children={getFieldDecorator(item.name,{ruels:item.rules})(children)}
                            />:null;
        };

    }

    componentDidMount(){
        let {register} = this.props;
        register(this.props.form);
    }

    render(){
        let items = this.props.tools.items;
        let btn =this.props.tools.searchBtn;
        let {click} =this.props;
        return(
            <Form className="my-tb-left" layout={'inline'} >
                {items.map(item=>(this.renderCtrls(item)))}
                <FormItem >
                    <Button type="primary" onClick={()=>click({name:'重加载'})} icon={btn.icon}>{btn.text}</Button>
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
        let {left,right,reload,click,register} = this.props;

        return (
            <div className="my-tb">
                <SearchToolBarForm tools={left} register={register} click={click}/>
                <div className="my-tb-right">
                    {reload?<Button icon="reload" onClick={()=>click({name:'重加载'})}/>:''}
                    <ButtonGroup>
                        {
                            right.items.map(btn=>(
                                <Button icon={btn.icon} key={btn.name} onClick={()=>click(btn)}>{btn.name}</Button>
                            ))
                        }
                    </ButtonGroup>
                </div>
            </div>

        )
    }
}


function mapStateToProps(state){
    return {
    }
}

function mapActionToProps(dispatch) {
    return {
    }
}

export default connect(mapStateToProps, mapActionToProps)(ToolBar);


