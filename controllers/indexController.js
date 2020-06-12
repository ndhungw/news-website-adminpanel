const ArticleModel = require("./../models/articleModel");
const CategoryModel = require("./../models/categoryModel");

indexController = {};

indexController.showHomePage = async (req, res) => {
  try {
    console.log("... RUN - indexController.showHomePage");
    const categories = await CategoryModel.getAllCategories();

    // build an array about each category contains it's articles
    let categoriesWithCorrespondingArticles = [];

    for (let i = 0; i < categories.length; i++) {
      const articles = await ArticleModel.getAllArticlesByCategoryTitle(
        categories[i].title
      ).limit(5); // only get 5 articles to show
      const latestArticle = articles[0]; // the first will be the latest cuz we had used find with sort desc
      let rightArticleList = []; // articles to show on the right

      for (let j = 1; j < articles.length; j++) {
        rightArticleList[j - 1] = articles[j];
      }

      categoriesWithCorrespondingArticles[i] = {
        category: categories[i],
        latestArticle: latestArticle,
        rightArticleList: rightArticleList,
      };
    }

    const tenLatestArticles = await ArticleModel.getAllArticles().limit(10);

    res.render("default/index", {
      title: "Trang chủ",
      categoriesWithCorrespondingArticles: categoriesWithCorrespondingArticles,
      latestArticles: tenLatestArticles,
      categories: categories,
    });
  } catch (e) {
    console.log("... Get error when run - indexController.showHomePage - " + e);
    e.printStackTrace();
  }
};

indexController.showContactPage = async (req, res) => {
  try {
    const categories = await CategoryModel.getAllCategories();
    const tenLatestArticles = await ArticleModel.getAllArticles().limit(10);
    res.render("default/contact", {
      title: "Liên hệ",
      categories: categories,
      latestArticles: tenLatestArticles,
    });
  } catch (e) {
    console.log(
      "... Get error when run - indexController.showContactPage - " + e
    );
  }
};

module.exports = indexController;
