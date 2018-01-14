package muyu.system.common.beans;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.apache.commons.lang3.StringUtils;

import javax.servlet.http.HttpServletRequest;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 * 千山鸟飞绝，万径人踪灭。
 * 孤舟蓑笠翁，独钓寒江雪。
 *
 * @author: 于其先
 * @date: 2017/9/19
 * @version: 1.0.0
 */

@EqualsAndHashCode(callSuper = true)
@Data
public class ResultPageBean<T> extends BaseResultBean implements Serializable {

    private int pageNum; //当前页码
    private int pageSize; //页面大小
    private int pageCount; //总页数
    private long total;    //总记录数

    private boolean firstPage; //是否第一页
    private boolean lastPage;  //是否最后一页

    private int first;// 首页索引
    private int last; // 尾页索引
    private int prev; // 上一页索引
    private int next; // 下一页索引

    private List<T> list = new ArrayList<>();

    private String orderBy = "";  // 标准查询有效， 实例： updatedate desc, name asc

    public ResultPageBean(HttpServletRequest request) {
        super();

        String num = request.getParameter("pageNo");
        if (StringUtils.isNumeric(num)){
            this.pageNum = Integer.parseInt(num);
        }else {
            this.pageNum = 1;
        }

        String size = request.getParameter("pageSize");
        if (StringUtils.isNumeric(size)){
            this.pageSize = Integer.parseInt(size);
        }else{
            this.pageSize = 0;
        }

        String orderBy = request.getParameter("orderBy");
        if (StringUtils.isBlank(orderBy)){
            this.orderBy = "";
        }else{
            this.orderBy = orderBy;
        }

    }

    public ResultPageBean(String msg,boolean state){
        super(msg,state);
    }

}