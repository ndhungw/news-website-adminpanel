const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

/* Manage articles */

// GET articles listing
router.get("/articles", usersController.showAllArticles);

// GET new article page (R)
router.get("/articles/new", usersController.showNewArticlePage);

// GET article by slug (R)
router.get("/articles/:slug", usersController.getArticle);

// POST new article form (C)
router.post("/articles", usersController.addArticle);
// router.post("/articles", usersController.saveArticleAndRedirect('new'));

// DELETE a article (D)
router.delete("/articles/:id", usersController.deleteArticle);

router.get("/articles/edit/:id", usersController.showEditArticlePage);

router.put("/articles/:id", usersController.editArticle);
// router.put("/articles/:id", usersController.saveArticleAndRedirect('edit'));

/* Manage authentication */

/* Manage categories */

// GET categories listing
router.get("/categories", usersController.showAllCategories);

// GET new category page (R)
router.get("/categories/new", usersController.showNewCategoryPage);

// GET category by slug (R)
router.get(
  "/categories/:categorySlug",
  usersController.getCategoryByCategorySlug
);

// POST new category form (C)
router.post("/categories", usersController.addCategory);

// DELETE a category (D)
router.delete("/categories/:id", usersController.deleteCategory);

router.get("/categories/edit/:id", usersController.showEditCategoryPage);

router.put("/categories/:id", usersController.editCategory);
// router.put("/articles/:id", usersController.saveArticleAndRedirect('edit'));

module.exports = router;
