

let colModel = [
    {label: '公司', name: 'company.id', width: 200,editable:true,editrules:{required:true}},
    {label: '部门', name: 'office.id', width: 150,editable:true,editrules:{required:true}},
    {label: '登录名', name: 'userName', width: 150,editable:true,editrules:{required:true}},
    {label: '工号', name: 'no', width: 150,editable:true,editrules:{required:true}},
    {label: '姓名', name: 'name', width: 150,editable:true,editrules:{required:true}},
    {label: '邮箱', name: 'email', width: 150,editable:true,editrules:{required:true}},
    {label: '电话', name: 'phone', width: 150,editable:true,editrules:{required:true}},
    {label: '手机', name: 'mobile', width: 150,editable:true,editrules:{required:true}},
    {label: '类型', name: 'type', width: 150,
        formatter:'sys_dict',formatoptions:{type:'sys_user_type'},
        editable:true,editrules:{required:true},edittype:'sys_dict' ,editoptions:{type:'sys_user_type'}
    },
    {label: '最后登录IP', name: 'loginIp', width: 150},
    {label: '最后登录日期', name: 'loginDate', width: 150},
    {label: '允许登录', name: 'loginFlag', width: 150}
];

export default colModel;