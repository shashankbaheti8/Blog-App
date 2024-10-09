const { Router } = require("express");
const {
  handleAddBlog,
  upload,
  getBlogById,
  handleAddComment,
} = require("../controllers/blog");

const router = Router();

router.get("/add-new", (req, res) => {
  return res.render("addBlog", {
    user: req.user,
  });
});

router.post("/", upload.single("coverImage"), handleAddBlog);
router.get("/:id", getBlogById);
router.post("/comment/:blogId", handleAddComment);

module.exports = router;
