import createHistory from 'history/createBrowserHistory'
import {findDOMNode} from 'react-dom';

let ListComponent = function(){
    let $t = this;
    let u = this.u;
    $t.componentCheck();
    $t.gridOptions = {
        setQueryParam: () => $t.setQueryParam(),
        ondblClickRow: function (id) {
            $t.editRow(id);
        }
    };

    $t.setGridInitParam = (options) => {
        $t.gridOptions = Object.assign($t.gridOptions, options);

        /*支持行编辑时双击为编辑当前行*/
        if (options.inlineEdit) {
            $t.gridOptions.ondblClickRow = function (id) {
                $(this).editRow(id, false, function (id) {
                    this.p.editList.push(id);
                    if (this.p.treeGrid) {
                        $('#' + id, this).find('.tree-wrap-ltr').next().css({flex: 1, display: 'flex'});
                    }
                });
            }
        }
    };

    $t.history = createHistory({basename: '#user'});

    $t.getGrid = () => $('.ui-jqgrid-btable', findDOMNode($t.refs.grid));

    $t.getSelectedId = () => $t.getGrid().getGridParam('selrow');
    $t.getSelRowData = () => {
        let id = $t.getSelectedId();
        return id ? Object.assign($t.getGrid().getRowData(id), {id}) : null;
    };

    $t.saveEditList = () => {
        let g = $t.getGrid();
        let list = g.getRowData(null, true);
        let editList = g[0].p.editList;
        let eList = [];

        try{
            editList.forEach(id => {
                g.saveRow(id, null, null, null, null, (rowid, msg) => {
                    throw new Error(msg);
                });
            });
        }catch (err){
            u.tip(msg, 'error');
            return false;
        }

        list.forEach(row => {
            $.inArray(row.id, editList) !== -1 ? eList.push(row) : null;
        });

        $t.editList = eList;
        return true;
    };




    $t.eventFunc['添加'] = $t.addRow = async () => {
        let row = $t.getSelRowData();
        if (row) {
            try {
                let bean = await $t.loadSelData(row.id);
                row = bean.data;
            } catch (err) {
                u.tip(err.msg, 'error');
            }
        }

        $t.history.push({pathname: '/edit', type: '添加', row, grid: $t.getGrid()})
    };

    $t.eventFunc['删除'] = $t.deleteRow = () => {
        let row = $t.getSelRowData();
        if (!row) {
            return u.tip('未选择要删除的列', 'error');
        }

        $t.history.push({pathname: '/delete', row, grid: $t.getGrid()});
    };

    $t.eventFunc['重加载'] = $t.reload = () => {
        $t.getGrid().trigger('reloadGrid')
    };

    $t.regEvent("升级", 'upgradeRow', () => $t.chgLevel(0));
    $t.regEvent("降级", 'degradeRow', () => $t.chgLevel(1));
    $t.regEvent("上移", 'shiftUpRow', () => $t.chgLevel(2));
    $t.regEvent("下移", 'shiftDownRow', () => $t.chgLevel(3));

    $t.setQueryParam = () => {
        if ($t.serachForm) {
            let {validateFields} = $t.serachForm;
            validateFields((err,values) => {
                if (!err) {
                    $t.getGrid().setGridParam({postData: values})
                }
            })
        }
    };

    $t.click = item => $t.eventFunc[item.name] ? $t.eventFunc[item.name]() : console.error('Warning:未定义的事件：' + item.name);



    $t.register = form => $t.serachForm = form;
};

export default ListComponent;