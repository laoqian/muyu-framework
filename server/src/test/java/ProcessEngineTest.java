import org.activiti.engine.ProcessEngine;
import org.activiti.engine.ProcessEngineConfiguration;
import org.activiti.engine.impl.cfg.ProcessEngineConfigurationImpl;
import org.junit.Test;

/**
 * 千山鸟飞绝，万径人踪灭。
 * 孤舟蓑笠翁，独钓寒江雪。
 *
 * @author: 于其先
 * @date: 2017/12/8
 * @version: 1.0.0
 */
public class ProcessEngineTest {

    @Test
    public void buildProcessEngine() {
        // 创建一个流程引擎配置对象
        ProcessEngineConfiguration conf = ProcessEngineConfiguration
                .createStandaloneProcessEngineConfiguration();
        // 设置数据源信息
        conf.setJdbcDriver("oracle.jdbc.driver.OracleDriver");
        conf.setJdbcUrl("jdbc:oracle:thin:@localhost:1521:orcl");
        conf.setJdbcUsername("muyu");
        conf.setJdbcPassword("muyu");
        conf.setDatabaseSchema("MUYU");
        // 设置自动建表
        conf.setDatabaseSchemaUpdate(ProcessEngineConfigurationImpl.DB_SCHEMA_UPDATE_CREATE);

        // 创建一个流程引擎对象，在创建流程引擎对象过程中会自动建表
        ProcessEngine processEngine = conf.buildProcessEngine();
    }
}
