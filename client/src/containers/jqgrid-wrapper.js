import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'


let defaultOptions ={
    url: 'http://trirand.com/blog/phpjqgrid/examples/jsonp/getjsonp.php?callback=?&qwery=longorders',
    styleUI: 'Bootstrap',
    datatype: "jsonp",
    mtype: "GET",
    autowidth:true,
    // jsonReader: {
    //     id: 'id', root: "list", page: "pageNum", userdata: "otherData",
    //     total: "pageCount", records: "totals", subgrid: {root:"list"}
    // },
    colModel: [
        {label: '排序号', name: 'OrderID', key: true, width: 75},
        {label: '商品名称', name: 'CustomerID', width: 150},
        {label: '排序时间', name: 'OrderDate', width: 150},
        {label: 'Freight', name: 'Freight', width: 150},
        {label: 'Ship Name', name: 'ShipName', width: 150}
    ],
    viewrecords: true,
    height: 250,
    rowNum: 20,
    pager: "#jqGridPager",
    shrinkToFit :false,
    beforeRequest:function (data) {

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
    let height = $('.my-grid-wrapper').height()-58;

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

