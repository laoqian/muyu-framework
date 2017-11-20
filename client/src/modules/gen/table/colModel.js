let colModel = [
    {label: '表名', name: 'name', width: 200, editable: true,edittype:'select',editrules:{required:true}},
    {label: '说明', name: 'comments', width: 300, editable: true},
    {label: '类名', name: 'className',  width: 150, editable: true,editrules:{required:true}},
    {label: '包名', name: 'packageName',  width: 150, editable: true,editrules:{required:true}},
    {label: '类型', name: 'type',  width: 150, editable: true, align:'center',
        formatter:'sys_dict',formatoptions:{type:'gen_type'},
        edittype:'sys_dict' ,editoptions:{type:'gen_type'},editrules:{required:true}},
    {label: '编辑类型', name: 'editType',  width: 150, editable: true, align:'center',
        formatter:'sys_dict',formatoptions:{type:'gen_edit_type'},
        edittype:'sys_dict' ,editoptions:{type:'gen_edit_type'},editrules:{required:true}},
    {label: '生成类型', name: 'genType',  width: 150, editable: true, align:'center',
        formatter:'sys_dict',formatoptions:{type:'gen_gen_type'},
        edittype:'sys_dict' ,editoptions:{type:'gen_gen_type'},editrules:{required:true}},
    ];

colModel[0].editoptions = {};
colModel[0].editoptions.change = function(data){
    this.getGrid().setGridParam({postData: {tableName:data.value}});
    this.getGrid().trigger('reloadGrid');
};



export  default colModel;