import fs from "fs";

// I want to store a list of objects(tasks).

const addTask = (description) => {
  //creating the task
  let task = {
    id: 1,
    description: description,
    status: "todo",
    createdAt: new Date().toLocaleString(),
    updatedAt: new Date().toLocaleString(),
  };

  // check file --> not-exist --> create --> make a list, add the object and write into file.
  // check file --> exist --> read data --> make an object --> append to the list --> write back the list.

  try {
    // checking the file if it exists.
    if (fs.existsSync("./task.json")) {
      // if file exist: Read its content.
      let alreadyExistingData = JSON.parse(
        fs.readFileSync("./task.json", "utf-8")
      );

      task.id = alreadyExistingData.length + 1;

      alreadyExistingData.push(task);

      fs.writeFileSync(
        "./task.json",
        JSON.stringify(alreadyExistingData),
        "utf-8"
      );
    } else {
      // if file doesn't exist: Create the file and add the task as it will be the first task.
      fs.writeFileSync("./task.json", JSON.stringify([task]), "utf-8");
    }
    console.log(`Task added successfully (ID:${task.id})`);
  } catch (error) {
    console.log(error.message);
  }
};

const allTask = () => {
  // if file exist: return all task
  // if file doesn't exist: return a message.

  try {
    // checking the file if it exists.
    if (fs.existsSync("./task.json")) {
      // if file exist: Read its content.
      const tasks = JSON.parse(fs.readFileSync("./task.json", "utf-8"));
      // checking if file is empty or not.
      if (tasks) {
        console.log(tasks);
      } else {
        console.log("You Currently Have No Tasks.");
      }
    } else {
      // if file doesn't exist: return a nice message.
      console.log("You Currently Have No Tasks.");
    }
  } catch (error) {
    console.log(error.message);
  }
};

if (!process.argv[2]) {
  console.log("USAGE: node task-cli.js <functionality> <options>");
}

switch (process.argv[2]) {
  case "add":
    if (!process.argv[3]) {
      console.log("USAGE: node task-cli.js add <task>");
    } else {
      addTask(process.argv[3]);
    }
    break;
  case "list":
    allTask();
}
