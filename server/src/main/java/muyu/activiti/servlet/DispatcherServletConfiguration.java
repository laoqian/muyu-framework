package muyu.activiti.servlet;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.i18n.LocaleChangeInterceptor;
import org.springframework.web.servlet.i18n.SessionLocaleResolver;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;


@Configuration
public class DispatcherServletConfiguration {
  private final Logger log = LoggerFactory.getLogger(DispatcherServletConfiguration.class);


  @Bean
  public JsonpCallbackFilter filter(){
    return new JsonpCallbackFilter();
  }

  @Bean
  public SessionLocaleResolver localeResolver() {
    return new SessionLocaleResolver();
  }

  @Bean
  public LocaleChangeInterceptor localeChangeInterceptor() {
    log.debug("Configuring localeChangeInterceptor");
    LocaleChangeInterceptor localeChangeInterceptor = new LocaleChangeInterceptor();
    localeChangeInterceptor.setParamName("language");
    return localeChangeInterceptor;
  }

  @Bean
  public RequestMappingHandlerMapping requestMappingHandlerMapping() {
    log.debug("Creating requestMappingHandlerMapping");
    RequestMappingHandlerMapping requestMappingHandlerMapping = new RequestMappingHandlerMapping();
    requestMappingHandlerMapping.setUseSuffixPatternMatch(false);
    Object[] interceptors = {localeChangeInterceptor()};
    requestMappingHandlerMapping.setInterceptors(interceptors);
    return requestMappingHandlerMapping;
  }
}
