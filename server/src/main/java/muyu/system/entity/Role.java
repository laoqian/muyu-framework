
package muyu.system.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import muyu.system.common.persistence.DataEntity;
import org.springframework.security.core.GrantedAuthority;

/**
 * 千山鸟飞绝，万径人踪灭。
 * 孤舟蓑笠翁，独钓寒江雪。
 * Role
 * @author  于其先
 * @version 2017-11-22 09:23:54
 */

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
public class Role extends DataEntity<Role> implements GrantedAuthority {
	private static final long serialVersionUID = 1L;
    String id;          //id
    String name;        //name
    String ename;       //ename
    String type;        //type
    Office company;     //公司
    Office office;      //部门

    @Override
    public String getAuthority() {
        return ename;
    }

    public String getEname() {
        return ename==null?null:ename.toUpperCase();
    }
}