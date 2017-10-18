package muyu.system.common.utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

/**
 * 千山鸟飞绝，万径人踪灭。
 * 孤舟蓑笠翁，独钓寒江雪。
 *
 * @author: 于其先
 * @date: 2017/9/24
 * @version: 1.0.0
 */
public class HttpUtils {
    private static Logger logger = LoggerFactory.getLogger(HttpUtils.class);

    public static void sendResponse(HttpServletResponse response,Object body) throws JsonProcessingException {

        ObjectMapper mapper = new ObjectMapper(); //转换器
        String json= mapper.writeValueAsString(body);
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json; charset=utf-8");
        PrintWriter out = null;
        try {
            out = response.getWriter();
            out.append(json);
            logger.debug("认证完成");

        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (out != null) {
                out.close();
            }
        }
    }
}
