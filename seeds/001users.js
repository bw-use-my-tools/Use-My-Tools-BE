const faker = require("faker");

function createUser() {
  return {
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    thumbnail_url: faker.image.avatar(),
    username:faker.internet.email(),
    password: "randomPassword"
  };
}

userList = [];

for (let i = 1; i < 40; i++) {
  userList.push(createUser());
}

exports.seed = function(knex, Promise) {
  return knex("users").then(function() {
    // Inserts seed entries
    return knex("users").insert(userList);
  });
};