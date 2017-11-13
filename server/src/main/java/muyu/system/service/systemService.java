package muyu.system.service;

import muyu.system.common.beans.ResultBean;
import muyu.system.common.service.BaseService;
import muyu.system.dao.DictDao;
import muyu.system.dao.GenDao;
import muyu.system.entity.Config;
import muyu.system.entity.Dict;
import muyu.system.entity.TableColumn;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpSession;


/**
 * 千山鸟飞绝，万径人踪灭。
 * 孤舟蓑笠翁，独钓寒江雪。
 *
 * @author: 于其先
 * @date: 2017/10/20
 * @version: 1.0.0
 */

@Service
@Transactional
public class SystemService extends BaseService{

    @Autowired
    DictDao dictDao;

    @Autowired
    GenDao genDao;

    @Autowired
    HttpSession session;

    public ResultBean<Config> getConfig(){
        Config config=  new Config();
                config.setDicts(dictDao.findList(new Dict()));
                config.setTableColumns(genDao.findTableColumn(new TableColumn()));

        return new ResultBean<>(config);
    }
}
