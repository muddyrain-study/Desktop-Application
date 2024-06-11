const { Menu } = require("electron");

const menuArr = [
  {
    label: "文件",
    submenu: [
      {
        label: "新建文件",
        accelerator: "CmdOrCtrl+N",
        click: () => {
          console.log("新建文件");
        },
      },
      {
        label: "打开文件",
        accelerator: "CmdOrCtrl+O",
        click: () => {
          console.log("打开文件");
        },
      },
      {
        label: "保存文件",
        accelerator: "CmdOrCtrl+S",
        click: () => {
          console.log("保存文件");
        },
      },
      {
        label: "另存为",
        accelerator: "CmdOrCtrl+Shift+S",
        click: () => {
          console.log("另存为");
        },
      },
      {
        type: "separator",
      },
      {
        label: "退出",
        accelerator: "CmdOrCtrl+Q",
        click: () => {
          console.log("退出");
        },
      },
    ],
  },
  {
    label: "编辑",
    submenu: [
      {
        label: "撤销",
        accelerator: "CmdOrCtrl+Z",
        role: "undo",
      },
      {
        label: "重做",
        accelerator: "CmdOrCtrl+Y",
        role: "redo",
      },
      {
        type: "separator",
      },
      {
        label: "剪切",
        accelerator: "CmdOrCtrl+X",
        role: "cut",
      },
      {
        label: "复制",
        accelerator: "CmdOrCtrl+C",
        role: "copy",
      },
      {
        label: "粘贴",
        accelerator: "CmdOrCtrl+V",
        role: "paste",
      },
      {
        label: "全选",
        accelerator: "CmdOrCtrl+A",
        role: "selectAll",
      },
    ],
  },
  {
    label: "视图",
    submenu: [
      {
        label: "刷新",
        accelerator: "CmdOrCtrl+R",
        click: () => {
          console.log("刷新");
        },
      },
      {
        label: "全屏",
        accelerator: "CmdOrCtrl+F",
        click: () => {
          console.log("全屏");
        },
      },
    ],
  },
  {
    label: "帮助",
  },
];

const menu = Menu.buildFromTemplate(menuArr);

Menu.setApplicationMenu(menu);
