

let colModel = [
    {label: '标题', name: 'title', width: 300,editable:true,editrules:{required:true}},
    {label: '类型', name: 'type', width: 150,editable:true,align:'center',
        formatter:'sys_dict',formatoptions:{type:'sys_notify_type'},
        edittype:'sys_dict' ,editoptions:{type:'sys_notify_type'},editrules:{required:true}
    },
    {label: '浏览量', name: 'browseVolume', width: 80,align:'right'},
    {label: '状态', name: 'status', width: 60},
    {label: '创建人', name: 'createBy.name', width: 100,align:'center'},
    {label: '创建时间', name: 'createDate', width: 150},
    {label: '创建人', name: 'updateBy.name', width: 100,align:'center'},
    {label: '更新人', name: 'updateDate', width: 150}
];

export default colModel;