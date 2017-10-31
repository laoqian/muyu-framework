import {Component} from 'react'
import createHistory from 'history/createBrowserHistory'
import {findDOMNode} from 'react-dom';
import {notification} from 'antd';
import _ from 'lodash';

export default class ListComponent extends Component{

    constructor(props){
        super(props);
        let $t = this;

        $t.gridOptions = {
            setQueryParam: () => $t.setQueryParam(),
            ondblClickRow: function(id){
                $t.editRow(id);
            }
        };

        $t.setGridInitParam = (options)=>{
            $t.gridOptions = Object.assign($t.gridOptions,options);

            /*支持行编辑时双击为编辑当前行*/
            if(options.inlineEdit){
                $t.gridOptions.ondblClickRow = function(id){
                    $(this).editRow(id,false,function(id){
                        this.p.editList.push(id);
                        if(this.p.treeGrid){
                            $('#'+id,this).find('.tree-wrap-ltr').next().css({flex:1,display:'flex'});
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

        $t.getEditList = ()=> {
            let g = $t.getGrid();
            let list = g.getRowData(null, true);
            let pass = true;
            let editList = g[0].p.editList;
            let eList =[];

            editList.forEach(id => {
                g.saveRow(id, null, null, null, null, (rowid,msg)=>{
                    pass = false;
                    notification.error({message:msg});
                });
            });

            list.forEach(row => {
                $.inArray(row.id,editList)!==-1?eList.push(row):null;
            });

            return pass?eList:null;
        };

        $t.eventFunc = {};

        $t.regEvent = (cnName,enName,func)=>{
            $t.eventFunc[cnName] = $t[enName] = func;
        }

        $t.eventFunc['修改'] = $t.editRow = async (id) => {
            let row;
            if(!id){
                row = $t.getSelRowData();
                id = row.id;
            }else{
                row = $t.getGrid().getRowData(id);
            }

            if (!id) {
                return notification.error({message: '未选择,要修改的菜单'});
            } else {
                try{
                    let bean = await $t.loadSelData(id);
                    row = bean.data;
                    notification.success({message: '编辑菜单：' + row.id});
                }catch (err){
                    return notification.error({message:err.msg});
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
                $.get($t.encodeUrl('get?id='+ id), function (bean) {
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