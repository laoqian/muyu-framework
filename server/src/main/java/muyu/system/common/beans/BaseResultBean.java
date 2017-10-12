package muyu.system.common.beans;

import lombok.Data;

import java.io.Serializable;

/**
 * 千山鸟飞绝，万径人踪灭。
 * 孤舟蓑笠翁，独钓寒江雪。
 *
 * @author: 于其先
 * @date: 2017/9/19
 * @version: 1.0.0
 */

@Data
public class BaseResultBean implements Serializable {

    private static final long serialVersionUID = 1L;

    public static final int NO_LOGIN = -1;

    public static final int SUCCESS = 0;

    public static final int FAIL = 1;

    public static final int NO_PERMISSION = 2;

    private String msg = "success";

    private int code = SUCCESS;

    private long useTime=0;


    public BaseResultBean() {
        super();
    }


    public BaseResultBean(Throwable e) {
        super();
        this.msg = e.toString();
        this.code = FAIL;
    }
}