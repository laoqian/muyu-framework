package muyu.system.validator;

import org.hibernate.validator.internal.util.logging.Log;
import org.hibernate.validator.internal.util.logging.LoggerFactory;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class CLengthValidator implements ConstraintValidator<CLength, String> {

    private static final Log log = LoggerFactory.make();

    private int min;
    private int max;

    @Override
    public void initialize(CLength parameters) {
        min = parameters.min();
        max = parameters.max();
        validateParameters();
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext constraintValidatorContext) {
        if ( value == null ) {
            return true;
        }

        int length = value.getBytes().length;
        return length >= min && length <= max;
    }

    private void validateParameters() {
        if ( min < 0 ) {
            throw log.getMinCannotBeNegativeException();
        }
        if ( max < 0 ) {
            throw log.getMaxCannotBeNegativeException();
        }
        if ( max < min ) {
            throw log.getLengthCannotBeNegativeException();
        }
    }
}
