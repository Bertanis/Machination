package machination.view.window;

public class DisplayResolution {
    int width;
    int height;

    public DisplayResolution(int width, int height) {
        this.width = width;
        this.height = height;
    }

    public int getWidth() {
        return width;
    }

    public int getHeight() {
        return height;
    }

    public int getCenteredWidth(int monitorWidth) {
        return (monitorWidth - width) / 2;
    }

    public int getCenteredHeight(int monitorHeight) {
        return (monitorHeight - height) / 2;
    }

}
