
import {JGGRID_RELOAD} from '../actions/def'
import immutable from 'immutable'

let grid = immutable.Map({isLoading:false,gridName:null});

function jqgrid_reducer(state = grid.toJS(),action) {

    switch (action.type){
        case JGGRID_RELOAD:
            grid = grid.merge({gridName:action.data.gridName});
            state = grid.toJS();
            break;

    }

    return state;
}

export default jqgrid_reducer;