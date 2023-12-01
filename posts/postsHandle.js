let fs = require("fs");
let path = require("path");
let fileName = path.join(__dirname, "allposts.js");

class posts {
  static getpost() {
    return new Promise((resolve, reject) => {
      fs.readFile(
        fileName,
        {
          encoding: "utf-8",
        },
        (err, data) => {
          if (err) {
            return reject(err.message);
          }
          resolve(JSON.parse(data));
        }
      );
    });
  }

  static addpost(val) {
    return new Promise((resolve, reject) => {
      fs.readFile(
        fileName,
        {
          encoding: "utf-8",
        },
        (err, data) => {
          if (err) {
            return reject(err.message);
          }
          if (data.length == 0) {
            data = [];
          } else {
            data = JSON.parse(data);
          }
          let senddata = {
            val: val,
            id: data.length + 1,
          };
          data.push(senddata);
          fs.writeFile(fileName, JSON.stringify(data), (err) => {
            if (err) {
              reject(err.message);
            }
            resolve("task added");
          });
        }
      );
    });
  }

  static updatepost(taskId, updatedTask) {
    return new Promise((resolve, reject) => {
      fs.readFile(
        fileName,
        {
          encoding: "utf-8",
        },
        (err, data) => {
          if (err) return reject(err.message);
          if (data.length != 0) {
            data = JSON.parse(data);
            for (let i = 0; i < data.length; i++) {
              if (data[i].id == taskId) {
                data[i].val = updatedTask;
                data[i].id = taskId;
                break;
              }
            }
          }
          fs.writeFile(fileName, JSON.stringify(data), (err) => {
            if (err) reject(err.message);
            resolve("task updated.");
          });
        }
      );
    });
  }
  static deletepost(taskId) {
    return new Promise((resolve, reject) => {
      fs.readFile(
        fileName,
        {
          encoding: "utf-8",
        },
        (err, data) => {
          let tasks = [];
          if (err) return reject(err.message);
          if (data.length != 0) {
            data = JSON.parse(data);

            for (let i = 0; i < data.length; i++) {
              if (data[i].id != taskId) {
                tasks.push(data[i]);
              }
            }
          }
          fs.writeFile(fileName, JSON.stringify(tasks), (err) => {
            if (err) reject(err.message);
            resolve("task deleted.");
          });
        }
      );
    });
  }
}

module.exports = posts;
