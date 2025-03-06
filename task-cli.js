import fs from "fs";

const addTask = (description) => {
  let task = {
    id: 1,
    description: description,
    status: "todo",
    createdAt: new Date().toLocaleString(),
    updatedAt: new Date().toLocaleString(),
  };

  try {
    if (checkFile()) {
      let tasks = readFile();

      task.id = tasks[tasks.length - 1].id + 1;

      tasks.push(task);

      writeFile(tasks);
    } else {
      writeFile([task]);
    }
    console.log(`Task added successfully ( ID:${task.id} )`);
  } catch (error) {
    console.log(`Error Adding Task: ${error.message}`);
  }
};

const listTask = () => {
  try {
    if (checkFile()) {
      const tasks = readFile();
      if (tasks) {
        if (!process.argv[3]) {
          console.log(tasks);
        } else {
          switch (process.argv[3]) {
            case "done":
              list("done");
              break;

            case "todo":
              list("todo");
              break;

            case "in-progress":
              list("in-progress");
              break;

            default:
              console.log(`There Exist No Input '${process.argv[3]}'`);
          }
        }
      } else {
        console.log("You Currently Have No Tasks.");
      }
    } else {
      console.log("There Exist No JSON File.");
    }
  } catch (error) {
    console.log(`Error Listing Tasks: ${error.message}`);
  }
};

const updateDesc = (id, desc) => {
  try {
    if (checkFile()) {
      const tasks = readFile();
      if (tasks) {
        if (tasks.some((task) => task.id == id)) {
          const updatedTask = updateTask(id, desc);
          writeFile(updatedTask);
        } else {
          console.log(`There Exist No Task With ID = ${id}.`);
        }
      } else {
        console.log(`You Currently Have No Tasks.`);
      }
    } else {
      console.log(`There Exist No JSON File.`);
    }
  } catch (error) {
    console.log(`Error Updating Description: ${error.message}`);
  }
};

const deleteTask = (id) => {
  try {
    if (checkFile()) {
      const tasks = readFile();
      if (tasks) {
        if (tasks.some((task) => task.id == id)) {
          const updatedTask = tasks.filter((task) => {
            return task.id != id;
          });
          writeFile(updatedTask);
        } else {
          console.log(`There Exist No Task With ID = ${id}.`);
        }
      } else {
        console.log(`You Currently Have No Tasks.`);
      }
    } else {
      console.log(`There Exist No JSON File.`);
    }
  } catch (error) {
    console.log(`Error Deleting Task: ${error.message}`);
  }
};

const updateStatus = (id) => {
  try {
    if (checkFile()) {
      const tasks = readFile();
      if (tasks) {
        if (tasks.some((task) => task.id == id)) {
          const updatedTask = updateTask(id);
          writeFile(updatedTask);
        } else {
          console.log(`There Exist No Task With ID = ${id}.`);
        }
      } else {
        console.log(`You Currently Have No Tasks.`);
      }
    } else {
      console.log(`There Exist No JSON File.`);
    }
  } catch (error) {
    console.log(`Error Updating Status: ${error.message}`);
  }
};

// Some Utility Functions
const writeFile = (data) => {
  if (data) {
    fs.writeFileSync("./task.json", JSON.stringify(data), "utf-8");
  } else {
    console.log("Please Provide Valid Data.");
  }
};

const checkFile = () => {
  return fs.existsSync("./task.json");
};

const readFile = () => {
  return JSON.parse(fs.readFileSync("./task.json", "utf-8"));
};

const list = (status) => {
  const tasks = readFile();
  const retrievedTasks = tasks.filter((task) => {
    return task.status == status;
  });
  retrievedTasks.length > 0
    ? console.log(retrievedTasks)
    : console.log(`Currently There Are No Task ${status}`);
};

const updateTask = (id, desc = "") => {
  const tasks = readFile();
  const updated = tasks.map((task) => {
    if (task.id == id) {
      if (process.argv[2] == "mark-in-progress") {
        task.status = "in-progress";
        task.updatedAt = new Date().toLocaleString();
      } else if (process.argv[2] == "mark-done") {
        task.status = "done";
        task.updatedAt = new Date().toLocaleString();
      } else if (desc != "") {
        task.description = desc;
        task.updatedAt = new Date().toLocaleString();
      }
    }
    return task;
  });
  return updated;
};

// MAIN
if (!process.argv[2]) {
  console.log("USAGE: node task-cli <actions> <inputs>");
  process.exit();
}

switch (process.argv[2]) {
  case "add":
    if (process.argv.length != 4) {
      console.log("USAGE: node task-cli add <task>");
    } else {
      addTask(process.argv[3]);
    }
    break;
  case "list":
    listTask();
    break;
  case "update":
    if (process.argv.length != 5) {
      console.log("USAGE: node task-cli update <id> <description>");
    } else {
      updateDesc(process.argv[3], process.argv[4]);
    }
    break;
  case "delete":
    if (process.argv.length != 4) {
      console.log("USAGE: node task-cli delete <id>");
    } else {
      deleteTask(process.argv[3]);
    }
    break;
  case "mark-in-progress":
    if (process.argv.length != 4) {
      console.log("USAGE: node task-cli mark-in-progress <id>");
    } else {
      updateStatus(process.argv[3]);
    }
    break;
  case "mark-done":
    if (process.argv.length != 4) {
      console.log("USAGE: node task-cli mark-done <id>");
    } else {
      updateStatus(process.argv[3]);
    }
    break;
  default:
    console.log(`There Exist No Such Action '${process.argv[2]}'`);
}
