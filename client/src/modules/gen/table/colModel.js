

let colModel =
[
    {label: '表名', name: 'tableName',hidden:true},
    {label: '列名', name: 'name', width: 100},
    {label: '说明', name: 'comments', width: 100, editable: true},
    {label: '物理类型', name: 'jdbcType', width: 100},
    {label: '长度', name: 'length'  , width: 100,  align: 'right'},
    {label: 'Java类型', name: 'javaType', width: 160, editable: true},
    {label: 'Java属性名称', name: 'javaFiled', width: 100, editable: true},
    {label: '可空', name: 'isEmpty', width: 60,editable: true, align:'center',formatter:'sys_dict',formatoptions:{type:'sys_bool'},edittype:'sys_dict' ,editoptions:{type:'sys_bool'}},
    {label: '查询', name: 'isQuery', width: 60, editable: true, align: 'center',formatter:'sys_dict',formatoptions:{type:'sys_bool'},edittype:'sys_dict' ,editoptions:{type:'sys_bool'}},
    {label: '查询匹配方式', name: 'queryType', width: 100, editable: true, align: 'center'},
    {label: '显示表单类型', name: 'showType', width: 100, editable: true, align: 'center'},
    {label: '字典类型', name: 'dictType', width: 100, editable: true, align: 'center'},
    {label: '排序', name: 'sort', width: 100, editable: true, align: 'center'},
];

export default colModel;