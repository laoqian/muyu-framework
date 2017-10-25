package muyu.system.controller;

import muyu.system.common.beans.ResultBean;
import muyu.system.common.service.BaseService;
import muyu.system.service.GenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Set;

/**
 * 千山鸟飞绝，万径人踪灭。
 * 孤舟蓑笠翁，独钓寒江雪。
 *
 * @author: 于其先
 * @date: 2017/9/26
 * @version: 1.0.0
 */

@RestController
@RequestMapping("${prefixPath}/gen/")
public class GenController extends BaseService{
    @Autowired
    private GenService genService;

    @RequestMapping("getTableColumn")
    ResultBean<List> getTableColumn(String tableName){
        return genService.getTableColumn(tableName);
    }

    @RequestMapping("getTableList")
    ResultBean<Set> getTableList(){
        return genService.getTableList();
    }
}
