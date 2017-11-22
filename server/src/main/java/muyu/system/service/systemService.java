package muyu.system.service;

import muyu.system.common.beans.ResultBean;
import muyu.system.common.service.BaseService;
import muyu.system.common.tree.TreeNode;
import muyu.system.dao.DictDao;
import muyu.system.dao.GenDao;
import muyu.system.dao.MenuDao;
import muyu.system.entity.Config;
import muyu.system.entity.Dict;
import muyu.system.entity.TableColumn;
import muyu.system.utils.CacheUtils;
import muyu.system.utils.IdentifyCodeUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.Map;


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
    MenuDao menuDao;

    @Autowired
    GenDao genDao;

    public ResultBean<Config> getConfig(){
        Config config=  new Config();
        String rootId = "0";

        config.setDicts(dictDao.findList(new Dict()));
        config.setTableColumns(genDao.findTableColumn(new TableColumn()));
        config.setMenuList(rootId,menuDao.findTree(rootId));

        return new ResultBean<>(config);
    }

    /**
     * 获取验证码
     * @return
     */
    public ResultBean getCachedCode(HttpServletRequest request) throws IOException {
        Map varify = IdentifyCodeUtils.getCode(true);
        CacheUtils.set(request.getRemoteAddr(),"code",varify.get("code"));
        return new ResultBean(varify.get("image"));
    }
}
