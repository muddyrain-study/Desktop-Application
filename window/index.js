// 获取相应的 DOM 元素
const addTodoBtn = document.getElementById("addTodoBtn");
const todoList = document.getElementById("todoList");
const todoInput = document.getElementById("todoInput");
const customPrompt = document.getElementById("customPrompt");
const customPromptInput = document.getElementById("customPromptInput");
const customPromptOk = document.getElementById("customPromptOk");
const customPromptCancel = document.getElementById("customPromptCancel");

// 接下来我们工作的重点，是在 IndexedDB 的操作上面

// 开始 IndexedDB 数据库连接请求
// 数据库名称为 todoDB，版本号为 1
const request = indexedDB.open("todoDB", 1);

// 用于存储数据库连接的变量
let db;

// 数据库打开成功
request.onsuccess = (e) => {
  db = e.target.result;
  // 读取该数据库的信息并且展示出来
  readTodos();
};

// 数据库打开失败
request.onerror = (e) => {
  console.error("IndexedDB Error:", e.target.error);
};

// 代表数据库需要升级
// 在第一次创建或者版本升级的时候，都会触发该回调
request.onupgradeneeded = (e) => {
  db = e.target.result;
  // 新创建了一个 todos 的对象存储
  // autoIncrement 代表使用自动增长的键
  db.createObjectStore("todos", { autoIncrement: true });
};

// 读取并且显示所有的待办事项
function readTodos() {
  // 创建一个只读的事务，用于读取 todos 这个对象存储（表）
  const transaction = db.transaction(["todos"], "readonly");
  // 拿到数据仓库
  const store = transaction.objectStore("todos");
  // 使用游标读取所有数据
  const request = store.openCursor();

  todoList.innerHTML = "";

  request.onsuccess = (e) => {
    const cursor = e.target.result; // 获取游标指向的第一条数据
    if (cursor) {
      // 将数据渲染到页面上
      const li = document.createElement("li");
      li.textContent = cursor.value;
      createTodoButtons(li, cursor.value, cursor.primaryKey);
      todoList.appendChild(li);
      // 游标移动到下一条数据
      cursor.continue();
    }
  };

  request.onerror = (e) => {
    console.error("Read Error:", e.target.error);
  };
}

// 创建更新按钮和删除按钮
function createTodoButtons(li, value, id) {
  // 创建更新按钮
  const updateBtn = document.createElement("button");
  updateBtn.textContent = "更新";
  updateBtn.addEventListener("click", () => {
    showCustomPrompt(value, (newContent) => {
      if (newContent) {
        // 执行具体的更新操作
        updateTodo(id, newContent);
      }
    });
  });

  // 创建删除按钮
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "删除";
  deleteBtn.addEventListener("click", () => {
    deleteTodo(id);
  });

  const div = document.createElement("div");
  div.appendChild(updateBtn);
  div.appendChild(deleteBtn);
  li.appendChild(div);
}

// 添加新的待办事项
addTodoBtn.addEventListener("click", () => {
  // 获取输入框的内容
  const content = todoInput.value;
  if (content) {
    // 创建一个读写的事务，用于添加数据
    const transaction = db.transaction(["todos"], "readwrite");
    // 拿到数据仓库
    const store = transaction.objectStore("todos");
    // 添加新的待办事项
    store.add(content);

    // 当事务完成的时候的回调
    // 事务完成代表着数据添加成功
    transaction.oncomplete = () => {
      // 清空输入框
      todoInput.value = "";
      // 重新读取待办事项
      readTodos();
    };
  } else {
    alert("请输入待办事项内容");
  }
});

// 显示自定义提示框
// text: 回填的文本
function showCustomPrompt(text, callback) {
  // 文本回填
  customPromptInput.value = text;
  // 显示自定义提示框
  customPrompt.style.display = "block";

  // 确认修改相关逻辑
  customPromptOk.onclick = function () {
    callback(customPromptInput.value);
    customPrompt.style.display = "none";
  };

  // 取消按钮相关逻辑
  customPromptCancel.onclick = function () {
    callback(null);
    customPrompt.style.display = "none";
  };
}

/**
 *
 * @param {*} id 要修改的数据的 id
 * @param {*} newContent 新的内容
 */
function updateTodo(id, newContent) {
  // 创建一个读写的事务，用于添加数据
  const transaction = db.transaction(["todos"], "readwrite");
  // 拿到数据仓库
  const store = transaction.objectStore("todos");
  store.put(newContent, id);

  // 当事务完成的时候的回调
  // 事务完成代表着数据修改成功
  transaction.oncomplete = () => {
    // 重新读取待办事项
    readTodos();
  };

  transaction.onerror = (e) => {
    console.error("Error:", e.target.error);
  };
}

/**
 *
 * @param {*} id 要删除的项目的 id
 */
function deleteTodo(id) {
  // 创建一个读写的事务，用于添加数据
  const transaction = db.transaction(["todos"], "readwrite");
  // 拿到数据仓库
  const store = transaction.objectStore("todos");
  store.delete(id);

  // 当事务完成的时候的回调
  // 事务完成代表着数据删除成功
  transaction.oncomplete = () => {
    // 重新读取待办事项
    readTodos();
  };

  transaction.onerror = (e) => {
    console.error("Error:", e.target.error);
  };
}
