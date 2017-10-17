
import {JGGRID_LOAD_STATE,JGGRID_RELOAD} from '../actions/def'
import immutable from 'immutable'

let grid = immutable.Map({isLoading:false});

function jqgrid_reducer(state = grid.toJS(),action) {

    switch (action.type){
        case JGGRID_LOAD_STATE:
            grid = grid.merge({isLoading:action.data.isLoading});
            state = grid.toJS();
            break;

    }

    return state;
}

export default jqgrid_reducer;