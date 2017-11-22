package muyu.system.service;

import muyu.system.common.beans.ResultBean;
import muyu.system.common.beans.SubmitBatchBean;
import muyu.system.common.service.CrudService;
import muyu.system.dao.RoleDao;
import muyu.system.entity.Role;
import muyu.system.entity.RoleMenu;
import muyu.system.utils.IdUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * 千山鸟飞绝，万径人踪灭。
 * 孤舟蓑笠翁，独钓寒江雪。
 *
 * @author: 于其先
 * @date: 2017/9/15
 * @version: 1.0.0
 */

@Service
@Transactional
public class RoleService extends CrudService<RoleDao,Role>{

    public ResultBean<List> findRoleMenuList(RoleMenu roleMenu) {
        ResultBean<List> bean = new ResultBean<>();
        bean.setData(dao.findRoleMenuList(roleMenu));
        return bean;
    }

    public ResultBean<Role> saveRoleMenuBatch(SubmitBatchBean<Role,String> batchBean) {
        Role role = batchBean.getData();
        dao.deleteRoleMenu(role.getId());

        batchBean.getList().forEach(menuId->dao.insertRoleMenu(new RoleMenu(IdUtils.genId(),role.getId(),menuId)));
        return new ResultBean(batchBean.getData());
    }
}
