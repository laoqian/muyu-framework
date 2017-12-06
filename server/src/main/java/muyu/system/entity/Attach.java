
package muyu.system.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import muyu.system.common.persistence.DataEntity;

import java.math.BigDecimal;
import java.util.Date;

/**
 * 千山鸟飞绝，万径人踪灭。
 * 孤舟蓑笠翁，独钓寒江雪。
 * Attach
 * @author  于其先
 * @version 2017-12-06 09:08:40
 */

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
public class Attach extends DataEntity<Attach> {
	private static final long serialVersionUID = 1L;
    String name;  //name
    Long fileSize;  //file_size
    String savePath;  //save_path
    String extension;  //extension

    public Attach(String name,Long fileSize,String savePath){
        this.name = name;
        this.fileSize=fileSize;
        this.savePath = savePath;
    }
}