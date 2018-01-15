package muyu.system.config;

import muyu.system.utils.IdUtils;
import org.activiti.engine.*;
import org.activiti.spring.SpringAsyncExecutor;
import org.activiti.spring.SpringProcessEngineConfiguration;
import org.activiti.spring.boot.AbstractProcessEngineAutoConfiguration;
import org.activiti.spring.boot.ActivitiProperties;
import org.activiti.spring.boot.DataSourceProcessEngineAutoConfiguration;
import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.boot.autoconfigure.AutoConfigureBefore;
import org.springframework.boot.autoconfigure.condition.ConditionalOnClass;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.transaction.PlatformTransactionManager;

import javax.persistence.EntityManagerFactory;
import javax.sql.DataSource;
import java.io.IOException;

/**
 * 千山鸟飞绝，万径人踪灭。
 * 孤舟蓑笠翁，独钓寒江雪。
 *
 * @author: 于其先
 * @date: 2017/12/7
 * @version: 1.0.0
 */




/**
 * @author Joram Barrez
 * @author Josh Long
 */
@Configuration
@AutoConfigureBefore(DataSourceProcessEngineAutoConfiguration.class)
@AutoConfigureAfter(DataSourceAutoConfiguration.class)
public class JpaProcessEngineAutoConfiguration {

    @Configuration
    @ConditionalOnClass(name= "javax.persistence.EntityManagerFactory")
    @EnableConfigurationProperties(ActivitiProperties.class)
    public static class JpaConfiguration extends AbstractProcessEngineAutoConfiguration {


        @Bean
        public SpringProcessEngineConfiguration springProcessEngineConfiguration(
                DataSource dataSource, EntityManagerFactory entityManagerFactory,
                DataSourceTransactionManager transactionManager, SpringAsyncExecutor springAsyncExecutor) throws IOException {

            SpringProcessEngineConfiguration config = this.baseSpringProcessEngineConfiguration(dataSource,
                    transactionManager, springAsyncExecutor);
            config.setJpaEntityManagerFactory(entityManagerFactory);
            config.setTransactionManager(transactionManager);
            config.setJpaHandleTransaction(false);
            config.setJpaCloseEntityManager(false);
            config.setDatabaseSchemaUpdate(ProcessEngineConfiguration.DB_SCHEMA_UPDATE_TRUE);
            config.setDatabaseSchema("MUYU");
            config.setIdGenerator(new IdUtils());
            config.setJobExecutorActivate(false);/*关闭定时任务*/
            config.setAsyncExecutorActivate(false);/*关闭异步定时任务*/

            return config;
        }
    }
}
