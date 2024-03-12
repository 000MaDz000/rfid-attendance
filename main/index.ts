import { BrowserWindow, app } from "electron";
import { join } from "path";
import "./ipc-data-handler";
console.log(app.getAppPath())
const createWindow = () => {
    const window = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    });


    if (process.env.NODE_ENV === "development") {
        window.loadURL("http://localhost:3000");
        window.webContents.openDevTools();
    }
    else {
        console.log("node version:", process.versions.node);
        window.loadURL("file://" + join(__dirname, "../index.html#/"));
    }
}

app.whenReady().then(() => {
    createWindow();
})

app.on("window-all-closed", () => {
    try {
        app.quit();
    }
    catch (err) {

    }
})