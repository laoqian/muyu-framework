package muyu.system.websocket;

import muyu.system.web.BaseController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * 千山鸟飞绝，万径人踪灭。
 * 孤舟蓑笠翁，独钓寒江雪。
 *
 * @author: 于其先
 * @date: 2018/1/9
 * @version: 1.0.0
 */
@RestController
public class WebSocketController extends BaseController {
    @Autowired
    private SimpMessageSendingOperations simpMessageSendingOperations;

    /**
     *
     */
    @MessageMapping("/topic")
    @SendTo("/topic")
    public SocketMessage msg(String msg) {
        return new SocketMessage("I am a msg from Topic.");
    }



    /**
     * 测试对指定用户发送消息方法
     * @return
     */
    @RequestMapping(path = "/send", method = RequestMethod.GET)
    public SocketMessage send() {
        simpMessageSendingOperations.convertAndSendToUser("1", "/message", new SocketMessage("I am a msg from SubscribeMapping('/macro')."));
        return new SocketMessage("I am a msg from SubscribeMapping('/macro').");
    }
}
