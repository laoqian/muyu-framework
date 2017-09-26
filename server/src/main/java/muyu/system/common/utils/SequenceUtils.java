/**
 * 
 */
package muyu.system.common.utils;

import org.apache.commons.lang3.StringUtils;
import org.springframework.jdbc.support.incrementer.OracleSequenceMaxValueIncrementer;
import org.springframework.stereotype.Service;


/**
 * 千山鸟飞绝，万径人踪灭。
 * 孤舟蓑笠翁，独钓寒江雪。
 *
 * @author: 于其先
 * @date: 2017年9月21日
 * @version: 1.0.0
 */
@Service
public class SequenceUtils {
    private static final String DEDAULT_SEQ_ID = "SEQ_COMMID";

//    @Autowired
    public OracleSequenceMaxValueIncrementer oracleSequenceMaxValueIncrementer;
   
    public String getNextVal(String seqId){
    	if (StringUtils.isBlank(seqId)) {
    		oracleSequenceMaxValueIncrementer.setIncrementerName(DEDAULT_SEQ_ID);
		}else {
			oracleSequenceMaxValueIncrementer.setIncrementerName(seqId);
		}

        return  oracleSequenceMaxValueIncrementer.nextStringValue();
    }
}