const Blog = require("../models/blog");
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve("./public/uploads"));
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});
const upload = multer({ storage: storage });

async function handleAddBlog(req, res) {
  const { title, body } = req.body;
  const blog = await Blog.create({
    body,
    title,
    createdBy: req.user._id,
    coverImageURL: `/uploads/${req.file.filename}`,
  });
  return res.redirect(`/blog/${blog._id}`);
}

async function getBlogById(req, res) {
  const blog = await Blog.findById(req.params.id);

  return res.render("blog", {
    user: req.user,
    blog,
  });
}

module.exports = {
  upload,
  handleAddBlog,
  getBlogById,
};
