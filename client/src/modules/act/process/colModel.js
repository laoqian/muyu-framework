

let colModel = [
    {label: '名称', name: 'name'  , width: 150,editable:true,editrules:{required:true}},
    {label: '分类', name: 'category', width: 150,editable:true,editrules:{required:true}},
    {label: '版本号', name: 'version', width: 150},
    {label: '资源名', name: 'resoureName', width: 150},
    {label: '报表资源名', name: 'diagramResourceName', width: 150},
    {label: '创建时间', name: 'createTime', width: 150},
    {label: '最后更新时间', name: 'lastUpdateTime', width: 150},
    {label: '描述', name: 'metaInfo', width: 200,editable:true,editrules:{required:true}},
];

export default colModel;