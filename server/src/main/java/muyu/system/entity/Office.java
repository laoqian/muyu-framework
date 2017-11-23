
package muyu.system.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import muyu.system.common.persistence.TreeEntity;

import java.util.Date;

/**
 * 千山鸟飞绝，万径人踪灭。
 * 孤舟蓑笠翁，独钓寒江雪。
 * Office
 * @author  于其先
 * @version 2017-11-23 14:54:40
 */

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
public class Office extends TreeEntity<Office> {
	private static final long serialVersionUID = 1L;
    String name;  //name
    String area;  //area_id
    String code;  //code
    String type;  //type
    String grade;  //grade
    String address;  //address
    String zipCode;  //zip_code
    String phone;  //phone
    String fax;  //fax
    String email;  //email
    String useable;  //useable
    String primaryPerson;  //primary_person
    String deputyPerson;  //deputy_person
}