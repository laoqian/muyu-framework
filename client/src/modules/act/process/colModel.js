

let colModel = [
    {label: '名称', name: 'name'  , width: 150,editable:true,editrules:{required:true}},
    {label: '分类', name: 'category', width: 150,editable:true,editrules:{required:true}},
    {label: '版本号', name: 'version', width: 150,align:'center'},
    {label: '资源名', name: 'resourceName', width: 150,align:'center'},
    {label: '报表资源名', name: 'diagramResourceName', width: 150,align:'center'},
    {label: '发布时间', name: 'createDate', width: 150}
];

export default colModel;