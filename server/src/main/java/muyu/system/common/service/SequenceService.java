/**
 * 
 */
package muyu.system.common.service;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.support.incrementer.OracleSequenceMaxValueIncrementer;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;


/**
 * 千山鸟飞绝，万径人踪灭。
 * 孤舟蓑笠翁，独钓寒江雪。
 *
 * @author: 于其先
 * @date: 2017年9月21日
 * @version: 1.0.0
 */
@Service
public class SequenceService {
    private static final String DEDAULT_SEQ_ID = "SEQ_COMMID";

    @Autowired
    DataSource dataSource;

    public String getNextVal(String seqId){
        OracleSequenceMaxValueIncrementer seq = new OracleSequenceMaxValueIncrementer(dataSource,DEDAULT_SEQ_ID);

        if (StringUtils.isBlank(seqId)) {
            seq.setIncrementerName(DEDAULT_SEQ_ID);
		}else {
            seq.setIncrementerName(seqId);
		}

        return  seq.nextStringValue();
    }
}