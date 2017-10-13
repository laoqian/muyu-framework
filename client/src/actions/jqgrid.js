
import {JGGRID_LOAD_STATE} from './def'

export function jqgrid_action(isLoading) {
    return {
        type: JGGRID_LOAD_STATE,
        data: {isLoading},
    }
}
