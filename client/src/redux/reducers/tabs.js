
import {TAB_ADD,TAB_DELETE,TAB_SEL} from '../actions/def'
import immutable from 'immutable'
import _ from 'lodash'

let tabs = immutable.Map({
    penes: [],
    activeKey:undefined
});




function tab_reducer(state=tabs.toJS(),action) {
    let ts = tabs.toJS();
    let penes = ts.penes;
    let pene = action.data;
    let __i ;

    if(_.isObject(pene)){
        __i = _.findIndex(penes,chr=>{
            return chr.key === pene.key
        });
    }

    switch (action.type){
        case TAB_ADD:
            __i===-1?penes.push(pene):0;

            tabs = tabs.merge({penes,activeKey:pene.key});
            break;
        case TAB_DELETE:
            if(__i< 0){
                return tabs.toJS();
            }

            let delKey = penes[__i].key;

            _.remove(penes,chr=>{
                return chr.key === pene.key
            });

            if(penes.length===0){
                tabs = tabs.merge({penes,activeKey:undefined});
            }
            else if(delKey===ts.activeKey){
                if(__i>=penes.length){
                    __i--;
                }

                tabs = tabs.merge({penes,activeKey:penes[__i].key});
            }
            else{
                tabs = tabs.merge({penes,activeKey:ts.activeKey});
            }

            break;
        case TAB_SEL:
            tabs = tabs.merge({penes,activeKey:pene.key});
    }


    return tabs.toJS();
}


export default tab_reducer