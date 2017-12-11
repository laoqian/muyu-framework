package muyu.system.utils;


import muyu.system.common.service.SequenceService;
import org.activiti.engine.impl.cfg.IdGenerator;

/**
 * 千山鸟飞绝，万径人踪灭。
 * 孤舟蓑笠翁，独钓寒江雪。
 *
 * @author: 于其先
 * @date: 2017年9月21日
 * @version: 1.0.0
 */

public class IdUtils implements IdGenerator{


    public static String genId(){
        SequenceService service = ContextUtils.getBean(SequenceService.class);
        return service.getNextVal(null);
    }

    @Override
    public String getNextId() {
        return genId();
    }
}
