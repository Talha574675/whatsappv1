const fs = require('fs');

function createUser(userId) {
    const users = JSON.parse(fs.readFileSync('./users.json', 'utf8'));
  
    // check if user exists
    if (users.users) {
      for (let user of users.users) {
        if (user.id === userId) {
          return "User ID already exists";
        }
      }
    } else {
      users.users = [];
    }
  
    const user = {
      "id": userId,
      "limit": 6
    };
    users.users.push(user);
  
    fs.writeFileSync('./users.json', JSON.stringify(users));
  
    return user;
  }


function hasLimit(userId) {
    const users = JSON.parse(fs.readFileSync('./users.json'));

    for (let user of users.users) {
        if (user.id === userId) {
            return user.limit > 0;
        }
    }

    return false;
}
function increaseLimit(userId, amount) {
    const users = JSON.parse(fs.readFileSync('./users.json'));

    for (let user of users.users) {
        if (user.id === userId) {
            user.limit += amount;
            break;
        }
    }

    // write to json file
    fs.writeFileSync('./users.json', JSON.stringify(users));
}
function decreaseLimitByOne(userId) {
    const users = JSON.parse(fs.readFileSync('./users.json'));

    for (let user of users.users) {
        if (user.id === userId) {
            if (user.limit > 0) {
                user.limit--;
            }
            break;
        }
    }

    // write to json file
    fs.writeFileSync('./users.json', JSON.stringify(users));
}
module.exports = {increaseLimit , hasLimit, createUser,decreaseLimitByOne}