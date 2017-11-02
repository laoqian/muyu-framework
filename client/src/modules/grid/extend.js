
import u from '../../utils'
import _ from 'lodash'


let gridExtend =()=>{

    $.fn.fmatter.sys_dict =function (cellval,opts) {
        let {formatoptions} = opts.colModel;
        if(!formatoptions.value){
            let dict = u.getDict(formatoptions.type);
            let value={};
            dict.forEach(d=>value[d.value] =d.label);
            formatoptions.value = value;
        }

        if(_.isBoolean(cellval)){
            cellval = cellval?1:0;
        }

        return $.fn.fmatter.call(this,'select',cellval,opts);
    };

    $.unformat.sys_dict =function (cellval,options,pos,cnt) {
        return $.unformat.select(cellval,options,pos,cnt);
    }
};


export default  gridExtend;