const uuid = require("uuid/v4");
const fs = require("fs");
const path = require("path");

class User {
  constructor(name, last_name, email) {
    this.name = name;
    this.last_name = last_name;
    this.email = email;
    this.id = uuid();
  }

  toJSON() {
    return {
      name: this.name,
      last_name: this.last_name,
      email: this.email,
      id: this.id
    };
  }
  async save() {
    const users = await User.getAll();
    users.push(this.toJSON());
    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, "..", "data", "users.json"),
        JSON.stringify(users),

        err => {
          if (err) reject(err);
          resolve();
        }
      );
    });

    console.log(users);
  }

  static getAll() {
    return new Promise((resolve, reject) => {
      fs.readFile(
        path.join(__dirname, "..", "data", "users.json"),
        "utf-8",
        (err, content) => {
          if (err) reject(err);
          resolve(JSON.parse(content));
        }
      );
    });
  }
}

module.exports = User;
