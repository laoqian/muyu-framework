package muyu.system.utils;

import lombok.Data;
import org.springframework.messaging.simp.SimpMessageSendingOperations;

import java.util.ArrayList;
import java.util.List;


@Data
class Message{
    String msg;
    int count;

    Message(String msg){
        this.msg = msg;
    }

    public int increase(){
       return ++this.count;
    }
}

public class MessageUtils {
    private static long second = 0;
    private static final int MSG_INTERVAL_SECOND = 3;
    private static final int MSG_SEND_MAX = 3;
    private static final SimpMessageSendingOperations SMSP = ContextUtils.getBean(SimpMessageSendingOperations.class);
    private static final List<Message> MSG_LIST = new ArrayList<>();

    public static void addMsg(String msg){
            MSG_LIST.add(new Message(msg));
    }

    public static void instantMessageLoop(){
        if(second++%MSG_INTERVAL_SECOND!=0){
            return;
        }

        for(int i=0;i<MSG_LIST.size();i++){
            Message message = MSG_LIST.get(i);
            SMSP.convertAndSend("/topic/instantMessage",message.getMsg());
            if(message.increase()>=MSG_SEND_MAX){
                MSG_LIST.remove(i--);
            }
        }
    }

}
