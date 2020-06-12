const ArticleModel = require("../models/articleModel");
const CategoryModel = require("../models/categoryModel");

articlesController = {};

articlesController.showSingleArticlePage = async (req, res) => {
  try {
    console.log("... RUN - articlesController.showSingleArticle");
    const article = await ArticleModel.getArticle(req.params.slug);
    const category = await CategoryModel.getCategoryByCategoryTitle(
      article.category
    );
    const categories = await CategoryModel.getAllCategories();
    tenLatestArticles = await ArticleModel.getAllArticles().limit(10);

    if (article) {
      res.render("default/article", {
        article: article,
        category: category,
        categories: categories,
        latestArticles: tenLatestArticles,
      });
    }
  } catch (e) {
    console.log(
      "... Get error when run - articlesController.showSingleArticle - " + e
    );
    res.redirect("/");
  }
};

module.exports = articlesController;
