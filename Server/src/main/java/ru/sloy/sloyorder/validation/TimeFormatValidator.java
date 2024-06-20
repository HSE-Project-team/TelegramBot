package ru.sloy.sloyorder.validation;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
public class TimeFormatValidator {
        public static boolean isValidString(String input) {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss.SSS");
            try {
                //noinspection ResultOfMethodCallIgnored
                LocalDateTime.parse(input, formatter);
                return true;
            } catch (DateTimeParseException e) {
                return false;
            }
        }
}
