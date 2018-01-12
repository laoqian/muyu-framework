package muyu.system.websocket;

import com.fasterxml.jackson.databind.ObjectMapper;
import muyu.system.common.beans.ResultBean;
import muyu.system.utils.MessageUtils;
import muyu.system.utils.UserUtils;
import muyu.system.web.BaseController;
import org.apache.commons.lang3.time.DateFormatUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.socket.config.WebSocketMessageBrokerStats;

import java.io.IOException;
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



    @MessageMapping("/topic/msg")
    @SendTo("/user/msg")
    public SocketMessage msg(String json) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        SocketMessage msg  = mapper.readValue(json,SocketMessage.class);
        return new SocketMessage("I am a msg from User."+msg.getInfo());
    }

    @Scheduled(fixedRate = 1000)
    public void loopEvent(){
        SocketMessage msg  = new SocketMessage();
        msg.setDate(DateFormatUtils.format(new Date(),"yyyy-MM-DD HH:mm:ss"));
        simpMessageSendingOperations.convertAndSend( "/topic/syncTime",msg);
        MessageUtils.instantMessageLoop();
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
