import {Component} from 'react'
import createHistory from 'history/createBrowserHistory'
import {findDOMNode} from 'react-dom';
import {notification} from 'antd';

export default class ListComponent extends Component{

    constructor(props){
        super(props);
        let $t = this;

        $t.gridOptions = {
            setQueryParam: () => $t.setQueryParam(),
            ondblClickRow: () => {
                $t.editRow();
                $t.isGridDbClick = true;
            },
            beforeSelectRow: (id) => {
                let selectd = $t.getSelectedId() !== id;
                if (!selectd) {
                    setTimeout(() => {
                        $t.isGridDbClick ? $t.isGridDbClick = false : $t.getGrid().resetSelection();
                    }, 200)
                }

                return selectd;
            }
        };

        $t.setGridInitParam = (options)=>{
            $t.gridOptions = Object.assign($t.gridOptions,options);
        };

        $t.history = createHistory({basename: '#user'});
        $t.isGridDbClick = false;

        $t.getGrid = (() => {
            let grid;
            return () => {
                if (!grid || grid.length === 0) {
                    grid = $('.ui-jqgrid-btable', findDOMNode($t.refs.grid));
                }
                return grid;
            }
        })();

        $t.getSelectedId = () => $t.getGrid().getGridParam('selrow');
        $t.getSelRowData = () => {
            let id = $t.getSelectedId();
            return id ? Object.assign($t.getGrid().getRowData(id), {id}) : null;
        };

        $t.eventFunc = {};

        $t.regEvent = (cnName,enName,func)=>{
            $t.eventFunc[cnName] = $t[enName] = func;
        }

        $t.eventFunc['修改'] = $t.editRow = async () => {
            let row = $t.getSelRowData();
            if (!row) {
                return notification.error({message: '未选择,要修改的菜单'});
            } else {
                notification.success({message: '编辑菜单：' + row.id});
                try{
                    let bean = await $t.loadSelData(row.id);
                    row = bean.data;
                }catch (err){
                    notification.error({message:err.msg});
                }
            }

            this.history.push({pathname: '/edit', type: 'modify', row, grid: $t.getGrid()});
        };

        $t.eventFunc['添加'] = $t.addRow = async ()=>{
            let row  = $t.getSelRowData();

            if(row){
              try{
                  let bean = await $t.loadSelData(row.id);
                  row = bean.data;
              }catch (err){
                  notification.error({message:err.msg});
              }
            }

            $t.history.push({pathname: '/edit', type:'add', row, grid:$t.getGrid()})
        };

        $t.eventFunc['删除'] = $t.deleteRow = ()=>{
            let row  = $t.getSelRowData();
            if(!row){
                return notification.error({message:'未选择要删除的列'});
            }

            $t.history.push({pathname: '/delete', row,grid:$t.getGrid()});
        };

        $t.eventFunc['重加载'] = $t.reload = () => {
            $t.setQueryParam();
            $t.getGrid().trigger('reloadGrid')
        };

        $t.regEvent("升级",'upgradeRow'   ,()=>$t.chgLevel(0));
        $t.regEvent("降级",'degradeRow'   ,()=>$t.chgLevel(1));
        $t.regEvent("上移",'shiftUpRow'   ,()=>$t.chgLevel(2));
        $t.regEvent("下移",'shiftDownRow' ,()=>$t.chgLevel(3));


        $t.encodeUrl = (url)=>$t.baseUrl+url;

        $t.setQueryParam = () => {
            if ($t.serachForm) {
                let {validateFields} = $t.serachForm;
                validateFields((err, values) => {
                    if (!err) {
                        $t.getGrid().setGridParam({postData: values})
                    }
                })
            }
        }

        $t.click = item => $t.eventFunc[item.name] ? $t.eventFunc[item.name]() : console.error('Warning:未定义的事件：' + item.name);

        $t.loadSelData =(id)=>{
            return new Promise((res,rej)=>{
                $.get('/api/menu/get?id=' + id, function (bean) {
                    if (bean.code === 0 && bean.data) {
                        res(bean);
                    } else {
                        rej(bean);
                    }
                });
            })
        };

        $t.register = form => $t.serachForm = form;

    }
}