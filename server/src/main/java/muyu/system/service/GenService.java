package muyu.system.service;

import muyu.system.common.beans.ResultBean;
import muyu.system.common.beans.SubmitBatchBean;
import muyu.system.common.service.CrudService;
import muyu.system.dao.GenDao;
import muyu.system.entity.Table;
import muyu.system.entity.TableColumn;
import muyu.system.entity.Menu;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;

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
public class GenService extends CrudService<GenDao,Table>{

    public ResultBean<Set> getTableList(){
        return new ResultBean<>(dao.getTableList());
    }

    public ResultBean<List> getTableColumn(String tableName){
        return new ResultBean<>(dao.getTableColumn(tableName));
    }

    public ResultBean<Menu> saveBatch(SubmitBatchBean<Table,TableColumn> batchBean){
        List<TableColumn> list = batchBean.getList();
//        list.forEach(super::save);
        return  new ResultBean<>("保存菜单成功",true);
    }
}
