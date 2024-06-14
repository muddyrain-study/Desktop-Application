// 获取相应的 DOM 元素
const addTodoBtn = document.getElementById("addTodoBtn");
const todoList = document.getElementById("todoList");
const todoInput = document.getElementById("todoInput");
const customPrompt = document.getElementById("customPrompt");
const customPromptInput = document.getElementById("customPromptInput");
const customPromptOk = document.getElementById("customPromptOk");
const customPromptCancel = document.getElementById("customPromptCancel");

const Dexie = require("dexie");
const db = new Dexie("todoDB");

db.version(1).stores({
  todos: "++id, content",
});

async function updateTodo(id, newContent) {
  await db.todos.update(id, { content: newContent });
  readTodos();
}
// 删除待办事项
async function deleteTodo(id) {
  await db.todos.delete(id);
  readTodos();
}

function createTodoButtons(li, value, id) {
  const updateBtn = document.createElement("button");
  updateBtn.textContent = "更新";
  updateBtn.onclick = async () => {
    showCustomPrompt(value, async (newContent) => {
      if (newContent === "") {
        alert("内容不能为空");
        return;
      }
      await updateTodo(id, newContent);
    });
  };
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "删除";
  deleteBtn.onclick = async () => {
    await deleteTodo(id);
  };

  const div = document.createElement("div");
  div.appendChild(updateBtn);
  div.appendChild(deleteBtn);
  li.appendChild(div);
}

async function readTodos() {
  const allTodos = await db.todos.toArray();
  todoList.innerHTML = "";
  allTodos.forEach((todo) => {
    const li = document.createElement("li");
    li.textContent = todo.content;
    createTodoButtons(li, todo.content, todo.id);
    todoList.appendChild(li);
  });
}
readTodos();
// 增加待办事项
addTodoBtn.addEventListener("click", async () => {
  await db.todos.add({ content: todoInput.value });
  todoInput.value = "";
  readTodos();
});

// 显示自定义的提示框
function showCustomPrompt(text, callback) {
  customPromptInput.value = text;
  customPrompt.style.display = "block";

  customPromptOk.onclick = () => {
    callback(customPromptInput.value);
    customPrompt.style.display = "none";
  };

  customPromptCancel.onclick = () => {
    callback(null);
    customPrompt.style.display = "none";
  };
}
