import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import Loading from '../base/Loading'
import {connect} from 'react-redux'
import {findDOMNode,render} from 'react-dom';
import { Button } from 'antd';
const ButtonGroup = Button.Group;
import _ from 'lodash'
import u from '../../utils'
import {notification} from 'antd';

class JqgridWrapper extends Component {
    constructor() {
        super();
        let __this = this;
        this.state = {};
        this.state.defaultOptions = {
            url: 'api/menu/findPage',
            editurl:'clientArray',
            styleUI: 'Bootstrap',
            datatype: "json",
            mtype: "GET",
            autowidth: true,
            jsonReader: {
                id: 'id', root: "list", page: "pageNum", userdata: "otherData",
                total: "pageCount", records: "total", subgrid: {root: "list"}
            },
            treeReader: {	// 自定义树表格JSON读取参数
                level_field: "level", parent_id_field: "parentId",
                leaf_field: "leaf", expanded_field: "expanded", icon_field: "_icon"
            },
            prmNames: {
                page: "pageNum", rows: "pageSize", sort: "orderBy",
                order: "sord", search: "_search", nd: "nd", id: "id",
                oper: "oper", editoper: "edit", addoper: "add", deloper: "del",
                subgridid: "id", npage: null, totalrows: "pageCount"
            },
            sortname: 'a.id',
            viewrecords: true,
            lazyLoad: false,
            rownumbers: true,
            sortableColumn: false,
            shrinkToFit: false,


            /*行编辑扩展*/
            editList:[],

            /*treeGrid参数*/
            tree_root_level:1,
            treeGridModel: 'adjacency', /*指定为adjacency模式时通过parentid来生成树。nested模式通过left和right生成树 */

            /*分页选项*/
            rowNum: 30,
            rowList: [25, 50, 100, 200],

            beforeRequest: function () {
                let grid = __this.state.gridTable;
                let {setQueryParam} = __this.state.curOptions;

                setQueryParam ? setQueryParam() : null;
                $('.ui-jqgrid .loading', grid).remove();
                Loading.show("拼命加载中");
                /*缓存上一次的数据*/
                if(this.p && this.p.data){
                    __this.cacheList = this.p.data;
                }
            },
            beforAddJsonData:function(data,rcnt,more,adjust){
                if(__this.cacheList && data.list && data.list.length>0){
                    let list = data.list;
                    list.forEach(data=>{
                        let cache = _.find(__this.cacheList,(chr)=>chr['_id_'] ===data.id)
                        if(cache){
                            data.expanded = cache.expanded;
                        }
                    })
                }
            },
            loadComplete: function () {
                if(this.p.muiltSelect){
                    let selList = this.p.selectedList;
                    selList.forEach(id=>{
                        $('#'+id,this).addClass('success');
                    })
                }else{
                    $('#'+this.p.selrow,this).addClass('success');
                }
                Loading.hide();
            },
            gridComplete: function () {
                Loading.hide();
            },

            loadError: function (data) {
                u.error(data.responseJSON.message);
                console.error(data);
            },
        };

        this.state.treeToolBar ={
            toolbar:[true,"top"],
        };
    }

    componentWillMount() {
        this.state.curOptions = Object.assign(this.state.defaultOptions, this.props.options);
        let {colModel,treeGrid} = this.state.curOptions;

        if(treeGrid){
            this.state.curOptions = Object.assign(this.state.curOptions,this.state.treeToolBar);
        }


        let id =false,isNewRecord=false;
        colModel.forEach(item=>{
            item.name==='id'?id=true:null;
            item.name==='isNewRecord'?isNewRecord=true:null;

            /*默认设置为不可排序*/
            !item.sortable ? item.sortable = false : null;
        });

        !id?colModel.push({name:'id',hidden:true}):null;
        !isNewRecord?colModel.push({name:'isNewRecord',hidden:true}):null;

        /*增加数据库编辑属性*/
        let {gridName} = this.state.curOptions;
        if(gridName){
            colModel.forEach(c=>{
                if(c.editable){
                    let column =u.getTableColumn(gridName,c.name);
                    if(column){
                        c.editoptions =c.editoptions?c.editoptions:{};
                        let options   = {maxLength:column.length,required:!column.isEmpty};
                        c.editoptions = Object.assign(c.editoptions,options);
                    }
                }
            })
        }

        this.state.curOptions.talbleId =  this.state.curOptions.gridName + 'Table';
        this.state.curOptions.pager = '#' + this.state.curOptions.gridName + 'pager';
        this.state.curOptions.topToobar = '#' + 't_'+this.state.curOptions.talbleId;

        /*在树模式时，支持多选*/
        if(this.state.curOptions.muiltSelect){
            this.state.curOptions.selectedList = [];

            this.state.curOptions.beforeSelectRow = function (id,e) {
                let selId    = this.p.selrow;
                let list     = this.p.data;
                let selList  = this.p.selectedList;

                /*shift按下时根据上一个单击和现在单击的进行多选*/
                if(e.shiftKey){
                    this.p.selectedList =[];
                    let start = _.findIndex(list,item=>item.id===selId);
                    let end = _.findIndex(list,item=>item.id===id);
                    if(start>=0 && end>=0){
                        if(start>end){
                            start ^=end;
                            end   ^=start;
                            start ^=end;
                        }

                        for(let i=0;i<list.length;i++){
                            let row = list[i];
                            if(i>=start && i<=end){
                                $('#'+row.id).addClass('success');
                                this.p.selectedList.push(row.id);
                            }else{
                                $('#'+row.id).removeClass('success');
                            }
                        }
                    }
                }else if(e.ctrlKey){
                    /*ctrl按下时根据已选中就是反选，未选中就设置为选中*/
                    let seled = false;
                    selList.forEach(nid=>id===nid?seled=true:null);

                    if(seled){
                        this.p.selectedList =[];
                        selList.forEach(nid=>{
                            nid!==id?this.p.selectedList.push(nid):null;
                        });

                        $('#'+id).removeClass('success');
                        this.p.selrow = this.p.selectedList.length>0?this.p.selectedList[0]:null;
                    }else{
                        this.p.selectedList.push(id);
                        $('#'+id).addClass('success');
                        this.p.selrow = id;
                    }
                }else{
                    let seled = false;
                    this.p.selectedList =[];

                    selList.forEach(nid=>{
                        id===nid?seled=true:null;
                        $('#'+nid).removeClass('success')
                    });

                    if(this.p.selrow!==id || (selList.length>1 && seled)){
                        $('#'+id).addClass('success');
                        this.p.selrow = id;
                        this.p.selectedList.push(id);
                    }else{
                        this.p.selrow = null;
                    }
                }

                return false;
            }
        }
    }

    componentDidMount(prevProps, prevState) {
        let gridTable = findDOMNode(this.refs.gridTable);

        this.state.gridTable = $(gridTable);
        let grid =this.state.gridTable.jqGrid(this.state.curOptions);

        let edit = true;
        if(this.state.curOptions.treeGrid || edit){
            let props = {options:this.state.curOptions,grid,edit};
            let e = document.getElementById('t_'+this.state.curOptions.talbleId);

            if(e){
                render(<GridToolBar {...props} />,e);
            }
        }
    }

    render() {
        let pager = this.state.curOptions.pager.substr(1);
        let {talbleId,pagerAble} = this.state.curOptions;

        return (
            <div className='my-grid-wrapper' ref="gridWrapper">
                <table ref="gridTable" id={talbleId}/>
                {pagerAble?<div id={pager}/>:null}
            </div>
        )
    }
}


JqgridWrapper.propTypes = {};


function mapStateToProps(state) {
    return {
        grid: state.grid
    }
}

function mapActionToProps(dispatch) {
    return {}
}


class GridToolBar extends Component{
    constructor(props){
        super(props);
        let {grid,options} = this.props;

        this.expand = (level)=>{
            let list  = grid.getRowData(null,true);
            list.forEach(row=>{
                if(!row.leaf){
                    if(row.level>=level){
                        if(row.expanded){
                            grid.collapseRow(row);
                            grid.collapseNode(row);
                        }
                    }else{
                        if(!row.expanded){
                            grid.expandRow(row);
                            grid.expandNode(row);
                        }
                    }
                }
            })
        };

        this.eventFunc ={};
        this.eventFunc['升级'] =
        this.eventFunc['降级'] =
        this.eventFunc['上移'] =
        this.eventFunc['下移'] = key=>{
            let idList = grid.getGridParam('selectedList');
            if(idList.length===0){
                return notification.error({message:'未选择任何要操作的行！'});
            }

            let data ={ids:idList.join(','),type:key};
            u.get(options.baseUrl+'transform'+'?'+$.param(data),data=>{
                if(data.code===0){
                    grid.trigger('reloadGrid');
                }
            })
        };

        this.baseId = 825;
        this.setSort   =  (row)=>{
            let list = grid.getRowData(null,true);
            let pid = row.parentId?row.parentId:"0";
            let sort = 10;

            list.forEach(t=>{
                let prId = t.parentId?t.parentId:'0';
                prId===pid && t.sort>=sort?sort=t.sort+10:null
            });

            row.sort = sort;
        };

        this.createRow = ()=>{
            let data            =   {};
            data.id             =   (this.baseId++).toString();
            data.isNewRecord    =   true;

            if(options.treeGrid){
                let id  = grid.getGridParam('selrow');
                let row = grid.getRowData(id,true);

                if(id){
                    data.parentId   = id;
                    data.level      = row.level+1;
                }else{
                    data.parentId   = null;
                    data.level      = options.tree_root_level;
                }

                this.setSort(data);

                data.isShow     = 0;
                data.leaf       = true;
                data.expanded   = true;
            }

            let {beforeAddRow} = options;
            if(_.isFunction(beforeAddRow)){
                beforeAddRow.call(grid,data);
            }

            return data;
        };

        this.eventFunc['添加'] = ()=>{
            let row = this.createRow();
            if(options.treeGrid){
                grid.addChildNode(row.id,row.parentId,row,true);
            }else{
                grid.addRow(row,true);
            }

            grid.editRow(row.id,false,function(id){
                this.p.editList.push(id);
                if(this.p.treeGrid){
                    $('#'+id,this).find('.tree-wrap-ltr').next().css({flex:1,display:'flex'});
                }
            });
        };


        this.click = key=>{
            if(_.isNumber(key)){
                this.expand(key);
            }else if(_.isFunction(this.eventFunc[key])){
                this.eventFunc[key](key);
            }else{
                console.error('Warning:grid操作事件未定义：'+key);
            }
        }

        this.renderBtn = (key,icon)=><Button onClick={()=>this.click(key)} icon={icon}>{key}</Button>;
    }

    render(){
        let style={'marginLeft':'10px'};
        let {options,edit} = this.props;
        let opList =[
            {name:'升级',icon:'rollback'},
            {name:'降级',icon:'enter'},
            {name:'上移',icon:'arrow-up'},
            {name:'下移',icon:'arrow-down'}
        ];

        let expBtn=null,expBtnChildren=[],opBtn=null,opBtnChildren=[];

        if(options.treeGrid){
            let expNum = options.ExpNum>0?options.ExpNum:4;
            for(let i=0;i<expNum;i++){
                expBtnChildren.push(this.renderBtn(i+1));
            }

            expBtn =<ButtonGroup children={expBtnChildren}/>;

            if(options.inlineEdit){
                opList.forEach(t=>{
                    opBtnChildren.push(this.renderBtn(t.name,t.icon));
                });

                opBtn = <ButtonGroup children={opBtnChildren}/>;
            }
        }

        let btnGroup=null;
        if(options.inlineEdit) {
            btnGroup = <ButtonGroup children={this.renderBtn('添加','plus-circle-o')}/>
        }

        return (
            <div style={style}>
                {expBtn?expBtn:null}
                {opBtn?opBtn:null}
                {btnGroup?btnGroup:null}
            </div>
        )
    }
}


export default connect(mapStateToProps, mapActionToProps)(JqgridWrapper);

