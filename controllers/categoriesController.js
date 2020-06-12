const ArticleModel = require("../models/articleModel");
const CategoryModel = require("../models/categoryModel");

categoriesController = {};

categoriesController.showCategoryPage = async (req, res) => {
  try {
    console.log("... RUN - categoriesController.showCategoryPage");
    const category = await CategoryModel.getCategoryByCategorySlug(
      req.params.categorySlug
    );
    const articles = await ArticleModel.getAllArticlesByCategoryTitle(
      category.title
    );
    const categories = await CategoryModel.getAllCategories();
    const tenLatestArticles = await ArticleModel.getAllArticles().limit(10);

    if (articles) {
      res.render("default/category", {
        category: category,
        articles: articles,
        categories: categories,
        latestArticles: tenLatestArticles,
      });
    }
  } catch (e) {
    console.log(
      "... Get error when run - categoriesController.showCategoryPage - " + e
    );
    res.redirect("/");
  }
};

module.exports = categoriesController;
