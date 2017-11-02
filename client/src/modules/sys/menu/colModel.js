


let colModel = [
    {label: '名称', name: 'name'  , width: 200,editable:true,editrules:{required:true}},
    {label: '链接', name: 'href'  , width: 150,editable:true},
    {label: '排序', name: 'sort'  , width: 100,editable:true,align:'center'},
    {label: '显示', name: 'isShow', width: 100,editable:true,align:'center'}
];

colModel.push({label:'名称', name:'name', width: 200,editable:true,editrules:{required:true}});

export default colModel;