let form = document.querySelector(".myform");
let postsDisplay = document.querySelector(".allPostsDisplay");
let input = document.querySelector("#newPost");

form.addEventListener("submit", (ev) => {
  ev.preventDefault();
  let newPost = input.value;
  axios
    .post("/addpost", {
      newPost: newPost,
    })
    .then(() => {
      input.value = "";
      let container = document.createElement("div");

      let li = document.createElement("li");
      li.innerText = `${newPost}`;

      let upb = document.createElement("button");
      upb.type = "submit";
      upb.innerText = "Update";

      let delb = document.createElement("button");
      delb.type = "submit";
      delb.innerText = "Delete";

      container.appendChild(li);
      container.appendChild(upb);
      container.appendChild(delb);

      postsDisplay.append(container);
    });
});

function showData(data) {
  data.forEach((task) => {
    let container = document.createElement("div");

    let li = document.createElement("li");
    li.innerText = task.val;
    li.setAttribute("data-task-id", task.len);

    let upb = document.createElement("button");
    upb.classList.add("updatebutton");
    upb.type = "button";
    upb.innerText = "Update";

    let delb = document.createElement("button");
    delb.classList.add("deletebutton");
    delb.type = "button";
    delb.innerText = "Delete";

    container.appendChild(li);
    container.appendChild(upb);
    container.appendChild(delb);

    postsDisplay.append(container);
  });

  update();
  deleteTask();
}

function deleteTask() {
  postsDisplay.addEventListener("click", async (event) => {
    if (event.target.classList.contains("deletebutton")) {
      let li = event.target.parentElement.querySelector("li");
      let taskId = li.getAttribute("data-task-id");

      await axios.post("/deletepost", { taskId });

      li.parentElement.remove();
    }
  });
}

function update() {
  postsDisplay.addEventListener("click", async (event) => {
    if (event.target.classList.contains("updatebutton")) {
      let li = event.target.parentElement.querySelector("li");
      let taskId = li.getAttribute("data-task-id");

      let updatedTask = prompt(
        `Enter the updated task in place of ${li.innerText}:`
      );

      if (updatedTask) {
        li.innerText = updatedTask;

        await axios.post("/updatepost", {
          taskId: taskId,
          updatedTask: updatedTask,
        });
        console.log("Task updated successfully!");
      }
    }
  });
}

async function getData(api) {
  let data = await fetch(api);
  let resData = await data.json();
  showData(resData);
}

getData("/getpost");
