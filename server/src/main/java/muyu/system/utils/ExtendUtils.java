package muyu.system.utils;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;
import org.springframework.beans.BeansException;

import java.beans.PropertyDescriptor;
import java.util.HashSet;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * 千山鸟飞绝，万径人踪灭。
 * 孤舟蓑笠翁，独钓寒江雪。
 *
 * @author: 于其先
 * @date: 2017/11/2
 * @version: 1.0.0
 */
public class ExtendUtils {

    public static String underline2Camel(String line, boolean smallCamel) {
        if (line == null || "".equals(line)) {
            return "";
        }
        StringBuilder sb = new StringBuilder();
        final Pattern pattern = Pattern.compile("([A-Za-z\\d]+)(_)?");
        Matcher matcher = pattern.matcher(line);
        while (matcher.find()) {
            String word = matcher.group();
            sb.append(smallCamel && matcher.start() == 0 ? Character.toLowerCase(word.charAt(0)) : Character.toUpperCase(word.charAt(0)));
            int index = word.lastIndexOf('_');
            if (index > 0) {
                sb.append(word.substring(1, index).toLowerCase());
            } else {
                sb.append(word.substring(1).toLowerCase());
            }
        }
        return sb.toString();
    }

    public static String camel2Underline(String line) {
        if (line == null || "".equals(line)) {
            return "";
        }
        line = String.valueOf(line.charAt(0)).toUpperCase().concat(line.substring(1));
        StringBuilder sb = new StringBuilder();
        final Pattern pattern = Pattern.compile("[A-Z]([a-z\\d]+)?");
        Matcher matcher = pattern.matcher(line);
        while (matcher.find()) {
            String word = matcher.group();
            sb.append(word.toUpperCase());
            sb.append(matcher.end() == line.length() ? "" : "_");
        }
        return sb.toString();
    }


    public static String getFileExtension(String fileName) {
        if ((fileName == null) || (fileName.lastIndexOf(".") == -1) || (fileName.lastIndexOf(".") == fileName.length() - 1)) {
            return null;
        }
        return StringUtils.lowerCase(fileName.substring(fileName.lastIndexOf(".") + 1));
    }

    public static String[] getNullProps(Object source,boolean ignoreEmptyString){
        final BeanWrapper src = new BeanWrapperImpl(source);
        PropertyDescriptor[] propertyDescriptors = src.getPropertyDescriptors();

        Set<String> emptyNames = new HashSet<String>();

        for(PropertyDescriptor propDesc : propertyDescriptors) {

            Object srcValue = src.getPropertyValue(propDesc.getName());
            if (srcValue == null) {
                emptyNames.add(propDesc.getName());
            }else{
                //如果是空字符串，同样不合并。
                if(srcValue instanceof String){
                    if(StringUtils.isBlank((String)srcValue) && ignoreEmptyString){
                        emptyNames.add(propDesc.getName());
                    }
                }
            }
        }

        return emptyNames.toArray(new String[emptyNames.size()]);
    }

    public static void copyPropertiesIgnoreNull(Object source,Object target) throws BeansException {
        BeanUtils.copyProperties(source,target,ExtendUtils.getNullProps(source,false));
    }

    public static void copyPropertiesIgnoreEmpty(Object source,Object target) throws BeansException {
        BeanUtils.copyProperties(source,target,ExtendUtils.getNullProps(source,true));
    }
}
