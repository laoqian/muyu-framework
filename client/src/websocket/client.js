
export default class Client {
    constructor(){
        let ws  = new WebSocket("ws://localhost:9999/muyu-websocket");
        let $t  = this;
        $t.client = Stomp.over(ws);
        $t.client.connect({}, function(frame) {
            $t.client.subscribe('/topic', function(frame){
                console.log(JSON.parse(frame.body));
            });

            $t.client.subscribe('/user/1/message',function(frame){
                console.log(JSON.parse(frame.body));
            });
            $t.client.send('/topic',null,JSON.stringify({msg:122}));
        });
    }
}

