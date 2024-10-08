const express = require("express");
const app = express();
const path = require("path");
const PORT = 3000;
const cookieParser = require("cookie-parser");

const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");
const Blog = require("./models/blog");
const { connectToDB } = require("./connection");
const { checkForAuthenticationCookie } = require("./middlewares/auth");

connectToDB("mongodb://localhost:27017/blog-App").then(() => {
  console.log("Database Connected");
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/", async (req, res) => {
  const allBlogs = await Blog.find({});
  res.render("home", {
    user: req.user,
    blogs: allBlogs,
  });
});

app.use("/user", userRoute);
app.use("/blog", blogRoute);

app.listen(PORT, () => {
  console.log(`Server is running at PORT: ${PORT}`);
});
