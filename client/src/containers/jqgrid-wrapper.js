import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'


let defaultOptions ={
    url: 'http://trirand.com/blog/phpjqgrid/examples/jsonp/getjsonp.php?callback=?&qwery=longorders',
    mtype: "GET",
    styleUI: 'Bootstrap',
    datatype: "jsonp",
    colModel: [
        {label: 'OrderID', name: 'OrderID', key: true, width: 75},
        {label: 'Customer ID', name: 'CustomerID', width: 150},
        {label: 'Order Date', name: 'OrderDate', width: 150},
        {label: 'Freight', name: 'Freight', width: 150},
        {label: 'Ship Name', name: 'ShipName', width: 150}
    ],
    viewrecords: true,
    height: 250,
    rowNum: 20,
    pager: "#jqGridPager",

};

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

