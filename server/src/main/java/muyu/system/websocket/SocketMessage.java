package muyu.system.websocket;

import lombok.Data;

/**
 * 千山鸟飞绝，万径人踪灭。
 * 孤舟蓑笠翁，独钓寒江雪。
 *
 * @author: 于其先
 * @date: 2018/1/9
 * @version: 1.0.0
 */

@Data
public class SocketMessage {

    public String message;
    public String date;

    public SocketMessage(String msg){
        this.message = msg;
    }
}
