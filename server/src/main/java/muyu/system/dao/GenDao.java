package muyu.system.dao;

import muyu.system.common.persistence.CrudDao;
import muyu.system.entity.Table;

import java.util.List;
import java.util.Map;
import java.util.Set;


/**
 * 千山鸟飞绝，万径人踪灭。
 * 孤舟蓑笠翁，独钓寒江雪。
 *
 * @author: 于其先
 * @date: 2017/9/15
 * @version: 1.0.0
 */
public interface GenDao extends CrudDao<Table>{

    Set getTableList();

    List<Map> getTableColumn(String tableName);
}
