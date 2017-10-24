
package muyu.system.common.persistence;


import java.util.List;

/**
 * DAO支持类实现
 * @author ThinkGem
 * @version 2014-05-16
 * @param <T>
 */
public interface TreeDao<T> extends CrudDao<T> {

	List<T> findTree(String rootId);
}