import tab from '../../../redux/actions/tabs'


window.processDiagramShow=id=>{
    tab.add({href:'/act/process/diagram',name:'流程图片',data:{id}});
};

let colModel = [
    {label: '名称', name: 'name'  ,                  width: 150},
    {label: '分类', name: 'category',                width: 150,formatter:'sys_dict',formatoptions:{type:'act_model_type'}},
    {label: '流程标志', name: 'key',                 width: 150,align:'center'},
    {label: '版本号', name: 'version',               width: 150,align:'center'},
    {label: '资源名', name: 'resourceName',          width: 250,align:'center'},
    {label: '流程图片', name: 'diagramResourceName', width: 300,align:'center',formatter:function (value,options,data){
        return  `<a href="javascript:void(0);" onclick="processDiagramShow('${data.id}')" >${value}</a>`;
    }},

    {label: '部署时间', name: 'createDate',         width: 150}
];



export default colModel;