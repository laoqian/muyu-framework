import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import Loading from '../components/loading'
import {jqgrid_action} from '../redux/actions/jqgrid'
import {bindActionCreators} from 'redux'

class JqgridWrapper extends Component {
    constructor(){
        super();
        let __this = this;
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
            sortableColumn:false,
            pager: "#jqGridPager",
            shrinkToFit :false,
            autoGridHeight: true, // 自动表格高度
            autoGridHeightFix: 0,  // 自动表格高度宽度
            autoGridWidth: true,  // 自动表格宽度
            autoGridWidthFix: 0,  // 自动表格修复宽度

            beforeRequest:function (data) {
                $('#dataGrid').jqGrid('setGridParam', {pageNum:1,pageSize:20});

                $('.ui-jqgrid .loading').remove();
                __this.props.load(true);
            },
            loadComplete:function (data) {
                __this.props.load(false);
            },
            gridComplete:function(){
                let wrapper =$('.my-grid-wrapper');
                let width =wrapper.width()-2;
                let height = wrapper.height()-59;
                let dataGrid =$('#dataGrid');

                dataGrid.jqGrid('setGridWidth',width);
                dataGrid.jqGrid('setGridHeight',height);

                $('.ui-jqgrid-hdiv').css('width',width);
            },

            loadError:function (data){

            },

        };
    }
    componentDidMount(prevProps, prevState) {
        this.curOptions = Object.assign(this.defaultOptions,this.props.options);
        this.curOptions.height = $('.my-grid-wrapper').height()-59;

        $("#dataGrid").jqGrid(this.curOptions);
    }

    render() {
        return (
            <div className='my-grid-wrapper'>
                <table id="dataGrid" />
                <div   id="jqGridPager"/>
                {this.props.grid.isLoading? <Loading text={'正在拼命加载中...'}/>:''}
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
        load: bindActionCreators(jqgrid_action, dispatch)
    }
}

export default connect(mapStateToProps, mapActionToProps)(JqgridWrapper);

