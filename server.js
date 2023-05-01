const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

const register = require("./controllers/register");
const signIn = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    port: 5432,
    user: "clayk",
    password: "",
    database: "face-finder",
  },
});

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("success");
});

app.post("/signin", signIn.handleSignIn(db, bcrypt));
app.post("/register", register.handleRegister(db, bcrypt));
app.get("/profile/:id", profile.handleProfileGet(db));
app.put("/image", image.handleImageGet(db));

// const PORT = process.env.PORT || 3000;

app.listen(3000, () => {
  console.log(`App is running on port 3000`);
});
