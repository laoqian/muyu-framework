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
    private static final SimpMessageSendingOperations smsp = ContextUtils.getBean(SimpMessageSendingOperations.class);
    private static final List<Message> MsgList = new ArrayList<>();

    public static void addMsg(String msg){
            MsgList.add(new Message(msg));
    }

    public static void instantMessageLoop(){
        if(second++%MSG_INTERVAL_SECOND!=0){
            return;
        }

        for(int i=0;i<MsgList.size();i++){
            Message message = MsgList.get(i);
            smsp.convertAndSend("/topic/instantMessage",message.getMsg());
            if(message.increase()>=MSG_SEND_MAX){
                MsgList.remove(i--);
            }
        }
    }

}
