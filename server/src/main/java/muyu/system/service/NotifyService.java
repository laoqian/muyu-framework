package muyu.system.service;

import muyu.system.common.beans.ResultBean;
import muyu.system.common.service.CrudService;
import muyu.system.dao.NotifyDao;
import muyu.system.entity.Notify;
import muyu.system.utils.MessageUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * 千山鸟飞绝，万径人踪灭。
 * 孤舟蓑笠翁，独钓寒江雪。
 *
 * @author: 于其先
 * @date: 2018/1/11
 * @version: 1.0.0
 */
@Service
@Transactional
public class NotifyService  extends CrudService<NotifyDao,Notify> {
    public ResultBean browseVolumeIncrease(Notify notify){
        dao.browseVolumeIncrease(notify);
        return new ResultBean("成功",true);
    }


    @Override
    public ResultBean<Notify> save(Notify notify) {
        if("4".equals(notify.getType())) {
            MessageUtils.addMsg(notify.getContent());
        }

        return super.save(notify);
    }
}
