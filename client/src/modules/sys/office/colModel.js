

let colModel = [
    {label: '名称',       name: 'name'  , width: 200,editable:true,editrules:{required:true}},
    {label: '归属地', name: 'area.name'  , width: 150,editable:true,editrules:{required:true},
        formatter:'sys_dict',formatoptions:{type:'sys_office_type'}, edittype:'treeselect',editoptions:{type:'sys_office_type'}
    },
    {label: '编码', name: 'code'  , width: 100,editable:true,align:'center',editrules:{required:true}},
    {label: '类型', name: 'type'  , width: 100,editable:true,align:'center',editrules:{required:true},
        formatter:'sys_dict',formatoptions:{type:'sys_office_type'}, edittype:'sys_dict' ,editoptions:{type:'sys_office_type'}
    },
    {label: '级别', name: 'grade'  , width: 100,editable:true,align:'center',editrules:{required:true},
        formatter:'sys_dict',formatoptions:{type:'sys_office_grade'}, edittype:'sys_dict' ,editoptions:{type:'sys_office_grade'}
    },
    {label: '地址', name: 'address'  , width: 100,editable:true,align:'center',editrules:{required:true}},
    {label: '邮政编码',   name: 'zipCode', width: 100,editable:true,align:'center'},
    {label: '负责人', name: 'master', width: 100,editable:true,align:'center'},
    {label: '电话', name: 'phone', width: 100,editable:true,align:'center',editrules:{required:true}},
    {label: '传真', name: 'fax', width: 100,editable:true,align:'center'},
    {label: '邮箱', name: 'email', width: 100,editable:true,align:'center',editrules:{required:true}},
    {label: '是否可用', name: 'useable', width: 100,editable:true,align:'center',editrules:{required:true},
        formatter:'sys_dict',formatoptions:{type:'sys_bool'}, edittype:'sys_dict' ,editoptions:{type:'sys_bool'}
    },
    {label: '主负责人', name: 'primaryPerson', width: 100,editable:true,align:'center'},
    {label: '副负责人', name: 'deputyPerson', width: 100,editable:true,align:'center'}
];


export default colModel;