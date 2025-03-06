# 📝 Task Tracker CLI

**Task Tracker CLI** is a simple yet powerful command-line tool that helps you manage and track your tasks efficiently. It allows you to add, update, delete, and list tasks while maintaining their status (`todo`, `in-progress`, or `done`).  

This project is built using **Node.js** and uses a **JSON file** for storing tasks—keeping it lightweight and dependency-free.  

---

## 🚀 Features

✅ Add new tasks  
✅ Update task descriptions  
✅ Delete tasks  
✅ Mark tasks as **in-progress** or **done**  
✅ List all tasks  
✅ Filter tasks based on their status (`todo`, `in-progress`, `done`)  
✅ Data persistence using a **JSON file**  
✅ Fully optimized with **clean, efficient, and readable code**  

---

## 📦 Installation & Setup

1️⃣ **Clone the repository**  
```sh
git clone https://github.com/Muhammad-Faizan-Soomro/task-tracker-cli.git
cd task-tracker-cli
```

2️⃣ **Ensure you have Node.js installed**  
Check by running:  
```sh
node -v
```
If not installed, download it from [Node.js official website](https://nodejs.org/).

3️⃣ **You're ready to go! No dependencies are needed.** 🎉  

---

## 🔧 Usage

The CLI tool follows this general syntax:  
```sh
node task-cli <action> <inputs>
```

### ➕ Add a Task  
```sh
node task-cli add "Buy groceries"
```
📌 **Output:**  
```
Task added successfully (ID: 1)
```

### ✏️ Update Task Description  
```sh
node task-cli update 1 "Buy groceries and cook dinner"
```
📌 **Output:**  
```
Task description updated successfully (ID: 1)
```

### ❌ Delete a Task  
```sh
node task-cli delete 1
```
📌 **Output:**  
```
Task deleted successfully (ID: 1)
```

### ⏳ Mark Task as In-Progress  
```sh
node task-cli mark-in-progress 1
```
📌 **Output:**  
```
Task status updated to 'in-progress' (ID: 1)
```

### ✅ Mark Task as Done  
```sh
node task-cli mark-done 1
```
📌 **Output:**  
```
Task status updated to 'done' (ID: 1)
```

### 📜 List All Tasks  
```sh
node task-cli list
```
📌 **Output (Example):**  
```
[
  {
    "id": 1,
    "description": "Buy groceries and cook dinner",
    "status": "done",
    "createdAt": "3/6/2025, 10:00 AM",
    "updatedAt": "3/6/2025, 10:15 AM"
  }
]
```

### 🎯 List Tasks by Status  
```sh
node task-cli list todo
node task-cli list in-progress
node task-cli list done
```
📌 **Output (Example for `list todo`):**  
```
Currently, there are no tasks in 'todo' status.
```

---

## 📂 Project Structure

```
/task-tracker-cli
│── task-cli.js   # Main script
│── task.json     # Stores task data (auto-created)
│── README.md     # Documentation
```

---

## 🛠 Error Handling & Edge Cases

✅ Handles **non-existent task IDs** gracefully  
✅ Prevents **duplicate task IDs**  
✅ Ensures **valid input formats**  
✅ Prevents **corrupt JSON file issues**  
✅ Provides **meaningful error messages**  

---

## 💡 Why This Project?  

This project is great for:  
- Practicing **file system handling** in Node.js  
- Understanding **CLI applications**  
- Learning **error handling** in real-world scenarios  
- Building **efficient and optimized** JavaScript applications  

---

## 📜 License

This project is licensed under the **MIT License**.  

---

## 💬 Contributing  

Got ideas or improvements? Feel free to fork this repo and submit a **pull request**! 😊  

---

## 🙌 Author  

👤 **Muhammad Faizan Soomro**  
📧 [Email](mailto:mfaizansoomro00@gmail.com)  
🐙 [LinkedIn](https://www.linkedin.com/in/faizansoomro/)  

---