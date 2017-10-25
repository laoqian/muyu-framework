
package muyu.system.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import muyu.system.common.persistence.DataEntity;


/**
 * 字典Entity
 * @author ThinkGem
 * @version 2013-05-15
 */

@EqualsAndHashCode(callSuper = true)
@Data
public class Gen extends DataEntity<Gen> {
	public Gen() {
		super();
	}

}