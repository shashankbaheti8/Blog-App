const { Router } = require("express");
const { handleAddBlog, upload, getBlogById } = require("../controllers/blog");

const router = Router();

router.get("/add-new", (req, res) => {
  return res.render("addBlog", {
    user: req.user,
  });
});

router.get("/:id", getBlogById);

router.post("/", upload.single("coverImage"), handleAddBlog);

module.exports = router;
