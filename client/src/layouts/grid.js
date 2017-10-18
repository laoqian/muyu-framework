import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import Loading from '../components/loading'
import {connect} from 'react-redux'
import {findDOMNode} from 'react-dom';

class JqgridWrapper extends Component {
    constructor(){
        super();
        let __this = this;

        this.state ={
             loading:false
        };

        this.defaultOptions = {
            url: 'api/menu/findPage',
            styleUI: 'Bootstrap',
            datatype: "json",
            mtype: "GET",
            autowidth:true,
            jsonReader: {
                id: 'id', root: "list", page: "pageNum", userdata: "otherData",
                total: "pageCount", records: "totals", subgrid: {root:"list"}
            },
            prmNames: {
                page:"pageNum", rows:"pageSize", sort: "orderBy",
                order: "sord", search:"_search", nd:"nd", id:"id",
                oper:"oper",editoper:"edit",addoper:"add",deloper:"del",
                subgridid:"id", npage: null, totalrows:"pageCount"
            },
            colModel: [
                {label: '名称', name: 'name', width: 200},
                {label: '链接', name: 'href', width: 150},
                {label: '排序', name: 'sort', width: 150,align:'right'},
                {label: 'Freight', name: 'isShow', width: 150},
                {label: 'Ship Name', name: 'updateDate', width: 150}
            ],

            dataId: 'id', 	// 指定数据主键
            viewrecords: true,
            height: 500,
            lazyLoad: false,
            rownumbers: true,
            pager: '#'+parseInt((Math.random()*1000000000)).toString(),
            sortableColumn:false,
            shrinkToFit :false,
            autoGridHeight: true, // 自动表格高度
            autoGridHeightFix: 0,  // 自动表格高度宽度
            autoGridWidth: true,  // 自动表格宽度
            autoGridWidthFix: 0,  // 自动表格修复宽度

            beforeRequest:function (data) {
                let grid = __this.gridTable;
                grid.jqGrid('setGridParam', {pageNum:1,pageSize:20});
                $('.ui-jqgrid .loading',grid).remove();

                __this.setState({loading:true});
            },
            loadComplete:function (data) {
                __this.setState({loading:false});
            },
            gridComplete:function(){
                let wrapper = findDOMNode(__this.refs.gridWrapper);
                wrapper = $(wrapper);

                let width =wrapper.width()-2;
                let height = wrapper.height()-59;
                let grid = __this.gridTable;

                grid.jqGrid('setGridWidth',width);
                grid.jqGrid('setGridHeight',height);

                $('.ui-jqgrid-hdiv',grid).css('width',width);
            },

            loadError:function (data){

            },

        };
    }

    componentDidUpdate(){
        let {gridName} = this.props.grid;
        if(this.curOptions.gridName === gridName){
            this.gridTable.trigger('reloadGrid');
        }
    }

    componentDidMount(prevProps, prevState) {
        let gridTable = findDOMNode(this.refs.gridTable);

        this.curOptions = Object.assign(this.defaultOptions,this.props.options);
        this.curOptions.height = $('.my-grid-wrapper').height()-59;
        this.gridTable = $(gridTable);
        this.gridTable.jqGrid(this.curOptions);
    }

    render() {
        let pager = this.defaultOptions.pager.substr(1);

        return (
            <div className='my-grid-wrapper' ref="gridWrapper">
                <table ref="gridTable"/>
                <div  id={pager}/>
                {this.state.loading ?<Loading text={'正在拼命加载中...'}/>:null}
            </div>
        )
    }
}


JqgridWrapper.propTypes = {};


function mapStateToProps(state) {
    return {
        grid:state.grid
    }
}

function mapActionToProps(dispatch) {
    return {

    }
}

export default connect(mapStateToProps, mapActionToProps)(JqgridWrapper);

