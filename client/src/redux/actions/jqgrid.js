
import {JGGRID_RELOAD} from './def'

export function reloadGrid(gridName) {
    return {
        type: JGGRID_RELOAD,
        data: {gridName},
    }
}
