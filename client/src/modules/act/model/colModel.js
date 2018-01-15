

let colModel = [
    {label: '名称', name: 'name'  , width: 150,editable:true,editrules:{required:true}},
    {label: '标识', name: 'key'  , width: 150,editable:true,editrules:{required:true}},
    {label: '分类', name: 'category', width: 150,editable:true,editrules:{required:true},
        formatter:'sys_dict',formatoptions:{type:'act_model_type'},
        edittype:'sys_dict' ,editoptions:{type:'act_model_type'}
    },
    {label: '描述', name: 'description'  , width: 150,editable:true,editrules:{required:true},hidden:true},
    {label: '版本号', name: 'version', width: 150,align:'center'},
    {label: '创建时间', name: 'createTime', width: 250,align:'right'},
    {label: '最后更新时间', name: 'lastUpdateTime', width: 250,align:'right'}
];

export default colModel;