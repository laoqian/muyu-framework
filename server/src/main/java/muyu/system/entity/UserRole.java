package muyu.system.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 千山鸟飞绝，万径人踪灭。
 * 孤舟蓑笠翁，独钓寒江雪。
 *
 * @author: 于其先
 * @date: 2017/11/29
 * @version: 1.0.0
 */

@NoArgsConstructor
@Data
public class UserRole {
    String userId;
    String roleId;
    String id;

    public UserRole(String id,String userId,String roleId){
        this.id =id;
        this.userId =userId;
        this.roleId =roleId;
    }

}
