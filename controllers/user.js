const User = require("../models/user");

function userSignin(req, res) {
  return res.render("signin");
}

function userSignup(req, res) {
  return res.render("signup");
}

async function handleUserSignup(req, res) {
  const { fullName, email, password } = req.body;
  await User.create({
    fullName,
    email,
    password,
  });
  return res.redirect("/");
}

async function handleUserSignin(req, res) {
  try {
    const { email, password } = req.body;
    const token = await User.matchPasswordAndCreateToken(email, password);

    res.cookie("token", token);
    return res.redirect("/");
  } catch (error) {
    return res.render("signin", {
      error: "Incorrect Email or Password",
    });
  }
}

module.exports = {
  userSignin,
  userSignup,
  handleUserSignup,
  handleUserSignin,
};
