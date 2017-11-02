package muyu.system.entity;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

/**
 * 千山鸟飞绝，万径人踪灭。
 * 孤舟蓑笠翁，独钓寒江雪。
 *
 * @author: 于其先
 * @date: 2017/10/20
 * @version: 1.0.0
 */


@Data
public class Config implements Serializable{
    List<Dict> dicts;
    List<TableColumn> tableColumns;
}