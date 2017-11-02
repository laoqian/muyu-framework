package muyu.system.service;

import muyu.system.common.beans.ResultBean;
import muyu.system.common.service.BaseService;
import muyu.system.common.utils.CacheUtils;
import muyu.system.dao.DictDao;
import muyu.system.dao.GenDao;
import muyu.system.entity.Config;
import muyu.system.entity.Dict;
import muyu.system.entity.TableColumn;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


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


    public ResultBean<Config> getConfig(){
        Config config;

        config = CacheUtils.getGlobalCache("sysConfig",Config.class);
        if(config!=null){
            config  = new Config();
            config.setDicts(dictDao.findList(new Dict()));

            TableColumn tableColumn = new TableColumn();
            tableColumn.setQueryBy("table_name in (select table_name from user_tables)");

            config.setTableColumns(genDao.findTableColumn(tableColumn));
            CacheUtils.putGlobalCache("sysConfig",config);
        }

        return new ResultBean<>(config);

    }
}
