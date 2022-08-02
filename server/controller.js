require("dotenv").config();
const { CONNECTION_STRING } = process.env;
const Sequelize = require("sequelize");

const sequelize = new Sequelize(CONNECTION_STRING, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

module.exports = {
  seedDB: (req, res) => {
    sequelize
      .query(
        `
    DROP TABLE IF EXISTS posts;

    CREATE TABLE posts(
      post_id SERIAL PRIMARY KEY,
      username VARCHAR(30),
      post VARCHAR
    );

    INSERT INTO posts (username, post)
    values ('ServerTest', 'Test post please ignore');
    `
      )
      .then(() => {
        console.log("DB seeded!");
        res.sendStatus(200);
      })
      .catch((err) => console.log("error seeding DB", err));
  },
  getPosts: (req, res) => {
    sequelize
      .query(`SELECT * FROM posts LIMIT 15;`)
      .then((dbRes) => res.status(200).send(dbRes[0]))
      .catch((err) => console.log(err));
  },
  makePost: (req, res) => {
    console.log(req);
    const { username, post } = req.body;
    sequelize
      .query(
        `INSERT INTO posts (username, post)
        VALUES ('${username}', '${post}');`
      )
      .then((dbRes) => res.status(200).send(dbRes[0]))
      .catch((err) => console.log(err));
  },
  changePost: (req, res) => {
    const { post } = req.body;
    const post_id = +req.params.id;
    sequelize
      .query(
        `UPDATE posts
        SET post = '${post}'
        WHERE post_id = ${post_id};`
      )
      .then((dbRes) => res.status(200).send(dbRes[0]))
      .catch((err) => console.log(err));
  },
  deletePost: (req, res) => {
    sequelize
      .query(`DELETE FROM posts WHERE post_id = ${req.params.id};`)
      .then((dbRes) => res.status(200).send(dbRes[0]))
      .catch((err) => console.log(err));
  },
};
