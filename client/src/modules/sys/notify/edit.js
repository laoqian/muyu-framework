import React from 'react'
import {findDOMNode} from 'react-dom'
import {Form} from 'antd'
import BaseComponent from '../../base/BaseComponent'
import colModel from './colModel'

class UserEditForm extends BaseComponent{
    constructor(props) {
        super(props);
        let $t  = this;

        $t.extend("Form");

        $t.baseUrl      = '/api/notify/';
        $t.groupNum     = 2;
        $t.moduleName   = "用户";
        $t.colModel     = colModel;
        $t.style ={width:'800px',height:'30px'};

        $t.saveData = ()=>$t.defaultSaveData(null,null,data=>Object.assign(data,{content:$t.editor.txt.html()}));

        $t.regEvent("didMount",()=>{
            let {wangEditor} = window;
            $t.editor =new wangEditor("#my-editor");
            $t.editor.customConfig.uploadImgShowBase64 = true;
            $t.editor.create();
            let data = $t.state.editData;
            if(data && data.content){
                $t.editor.txt.html(data.content);
            }
        });

        $t.render =()=>{
            let form  = $t.renderModel(this.renderRows(this.props.form,this.colModel,this.groupNum));
            return(<div>
                        {form}
                        <div id="my-editor" />
                    </div>)
        }
    }


}

export default Form.create()(UserEditForm);


