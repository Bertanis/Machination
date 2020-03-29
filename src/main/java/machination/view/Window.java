package machination.view;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.lwjgl.glfw.GLFW;
import org.lwjgl.glfw.GLFWVidMode;

import machination.view.window.DisplayResolution;

public class Window {

    private static final Logger LOGGER = LogManager.getLogger();

    private static final long DEFAULT_MONITOR = 0;
    private static final long DEFAULT_SHARE_STATUS = 0;
    private static final long INVALID_WINDOW_VALUE = 0;

    String windowTitle;
    private DisplayResolution resolution;
    private long window;

    public Window(DisplayResolution resolution, String windowTitle) throws WindowInitializationError {
        this.windowTitle = windowTitle;
        this.resolution = resolution;
    }

    public void create() throws WindowInitializationError {
        if (!GLFW.glfwInit()) {
            throw new WindowInitializationError("GLFW not initialized");
        }

        LOGGER.info("Initializing Window");
        window = getWindowValueUsingResolution(resolution, windowTitle);

        GLFWVidMode videoMode = GLFW.glfwGetVideoMode(GLFW.glfwGetPrimaryMonitor());
        int windowXPosition = resolution.getCenteredWidth(videoMode.width());
        int windowYPosition = resolution.getCenteredHeight(videoMode.height());
        GLFW.glfwSetWindowPos(window, windowXPosition, windowYPosition);
    }

    private static long getWindowValueUsingResolution(DisplayResolution resolution, String title)
            throws WindowInitializationError {
        long windowValue = GLFW.glfwCreateWindow(resolution.getWidth(), resolution.getHeight(), (CharSequence) title,
                DEFAULT_MONITOR, DEFAULT_SHARE_STATUS);
        if (windowValue == INVALID_WINDOW_VALUE) {
            throw new WindowInitializationError("GLFW could not initialize window");
        } else {
            return windowValue;
        }
    }

    public static class WindowInitializationError extends Exception {

        private static final long serialVersionUID = -2301732699125636630L;

        /**
         * Default Constructor with message.
         * 
         * @param message String message to displayed when thrown
         */
        public WindowInitializationError(String message) {
            super(message);
        }
    }
}