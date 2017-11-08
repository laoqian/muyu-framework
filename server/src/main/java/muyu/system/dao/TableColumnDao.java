package muyu.system.dao;

import muyu.system.common.persistence.CrudDao;
import muyu.system.entity.TableColumn;

/**
 * 千山鸟飞绝，万径人踪灭。
 * 孤舟蓑笠翁，独钓寒江雪。
 *
 * @author: 于其先
 * @date: 2017/9/15
 * @version: 1.0.0
 */
public interface TableColumnDao extends CrudDao<TableColumn>{
    void deleteByQuery(TableColumn tableColumn);
}
