import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import Loading from './loading'
import {connect} from 'react-redux'
import {findDOMNode} from 'react-dom';

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
            rowNum: 30,
            rowList: [25, 50, 100, 200],

            beforeRequest: function () {
                let grid = __this.state.gridTable;
                let {setQueryParam} = __this.state.curOptions;

                setQueryParam ? setQueryParam() : null;
                $('.ui-jqgrid .loading', grid).remove();
                __this.setState({loading: true});
            },
            loadComplete: function () {
                __this.setState({loading: false});
            },
            gridComplete: function () {
                let wrapper = findDOMNode(__this.refs.gridWrapper);
                wrapper = $(wrapper);

                let width = wrapper.width() - 2;
                let height = wrapper.height() - 59;
                let grid = __this.state.gridTable;

                grid.jqGrid('setGridWidth', width);
                grid.jqGrid('setGridHeight', height);

                $('.ui-jqgrid-hdiv', grid).css('width', width);
            },

            loadError: function (data) {

            },
        };
    }

    componentWillMount() {
        this.state.curOptions = Object.assign(this.state.defaultOptions, this.props.options);
        let {colModel} = this.state.curOptions;
        
        /*默认设置为不可排序*/
        colModel.forEach(item=>{
            !item.sortable ? item.sortable = false : null;
        });

        this.state.curOptions.height = $('.my-grid-wrapper').height() - 59;
        this.state.curOptions.pager = '#' + this.state.curOptions.gridName + 'pager';
    }

    componentDidMount(prevProps, prevState) {
        let gridTable = findDOMNode(this.refs.gridTable);

        this.state.gridTable = $(gridTable);
        this.state.gridTable.jqGrid(this.state.curOptions);
    }

    render() {
        let pager = this.state.curOptions.pager.substr(1);
        let talbleId = this.state.curOptions.gridName + 'Table';

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

export default connect(mapStateToProps, mapActionToProps)(JqgridWrapper);

