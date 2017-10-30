import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import Loading from '../../layouts/loading'
import {connect} from 'react-redux'
import {findDOMNode,render} from 'react-dom';
import { Button, Icon } from 'antd';
const ButtonGroup = Button.Group;
import _ from 'lodash'

class JqgridWrapper extends Component {
    constructor() {
        super();
        let __this = this;

        this.state = {
            loading: false
        };

        this.state.defaultOptions = {
            url: 'api/menu/findPage',
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
            sortname: 'id',
            viewrecords: true,
            lazyLoad: false,
            rownumbers: true,
            sortableColumn: false,
            shrinkToFit: false,
            autoGridHeight: true, // 自动表格高度
            autoGridHeightFix: 0,  // 自动表格高度宽度
            autoGridWidth: true,  // 自动表格宽度
            autoGridWidthFix: 0,  // 自动表格修复宽度

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
                __this.setState({loading: true});

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
                __this.setState({loading: false});
            },
            gridComplete: function () {
                let wrapper = findDOMNode(__this.refs.gridWrapper);
                wrapper = $(wrapper);
                let grid = __this.state.gridTable;

                let width = wrapper.width();
                let toobar = wrapper.find('.ui-userdata-top');
                let header = wrapper.find('.ui-jqgrid-pager');
                let pager = wrapper.find('.ui-jqgrid-hdiv');
                let height = wrapper.height() - toobar.height() - header.height()-pager.height();

                grid.jqGrid('setGridWidth', width+2);
                grid.jqGrid('setGridHeight', height);
                toobar.width(width);
                header.width(width);
                pager.width(width);
            },

            loadError: function (data) {

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

        /*默认设置为不可排序*/
        let id =false;
        colModel.forEach(item=>{
            item.name==='id'?id=true:null;
            !item.sortable ? item.sortable = false : null;
        });

        !id?colModel.push({name:'id',hidden:true}):null;

        this.state.curOptions.talbleId =  this.state.curOptions.gridName + 'Table';
        this.state.curOptions.pager = '#' + this.state.curOptions.gridName + 'pager';
        this.state.curOptions.topToobar = '#' + 't_'+this.state.curOptions.talbleId;
    }

    componentDidMount(prevProps, prevState) {
        let gridTable = findDOMNode(this.refs.gridTable);

        this.state.gridTable = $(gridTable);
        let grid =this.state.gridTable.jqGrid(this.state.curOptions);

        let edit = true;
        if(this.state.curOptions.treeGrid || edit){
            let props = {options:this.state.curOptions,grid,edit};
            render(<GridToolBar {...props} />,document.getElementById('t_'+this.state.curOptions.talbleId));
        }
    }

    render() {
        let pager = this.state.curOptions.pager.substr(1);
        let {talbleId} = this.state.curOptions;

        return (
            <div className='my-grid-wrapper' ref="gridWrapper">
                <table ref="gridTable" id={talbleId}/>
                <div id={pager}/>
                {this.state.loading ? <Loading text={'正在拼命加载中...'}/> : null}
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

        this.expand = (level)=>{
            let {grid} = this.props;
            let list  = grid.getRowData(null,true);
            list.forEach(row=>{
                if(!row.leaf){
                    if(row.level>=level){
                        if(row.expanded ){
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
            let {grid} = this.props;
            grid.trigger('reloadGrid');
        };


        this.eventFunc['添加'] = ()=>{
            console.log('添加');
        };


        this.click = key=>{
            if(_.isNumber(key)){
                this.expand(key);
            }else if(_.isFunction(this.eventFunc[key])){
                this.eventFunc[key](key);
            }else{
                console.error('Waring:grid操作事件未定义：'+key);
            }
        }

        this.renderBtn = key=><Button onClick={()=>this.click(key)} >{key}</Button>;
    }


    render(){
        let style={'marginLeft':'10px'};
        let {options,edit} = this.props;
        let opList =['升级','降级','上移','下移'];
        let expBtn=null,expBtnChildren=[],opBtn=null,opBtnChildren=[];

        if(options.treeGrid){

            if(edit){
                let expNum = options.expNum>0?options.expNum:4;
                for(let i=0;i<expNum;i++){
                    expBtnChildren.push(this.renderBtn(i+1));
                }

                expBtn =<ButtonGroup children={expBtnChildren}/>;
            }

            for(let i=0;i<opList.length;i++){
                opBtnChildren.push(this.renderBtn(opList[i]));
            }

            opBtn = <ButtonGroup children={opBtnChildren}/>;
        }

        let btnGroup=null;
        if(edit) {
            btnGroup = <ButtonGroup children={this.renderBtn('添加')}/>
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

