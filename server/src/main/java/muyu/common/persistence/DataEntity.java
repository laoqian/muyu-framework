/**
 * Copyright &copy; 2012-2016 <a href="https://github.com/thinkgem/jeesite">JeeSite</a> All rights reserved.
 */
package muyu.common.persistence;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import muyu.common.utils.IdUtils;
import muyu.common.utils.UserUtils;
import muyu.model.User;
import org.apache.commons.lang3.StringUtils;
import org.hibernate.validator.constraints.Length;

import java.util.Date;

/**
 * 千山鸟飞绝，万径人踪灭。
 * 孤舟蓑笠翁，独钓寒江雪。
 *
 * @author: 于其先
 * @date: 2017年9月21日
 * @version: 1.0.0
 */

public abstract class DataEntity<T> extends BaseEntity<T> {

    private static final long serialVersionUID = 1L;

    protected String remarks;    // 备注

    @JsonIgnore
    protected User createBy;    // 创建者
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    protected Date createDate;    // 创建日期


    @JsonIgnore
    protected User updateBy;    // 更新者

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    protected Date updateDate;    // 更新日期

    @JsonIgnore
    @Length(min = 1, max = 1)
    protected String delFlag;    // 删除标记（0：正常；1：删除；2：审核）

    public DataEntity() {
        super();
    }

    public DataEntity(String id) {
        super(id);
    }

    /**
     * 插入之前执行方法，需要手动调用
     */
    @Override
    public void preInsert() {

        if (StringUtils.isBlank(this.id)) {
            setId(IdUtils.genId());
        }

        User user = UserUtils.getUser();
        if (StringUtils.isNotBlank(user.getId())) {
            this.updateBy = user;
            this.createBy = user;
        }
        this.updateDate = new Date();
        this.createDate = this.updateDate;
    }

    /**
     * 更新之前执行方法，需要手动调用
     */
    @Override
    public void preUpdate() {
        User user = UserUtils.getUser();
        if (StringUtils.isNotBlank(user.getId())) {
            this.updateBy = user;
        }
        this.updateDate = new Date();
    }
}
