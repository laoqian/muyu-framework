package muyu.system.utils;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import java.util.Iterator;
import java.util.Set;

public class ValidationUtils {

    private static Validator validator = Validation.buildDefaultValidatorFactory().getValidator();
    private static String lastErrorMsg;

    public static <T> boolean valid(T t){
        Set<ConstraintViolation<T>> constraintViolations = validator.validate(t);
        if(constraintViolations.isEmpty()){
            lastErrorMsg = null;
            return true;
        }

        Iterator<ConstraintViolation<T>> ite = constraintViolations.iterator();
        StringBuilder msg = new StringBuilder();
        while(ite.hasNext()) {
            msg.append(ite.next().getMessage()).append(",");
        }

        lastErrorMsg = msg.toString();
        return false;
    }

    public static String getErrorMsg(){
        return lastErrorMsg;
    }
}
