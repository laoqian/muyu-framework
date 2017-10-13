import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'


let defaultOptions = {
    url: 'api/menu/findPage',
    styleUI: 'Bootstrap',
    datatype: "json",
    mtype: "GET",
    autowidth:true,
    jsonReader: {
        id: 'id', root: "list", page: "pageNum", userdata: "otherData",
        total: "pageCount", records: "totals", subgrid: {root:"list"}
    },
    prmNames: {		// 自定义Ajax请求参数
        page:"pageNum", rows:"pageSize", sort: "orderBy",
        order: "sord", search:"_search", nd:"nd", id:"id",
        oper:"oper",editoper:"edit",addoper:"add",deloper:"del",
        subgridid:"id", npage: null, totalrows:"pageCount"
    },
    colModel: [
        {label: '名称', name: 'name', key: true, width: 200},
        {label: '链接', name: 'href', width: 150},
        {label: '排序', name: 'sort', width: 150,align:'right'},
        {label: 'Freight', name: 'isShow', width: 150},
        {label: 'Ship Name', name: 'updateDate', width: 150}
    ],
    viewrecords: true,
    height: 500,
    rownumbers: true,
    pager: "#jqGridPager",
    shrinkToFit :false,
    beforeRequest:function (data) {
        $('#dataGrid').jqGrid('setGridParam', {pageNum:1,pageSize:20});
    },
    loadComplete:function (data) {

    },
    gridComplete:function(){
        resizeDataGrid();
    },
    loadError:function (data) {
        
    },

};

function resizeDataGrid() {
    let width =$('.my-grid-wrapper').width()-2;
    let height = $('.my-grid-wrapper').height()-59;

    $('#dataGrid').jqGrid('setGridWidth',width);
    $('#dataGrid').jqGrid('setGridHeight',height);

    $('.ui-jqgrid-hdiv').css('width',width);
}

class JqgridWrapper extends Component {
    constructor(){
        super();
    }
    componentDidMount(prevProps, prevState) {
        $("#dataGrid").jqGrid(this.curOptions);
    }

    render() {
        this.curOptions = Object.assign(defaultOptions,this.props.options);

        return (
            <div className='my-grid-wrapper'>
                <table id="dataGrid" ></table>
                <div id="jqGridPager"></div>
            </div>
        )
    }
}


JqgridWrapper.propTypes = {};


function mapStateToProps(state) {
    return {}
}

function mapActionToProps(dispatch) {
    return {}
}

export default connect(mapStateToProps, mapActionToProps)(JqgridWrapper);

