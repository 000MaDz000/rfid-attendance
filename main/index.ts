import { BrowserWindow, app } from "electron";

const createWindow = () => {
    const window = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    });

    if (process.env.NODE_ENV === "development") {
        window.loadURL("http://localhost:3000");
        window.webContents.openDevTools({ "mode": "right" });
    }
    else {
        window.loadFile("../index.html")
    }

    window.webContents.emit("rfid", "hello rfid");
}

app.whenReady().then(() => {
    createWindow();
});