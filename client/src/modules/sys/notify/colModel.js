

let colModel = [
    {label: '标题', name: 'title', width: 150,editable:true,editrules:{required:true}},
    {label: '类型', name: 'type', width: 150,editable:true,align:'center',
        formatter:'sys_dict',formatoptions:{type:'sys_notify_type'},
        edittype:'sys_dict' ,editoptions:{type:'sys_notify_type'},editrules:{required:true}
    },
    {label: '状态', name: 'status', width: 150},
    {label: '创建时间', name: 'createDate', width: 150},
    {label: '创建人', name: 'createBy.name', width: 150}
];

export default colModel;