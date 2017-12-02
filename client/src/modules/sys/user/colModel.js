

let colModel = [
    {label: '公司', name: 'company'  , width: 150,editable:true,editrules:{required:true},
        formatter:'treeselect',formatoptions:{type:'sys_office_type'}, edittype:'treeselect',editoptions:{url:'/office/findTreeNode'}
    },
    {label: '部门', name: 'office'  , width: 150,editable:true,editrules:{required:true},
        formatter:'treeselect',formatoptions:{type:'sys_office_type'}, edittype:'treeselect',editoptions:{url:'/office/findTreeNode'}
    },
    {label: '登录名', name: 'loginName', width: 150,editable:true,editrules:{required:true}},
    {label: '密码', name: 'password', width: 150,editable:true,editrules:{required:true},hidden:true},
    {label: '重复密码', name: 'passWord1', width: 150,editable:true,editrules:{required:true},hidden:true},
    {label: '工号', name: 'no', width: 150,editable:true,editrules:{required:true}},
    {label: '姓名', name: 'name', width: 150,editable:true,editrules:{required:true}},
    {label: '邮箱', name: 'email', width: 150,editable:true,editrules:{required:true}},
    {label: '电话', name: 'phone', width: 150,editable:true,editrules:{required:true}},
    {label: '手机', name: 'mobile', width: 150,editable:true,editrules:{required:true}},
    {label: '类型', name: 'userType', width: 150,
        formatter:'sys_dict',formatoptions:{type:'sys_user_type'},
        editable:true,editrules:{required:true},edittype:'sys_dict' ,editoptions:{type:'sys_user_type'}
    },
    {label: '最后登录IP', name: 'loginIp', width: 150},
    {label: '最后登录日期', name: 'loginDate', width: 150},
    {label: '允许登录', name: 'loginFlag', width: 150}
];

export default colModel;