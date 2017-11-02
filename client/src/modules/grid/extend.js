
import u from '../../utils'
import _ from 'lodash'
import {renderToString} from 'react-dom/server'
import React from 'react'
import { Button } from 'antd';

let gridExtend =()=>{

    let genValue = (type) =>{
        let dict = u.getDict(type);
        let value={};
        dict.forEach(d=>value[d.value] =d.label);
        return value;
    };

    $.fn.fmatter.sys_dict =function (cellval,opts) {
        let {formatoptions} = opts.colModel;
        if(!formatoptions.value){
            formatoptions.value = genValue(formatoptions.type);
        }

        if(_.isBoolean(cellval)){
            cellval = cellval?1:0;
        }

        opts.colModel.formatter ='select';
        return $.fn.fmatter.call(this,'select',cellval,opts);
    };

    $.unformat.sys_dict =function (cellval,options,pos,cnt) {
        console.log(cellval,options,pos,cnt);
        return $.unformat.select(cellval,options,pos,cnt);
    }

    $.jgrid.beforeCreateEl = function(colModel,opt){
        let {edittype,editoptions} = colModel;
        if(edittype ==='sys_dict' && editoptions && editoptions.type){
            colModel.editoptions.value =  genValue(editoptions.type);
            opt.value = colModel.editoptions.value;
            colModel.edittype = 'select';
        }
    }
};


export default  gridExtend;