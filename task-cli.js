const fs = require("fs");

const TASK_FILE = "./task.json";
const VALID_STATUSES = ["in-progress", "done", "todo"];

/**
 * Validate command line arguments
 * @param {number} expectedLength - Expected number of process.argv elements
 * @param {string} command - The CLI command being executed
 * @throws {Error} If argument count doesn't match expected
 */
const validateArgs = (expectedLength, command) => {
  if (process.argv.length !== expectedLength) {
    const commands = {
      add: "task-cli add <description>",
      update: "task-cli update <id> <new_description>",
      delete: "task-cli delete <id>",
      "mark-in-progress": "task-cli mark-in-progress <id>",
      "mark-done": "task-cli mark-done <id>",
      list: `task-cli list [${VALID_STATUSES.join("|")}]`,
    };

    throw new Error(
      `Invalid arguments!\nUsage: ${commands[command] || "unknown command"}`
    );
  }
};

/**
 * Write tasks to file with validation
 * @param {Array} data - Array of task objects
 * @throws {Error} If data is invalid or write fails
 */
const writeFile = (data) => {
  if (!Array.isArray(data)) {
    throw new Error("Invalid data format: expected array");
  }
  fs.writeFileSync(TASK_FILE, JSON.stringify(data, null, 2), "utf-8");
};

/**
 * Read tasks from file, create if missing
 * @returns {Array} Array of task objects
 * @throws {Error} If file read/parse fails
 */
const readFile = () => {
  if (!fs.existsSync(TASK_FILE)) {
    writeFile([]);
    return [];
  }

  const content = fs.readFileSync(TASK_FILE, "utf-8");
  return content ? JSON.parse(content) : [];
};

/**
 * Add new task to the list
 * @param {string} description - Task description
 * @throws {Error} If description is empty
 * @example
 * addTask("Buy groceries"); // Adds new task with auto-incremented ID
 */
const addTask = (description) => {
  try {
    description = description?.trim();

    if (!description) {
      throw new Error("Task description cannot be empty.");
    }

    const tasks = readFile();

    if (
      tasks.some(
        (task) => task.description.toLowerCase() === description.toLowerCase()
      )
    ) {
      throw new Error("Task with this description already exists.");
    }

    const now = new Date().toLocaleString();

    const task = {
      id: tasks.length ? Math.max(...tasks.map((t) => t.id)) + 1 : 1, // Increment ID if tasks exist, otherwise start from 1
      description: description,
      status: "todo",
      createdAt: now,
      updatedAt: now,
    };

    writeFile([...tasks, task]); // Save updated list

    console.log(`Task added successfully (ID: ${task.id})`);
  } catch (error) {
    console.error(`Error Adding Task: ${error.message}`);
  }
};

/**
 * List all tasks
 * @throws {Error} If no task are available
 */
const listTask = () => {
  try {
    const tasks = readFile();

    if (tasks.length == 0) throw new Error("No tasks available.");

    tasks.forEach((task) => {
      console.log(
        `ID: [${task.id}] | ${task.description} | Status: ${task.status}`
      );
      console.log(`Created: ${task.createdAt}\nUpdated: ${task.updatedAt}`);
      console.log("─".repeat(50));
    });
  } catch (error) {
    console.error(`Error Listing Tasks: ${error.message}`);
  }
};

/**
 * List all tasks by status
 * @param {string} status - Task status
 * @throws {Error} If no task are available
 */
const listTaskByStatus = (status) => {
  try {
    status = status.toLowerCase();

    const tasks = readFile();

    if (!VALID_STATUSES.includes(status))
      throw new Error(
        `Invalid status '${status}'. Use 'todo', 'in-progress', or 'done'.`
      );

    const filteredTasks = tasks.filter((task) => task.status == status);

    if (filteredTasks.length == 0)
      throw new Error(`No tasks with status '${status}'.`);

    filteredTasks.forEach((task) => {
      console.log(
        `ID: [${task.id}] | ${task.description} | Status: ${task.status}`
      );
      console.log(`Created: ${task.createdAt}\nUpdated: ${task.updatedAt}`);
      console.log("─".repeat(50));
    });
  } catch (error) {
    console.error(`Error Listing Tasks: ${error.message}`);
  }
};

/**
 * Update task description
 * @param {number} id - Task ID to update
 * @param {string} desc - New description
 * @throws {Error} If task not found or invalid ID
 */
const updateDesc = (id, desc) => {
  try {
    const taskId = Number(id);
    if (isNaN(taskId)) {
      throw new Error("Invalid ID, please provide a valid numeric ID.");
    }

    desc = desc.trim();

    if (!desc) {
      throw new Error("Description can not be empty.");
    }

    if (
      tasks.some(
        (task) => task.description.toLowerCase() === desc.toLowerCase()
      )
    ) {
      throw new Error("Task with this description already exists.");
    }

    const tasks = readFile();
    const taskIndex = tasks.findIndex((task) => task.id === taskId);

    if (taskIndex === -1) {
      throw new Error(`No task found with ID = ${id}.`);
    }

    // Update the description and timestamp
    tasks[taskIndex].description = desc;
    tasks[taskIndex].updatedAt = new Date().toLocaleString();

    writeFile(tasks);

    console.log(`Task description updated successfully (ID: ${id})`);
  } catch (error) {
    console.error(`Error Updating Description: ${error.message}`);
  }
};

/**
 * Delete task by ID
 * @param {number} id - Task ID to delete
 * @throws {Error} If task not found or invalid ID
 */
const deleteTask = (id) => {
  try {
    const taskId = Number(id);

    if (isNaN(taskId)) {
      throw new Error("Invalid ID, please provide a valid numeric ID.");
    }
    let tasks = readFile();
    const initialLength = tasks.length;

    // Filter out the task with the given ID
    tasks = tasks.filter((task) => task.id != taskId);

    if (tasks.length === initialLength) {
      throw new Error(`No task found with ID = ${id}.`);
    }

    writeFile(tasks);
    console.log(`Task deleted successfully (ID: ${id})`);
  } catch (error) {
    console.error(`Error Deleting Task: ${error.message}`);
  }
};

/**
 * Update task status
 * @param {number} id - Task ID to update
 * @param {string} status - New status (must be valid status)
 * @throws {Error} If invalid status or task not found
 */
const updateStatus = (id, status) => {
  try {
    const taskId = Number(id);
    if (isNaN(taskId)) {
      throw new Error("Invalid ID, please provide a valid numeric ID.");
    }

    const tasks = readFile();
    const taskIndex = tasks.findIndex((task) => task.id === taskId);

    if (taskIndex === -1) {
      throw new Error(`No task found with ID = ${id}.`);
    }

    if (tasks[taskIndex].status === status)
      throw new Error("Task already has this status.");

    // Update the status and timestamp
    tasks[taskIndex].status = status;
    tasks[taskIndex].updatedAt = new Date().toLocaleString();

    writeFile(tasks);
    console.log(`Task status updated to '${status}' (ID: ${id})`);
  } catch (error) {
    console.error(`Error Updating Status: ${error.message}`);
  }
};

// Command handler with validation
const commands = {
  add: () => {
    validateArgs(4, "add");
    addTask(process.argv[3]);
  },

  list: () => {
    if (process.argv.length === 3) {
      listTask();
      return;
    }
    validateArgs(4, "list");
    listTaskByStatus(process.argv[3]);
  },

  update: () => {
    validateArgs(5, "update");
    updateDesc(process.argv[3], process.argv[4]);
  },

  delete: () => {
    validateArgs(4, "delete");
    deleteTask(process.argv[3]);
  },

  "mark-in-progress": () => {
    validateArgs(4, "mark-in-progress");
    updateStatus(process.argv[3], "in-progress");
  },

  "mark-done": () => {
    validateArgs(4, "mark-done");
    updateStatus(process.argv[3], "done");
  },
};

try {
  const command = process.argv[2];
  if (!commands[command])
    throw new Error(
      `Unknown command: ${command}. Available commands: add, list, list <status>, update, delete, mark-in-progress, mark-done.`
    );
  commands[command]();
} catch (error) {
  console.error(`Error: ${error.message}`);
  process.exit(1);
}
