

let colModel = [
    {label: '名称', name: 'name'  , width: 200,editable:true,editrules:{required:true}},
    {label: '链接', name: 'href'  , width: 150,editable:true},
    {label: '排序', name: 'sort'  , width: 100,editable:true,align:'center'},
    {label: '显示', name: 'isShow', width: 100,editable:true,align:'center',
        formatter:'sys_dict',formatoptions:{type:'sys_bool'},
        edittype:'sys_dict' ,editoptions:{type:'sys_bool'}
    }
];


export default colModel;