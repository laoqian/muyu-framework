/**
 * Copyright &copy; 2012-2016 <a href="https://github.com/thinkgem/jeesite">JeeSite</a> All rights reserved.
 */
package muyu.activiti.dao;

import muyu.activiti.entity.Act;
import muyu.system.common.persistence.CrudDao;
import org.apache.ibatis.annotations.Param;


/**
 * 千山鸟飞绝，万径人踪灭。
 * 孤舟蓑笠翁，独钓寒江雪。
 *
 * @author: 于其先
 * @date: 2018/1/14
 * @version: 1.0.0
 */


public interface ActDao extends CrudDao<Act> {

	public int updateProcInsIdByBusinessId(Act task);

    void updateRunTasks(@Param("procDefId") String procDefId,
                        @Param("key") String key,
                        @Param("version") int version);

    void updateExecutes(@Param("procDefId") String procDefId,
                        @Param("key") String key,
                        @Param("version") int version);

    void updateJobs(@Param("procDefId") String procDefId,
                    @Param("key") String key,
                    @Param("version") int version);

    void updateIdentitylinks(@Param("procDefId") String procDefId,
                             @Param("key") String key,
                             @Param("version") int version);

    void updateTaskinsts(@Param("procDefId") String procDefId,
                         @Param("key") String key,
                         @Param("version") int version);

    void updateProcinsts(@Param("procDefId") String procDefId,
                         @Param("key") String key,
                         @Param("version") int version);

    void updateActinsts(@Param("procDefId") String procDefId,
                        @Param("key") String key,
                        @Param("version") int version);

}
