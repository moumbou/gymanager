const path = require("path");
const mongoose = require("mongoose");

const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const isDev = require("electron-is-dev");

const { TitleBarContants, FunctionsDB, NodeFunctions } = isDev
  ? require("../src/shared/Constants")
  : require("./Constants");
const userDB = require("./DB/usersFunction");
const subscriberDB = require("./DB/subscribersFunction");
const { pathToFileURL } = require("url");
const fs = require("fs");
const subsDB = require("./DB/subsFunction");

//! file:///C:/Users/ACP/Desktop/photo

let win = null;

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1024,
    height: 600,
    minWidth: 1024,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
      webSecurity: false,
    },
    titleBarStyle: "hidden",
    title: false,
    show: false,
  });

  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  win.on("maximize", () => {
    win.webContents.send(TitleBarContants.SET_WINDOW, true);
  });

  win.on("unmaximize", () => {
    win.webContents.send(TitleBarContants.SET_WINDOW, false);
  });
}

mongoose.connect("mongodb://localhost:27017/gym_manager", async (err) => {
  if (err)
    return dialog.showErrorBox(
      `erreur l'ors de la connexion a la BDD`,
      err.message
    );
  console.log("connected to data base successfully !");

  win.webContents.on("did-finish-load", async (e) => {
    try {
      const dataFile = fs.readFileSync(
        path.resolve(__dirname, "../../data.json")
      );
      let fileStore = JSON.parse(dataFile);
      e.sender.send(NodeFunctions.ADD_PICTURE_PATH, fileStore.file_store_img);
    } catch (error) {
      const object = JSON.stringify({
        file_store_img: "",
      });
      fs.writeFileSync(path.resolve(__dirname, "../../data.json"), object);
      e.sender.send(NodeFunctions.ADD_PICTURE_PATH, "");
    }

    //* CHECK IF THERE IS USERS OR ADD IF THERE IS NO USER FOUND
    const isThereUsers = await userDB.numberOfUsers();
    e.sender.send(FunctionsDB.IS_THERE_USERS, isThereUsers);

    //* CHECK FOR DEAD SUBS
    await subscriberDB.verifySubs();

    //* GET ALL POINTAGES AND SUBSCRIBERS
    const pointages = await subscriberDB.getSubscribersPointages();
    e.sender.send(FunctionsDB.GET_POINTGES, JSON.stringify(pointages));
    e.sender.send(FunctionsDB.IS_DEV, true);
    win.show();
    if (isDev) win.webContents.openDevTools();
  });
});

//* APP FUNCTIONS
app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
//*------------------*//

//* IPCMAIN FUNCTIONS
ipcMain.on(TitleBarContants.SET_WINDOW, (e, args) => {
  switch (args) {
    case TitleBarContants.DEVTOOLS:
      win.webContents.openDevTools({ mode: "detach" });
      break;

    case TitleBarContants.EXIT:
      win.close();
      break;

    case TitleBarContants.HIDE:
      win.minimize();
      break;

    case TitleBarContants.MAXIMIZE:
      win.maximize();
      break;

    case TitleBarContants.MINIMIZE:
      win.unmaximize();
      break;
    default:
      break;
  }
});

//? PICTURE PATH FORMAT
ipcMain.on(NodeFunctions.PICTURE_PATH, (e, args) => {
  e.sender.send(
    NodeFunctions.PICTURE_PATH,
    JSON.stringify(pathToFileURL(args))
  );
});

//? ADD PATH FOLDER FOR PICTURES
ipcMain.on(NodeFunctions.ADD_PICTURE_PATH, (e, args) => {
  const pathName = pathToFileURL(path.dirname(args)).href;
  const dataFile = fs.readFileSync(path.resolve(__dirname, "../../data.json"));
  let fileStore = JSON.parse(dataFile);
  fileStore.file_store_img = pathName;
  fs.writeFileSync(
    path.resolve(__dirname, "../../data.json"),
    JSON.stringify(fileStore),
    (err) => {
      if (err)
        return dialog.showErrorBox(`une erreure c'est produite !`, err.message);
    }
  );

  e.sender.send(NodeFunctions.ADD_PICTURE_PATH, fileStore.file_store_img);
});

//? GET USERS
ipcMain.on(FunctionsDB.GET_USERS, async (e, args) => {
  const users = await userDB.getUsersArray(args);
  e.sender.send(FunctionsDB.GET_USERS, JSON.stringify(users));
});

//? ADD USER
ipcMain.on(FunctionsDB.ADD_USER, async (e, args) => {
  const result = await userDB.addUser(args);
  if (!result.err) {
    if (args.user) {
      const users = await userDB.getUsersArray(args.user);
      e.sender.send(FunctionsDB.GET_USERS, JSON.stringify(users));
    } else {
      e.sender.send(FunctionsDB.GET_USER, JSON.stringify(result.result));
      e.sender.send(FunctionsDB.IS_THERE_USERS, 1);
    }
  }

  e.sender.send(NodeFunctions.MESSAGE_HANDLER, {
    err: result.err,
    message: result.message,
    errMsg: result.errMsg,
  });
});

//? GET USER
ipcMain.on(FunctionsDB.GET_USER, async (e, args) => {
  const result = await userDB.getUser(args);
  if (!result.err) {
    const subscribers = await subscriberDB.getSubscribers(result.result.role);
    e.sender.send(
      FunctionsDB.GET_SUBSCRIBERS,
      JSON.stringify(subscribers.result)
    );
    e.sender.send(FunctionsDB.GET_USER, JSON.stringify(result.result));
    e.sender.send(FunctionsDB.IS_THERE_USERS, 1);
  }

  e.sender.send(NodeFunctions.MESSAGE_HANDLER, {
    err: result.err,
    message: result.message,
  });
});

//? EDIT USER
ipcMain.on(FunctionsDB.EDIT_USER, async (e, args) => {
  const result = await userDB.editUser(args.user);
  if (!result.err) {
    if (args.connected._id.includes(result._id)) {
      const user = await userDB.getUser(args.user);
      e.sender.send(FunctionsDB.GET_USER, JSON.stringify(user.result));
    } else {
      const users = await userDB.getUsersArray(args.connected);
      e.sender.send(FunctionsDB.GET_USERS, JSON.stringify(users));
    }
  }

  e.sender.send(NodeFunctions.MESSAGE_HANDLER, result);
});

//? DELETE USER
ipcMain.on(FunctionsDB.DELETE_USER, async (e, args) => {
  const result = await userDB.deleteUser(args.user);
  if (!result.err) {
    const users = await userDB.getUsersArray(args.connected);
    e.sender.send(FunctionsDB.GET_USERS, JSON.stringify(users));
  }

  e.sender.send(NodeFunctions.MESSAGE_HANDLER, result);
});

//? ADD SUBSCRIBER
ipcMain.on(FunctionsDB.ADD_SUBSCRIBER, async (e, args) => {
  const result = await subscriberDB.addSubscriber(args);
  if (!result.err) {
    const subscribers = await subscriberDB.getSubscribers(args.role);
    if (!subscribers.err)
      e.sender.send(
        FunctionsDB.GET_SUBSCRIBERS,
        JSON.stringify(subscribers.result)
      );
  }

  e.sender.send(NodeFunctions.MESSAGE_HANDLER, {
    err: result.err,
    message: result.message,
    errMsg: result.errMsg,
  });
});

//? GET ALL SUBSCRIBERS
ipcMain.on(FunctionsDB.GET_SUBSCRIBERS, async (e, args) => {
  const result = await subscriberDB.getSubscribers(args);
  if (!result.err)
    e.sender.send(FunctionsDB.GET_SUBSCRIBERS, JSON.stringify(result.result));
});

//? EDIT SUBSCRIBER
ipcMain.on(FunctionsDB.EDIT_SUBSCRIBER, async (e, args) => {
  const result = await subscriberDB.editSubscriber(args);
  if (!result.err) {
    const subscribers = await subscriberDB.getSubscribers(args.role);
    e.sender.send(
      FunctionsDB.GET_SUBSCRIBERS,
      JSON.stringify(subscribers.result)
    );
  }

  e.sender.send(NodeFunctions.MESSAGE_HANDLER, result);
});

//? ADD SUB TO SUBSCRIBER
ipcMain.on(FunctionsDB.ADD_SUBSCRIBER_SUB, async (e, args) => {
  const result = await subscriberDB.addSub(args);
  if (!result.err) {
    const subscribers = await subscriberDB.getSubscribers(args.user.role);
    e.sender.send(
      FunctionsDB.GET_SUBSCRIBERS,
      JSON.stringify(subscribers.result)
    );
  }

  e.sender.send(NodeFunctions.MESSAGE_HANDLER, result);
});

//? VERIFY CODE
ipcMain.on(FunctionsDB.VERIFY_CODE, async (e, args) => {
  const result = await subscriberDB.verifyCode(args);
  e.sender.send(FunctionsDB.VERIFY_CODE, result);
});

//? DELETE SUBSCRIBER
ipcMain.on(FunctionsDB.DELETE_SUBSCRIBER, async (e, { id, role }) => {
  const result = await subscriberDB.deleteSubscriber(id);
  if (!result.err) {
    const subcribers = await subscriberDB.getSubscribers(role);
    e.sender.send(
      FunctionsDB.GET_SUBSCRIBERS,
      JSON.stringify(subcribers.result)
    );
  }

  e.sender.send(NodeFunctions.MESSAGE_HANDLER, {
    err: result.err,
    message: result.message,
    errMsg: result.errMsg,
  });
});

//? GET POINTAGES BY ID
ipcMain.on(FunctionsDB.GET_SUBSCRIBER_POINTAGE, async (e, args) => {
  const result = await subscriberDB.getPointageSubscriber(args);
  e.sender.send(FunctionsDB.GET_SUBSCRIBER_POINTAGE, JSON.stringify(result));
});

//? COCHER SEANCE
ipcMain.on(FunctionsDB.COCHER_SEANCE, async (e, args) => {
  const result = await subscriberDB.cocherSeance(args);
  if (!result.err) {
    const subscribers = await subscriberDB.getSubscribers(args.user.role);
    const pointages = await subscriberDB.getSubscribersPointages();
    e.sender.send(
      FunctionsDB.GET_SUBSCRIBERS,
      JSON.stringify(subscribers.result)
    );
    e.sender.send(FunctionsDB.GET_POINTGES, JSON.stringify(pointages));
  }

  e.sender.send(NodeFunctions.MESSAGE_HANDLER, result);
});

//? GET POINTAGES
ipcMain.on(FunctionsDB.GET_POINTGES, async (e) => {
  const pointages = await subscriberDB.getSubscribersPointages();
  e.sender.send(FunctionsDB.GET_POINTGES, JSON.stringify(pointages));
});

//? GET SUBS
ipcMain.on(FunctionsDB.GET_SUBS, async (e, args) => {
  const result = await subsDB.getSubs();
  if (!result.err)
    e.sender.send(FunctionsDB.GET_SUBS, JSON.stringify(result.result));
});

//? ADD SUB
ipcMain.on(FunctionsDB.ADD_SUB, async (e, args) => {
  const result = await subsDB.addSub(args);
  if (!result.err) {
    const subs = await subsDB.getSubs();
    e.sender.send(FunctionsDB.GET_SUBS, JSON.stringify(subs.result));
  }

  e.sender.send(NodeFunctions.MESSAGE_HANDLER, {
    err: result.err,
    message: result.message,
    errMsg: result.errMsg,
  });
});

//? DELETE SUB
ipcMain.on(FunctionsDB.DELETE_SUB, async (e, args) => {
  const result = await subsDB.deleteSub(args);
  if (!result.err) {
    const subs = await subsDB.getSubs();
    e.sender.send(FunctionsDB.GET_SUBS, JSON.stringify(subs.result));
  }

  e.sender.send(NodeFunctions.MESSAGE_HANDLER, {
    err: result.err,
    message: result.message,
  });
});

//? EDIT SUB
ipcMain.on(FunctionsDB.EDIT_SUB, async (e, args) => {
  const result = await subsDB.editSub(args);
  if (!result.err) {
    const subs = await subsDB.getSubs();
    e.sender.send(FunctionsDB.GET_SUBS, JSON.stringify(subs.result));
  }

  e.sender.send(NodeFunctions.MESSAGE_HANDLER, {
    err: result.err,
    message: result.message,
  });
});
//*-----------------*//
