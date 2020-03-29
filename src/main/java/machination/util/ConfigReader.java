package machination.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

/**
 * Singleton class containing static methods for reading data from config.cfg
 */
public class ConfigReader {

    private static final String CONFIG_FILE_NAME = "config.cfg";
    private static final Logger LOGGER = LogManager.getLogger();

    private static final ConfigReader INSTANCE;
    static {
        try {
            INSTANCE = new ConfigReader();
        } catch (Exception e) {
            throw new ExceptionInInitializerError(e);
        }
    }

    private Properties configValues;

    private ConfigReader() throws IOException {
        String configFilePath = this.getClass().getClassLoader().getResource(CONFIG_FILE_NAME).getPath();
        InputStream configFileStream = new FileInputStream(new File(configFilePath));
        configValues = new Properties();
        configValues.load(configFileStream);
    }

    public static String readStringValue(String key) throws InvalidConfigurationValueException {
        String value = INSTANCE.configValues.getProperty(key);
        if (value == null) {
            throw new InvalidConfigurationValueException("\"%s\" does not exist in the configuration file");
        }
        LOGGER.info("Read [{}, {}] from {}", key, value, CONFIG_FILE_NAME);
        return value;
    }

    public static int readIntValue(String key) throws InvalidConfigurationValueException {
        String rawValue = readStringValue(key);
        try {
            return Integer.valueOf(rawValue);
        } catch (NumberFormatException e) {
            throw new InvalidConfigurationValueException(
                    String.format("Cannot convert value %s to type INT", rawValue));
        }
    }

    public static double readDoubleValue(String key) throws InvalidConfigurationValueException {
        String rawValue = readStringValue(key);
        try {
            return Double.valueOf(rawValue);
        } catch (NumberFormatException e) {
            throw new InvalidConfigurationValueException(
                    String.format("Cannot convert value %s to type DOUBLE", rawValue));
        }
    }

    public static boolean readBooleanValue(String key) throws InvalidConfigurationValueException {
        String rawValue = readStringValue(key);
        if (rawValue.equalsIgnoreCase("true")) {
            return true;
        } else if (rawValue.equalsIgnoreCase("false")) {
            return false;
        } else {
            throw new InvalidConfigurationValueException(
                    String.format("Cannot convert value %s to type BOOLEAN", rawValue));
        }
    }

    public static class InvalidConfigurationValueException extends Exception {

        private static final long serialVersionUID = 1L;

        public InvalidConfigurationValueException(String message) {
            super(message);
        }
    }
}