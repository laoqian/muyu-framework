
export default class Client {
    constructor(){
        let baseUrl = location.href;
        baseUrl = baseUrl.replace('http','ws');
        let url = baseUrl+'/muyu-websocket';
        let ws  = new WebSocket(url);
        let $t  = this;
        $t.client = Stomp.over(ws);
        console.log(location);
        $t.client.connect({}, (frame)=>{
            $t.client.subscribe('/user/msg', function(frame){
                console.log(JSON.parse(frame.body));
            });

            $t.client.subscribe('/user/1/message',function(frame){
                console.log(JSON.parse(frame.body));
            });

            $t.client.send('/app/topic/msg',null,JSON.stringify({info:122}))
        },(err)=>{
            console.log('连接服务器失败',err);
        });
    }

    getClient(){
        return this.client;
    }

    close(){
        this.disconnect(()=>console.log('退出连接成功'));
    }
}

