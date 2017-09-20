let config = {
    server_ip: 'localhost',
    server_port: 9999,
    notice_height:20,
    header_height:60,
    left_height:100,
    footer_height:24
};

/*后端服务器地址*/
config.base_url = 'http://' + config.server_ip + ':' + config.server_port;


/*header栏右侧菜单列表*/
config.header_menu =[
    {name:'系统首页',url:'',icon:'glyphicon glyphicon-home'},
    {name:'个人信息',url:'',icon:'glyphicon glyphicon-file'},
    {name:'我的通知',url:'',icon:'glyphicon glyphicon-refresh'},
    {name:'退出登录',url:'',icon:'glyphicon glyphicon-remove'}
];

export default config;