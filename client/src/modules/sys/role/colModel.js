let colModel = [
    {label: '名称', name: 'name', width: 200, editable: true, editrules: {required: true}},
    {label: '英文名', name: 'ename', width: 150, editable: true},
    {label: '公司', name: 'company'  , width: 150,editable:true,editrules:{required:true},
        formatter:'treeselect',formatoptions:{type:'sys_office_type'}, edittype:'treeselect',editoptions:{url:'/office/findTreeNode'}
    },
    {label: '部门', name: 'office'  , width: 150,editable:true,editrules:{required:true},
        formatter:'treeselect',formatoptions:{type:'sys_office_type'}, edittype:'treeselect',editoptions:{url:'/office/findTreeNode'}
    },
    {label: '类型', name: '类型', width: 100, editable: true, align: 'center'}
];


export default colModel;