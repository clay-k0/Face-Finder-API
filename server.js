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
    connectionString: process.env.DATABASE_URL,
    host: process.env.DATABASE_HOST,
    ssl: { rejectUnauthorized: false },
    port: 5432,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PW,
    database: process.env.DATABASE_DB,
  },
});

const app = express();

app.use(express.json());

const corsOptions = {
  origin: "https://face-finder-frontend.onrender.com",
};
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("success");
});

app.post("/signin", signIn.handleSignIn(db, bcrypt));
app.post("/register", register.handleRegister(db, bcrypt));
app.get("/profile/:id", profile.handleProfileGet(db));
app.put("/image", image.handleImageGet(db));

app.listen(process.env.PORT || 3000, () => {
  console.log(`App is running on port ${process.env.PORT || 3000}`);
});
