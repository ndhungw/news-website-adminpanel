const ArticleModel = require("./../models/articleModel");
const CategoryModel = require("./../models/categoryModel");

usersController = {};

/* Manage articles */

usersController.showAllArticles = async (req, res, next) => {
  try {
    console.log("... RUN - usersController.showAllArticles");
    const articles = await ArticleModel.getAllArticles();
    res.render("users/articles/articles", { articles: articles });
  } catch (e) {
    console.log(
      "... Get error when run - usersController.showAllArticles - " + e
    );
  }
};

usersController.showNewArticlePage = async (req, res, next) => {
  try {
    console.log("... RUN - usersController.showNewArticlePage");
    // get all categories
    const categories = await CategoryModel.getAllCategories();

    res.render("users/articles/new", {
      article: new ArticleModel(),
      categories: categories,
    });
  } catch (e) {
    console.log(
      "... Get error when run - usersController.showNewArticlePage - " + e
    );
  }
};

usersController.getArticle = async (req, res, next) => {
  try {
    const article = await ArticleModel.getArticle(req.params.slug);
    res.render("users/articles/show", { article: article });
  } catch (e) {
    console.log("... Get error when run - usersController.getArticle - " + e);
    res.redirect("/users/articles");
  }
};

usersController.addArticle = async (req, res, next) => {
  let articleToAdd = new ArticleModel({
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    markdown: req.body.markdown,
  });

  try {
    console.log("... RUN - usersController.addArticle");
    articleToAdd = await ArticleModel.addArticle(articleToAdd);
    res.redirect(`/users/articles/${articleToAdd.slug}`);
  } catch (e) {
    console.log("... Get error when run - usersController.addArticle - " + e);
    // get all categories
    const categories = await CategoryModel.getAllCategories();
    res.render("users/articles/new", {
      article: articleToAdd,
      categories: categories,
    });
  }
};

usersController.deleteArticle = async (req, res, next) => {
  try {
    console.log("... RUN - usersController.deleteArticle");
    await ArticleModel.deleteArticle(req.params.id);
    res.redirect("/users/articles");
  } catch (e) {
    console.log(
      "... Get error when run - usersController.deleteArticle - " + e
    );
  }
};

usersController.showEditArticlePage = async (req, res, next) => {
  try {
    console.log("... RUN - usersController.showEditArticlePage");
    let articleToEdit = await ArticleModel.getArticleById(req.params.id);
    // get all categories
    const categories = await CategoryModel.getAllCategories();
    res.render("users/articles/edit", {
      article: articleToEdit,
      categories: categories,
    });
  } catch (e) {
    console.log(
      "... Get error when run - usersController.showEditArticlePage - " + e
    );
  }
};

usersController.editArticle = async (req, res, next) => {
  let articleToEdit = new ArticleModel();

  try {
    console.log("... RUN - usersController.editArticle");
    articleToEdit = await ArticleModel.getArticleById(req.params.id);
    articleToEdit.title = req.body.title;
    articleToEdit.description = req.body.description;
    articleToEdit.markdown = req.body.markdown;
    await articleToEdit.save();
    res.redirect(`/users/articles/${articleToEdit.slug}`);
  } catch (e) {
    console.log("... Get error when run - usersController.editArticle - " + e);
    // get all categories
    const categories = await CategoryModel.getAllCategories();
    res.render("users/articles/edit", {
      article: articleToEdit,
      categories: categories,
    });
  }
};

function saveArticleAndRedirect(path) {
  return async (req, res) => {
    let article = req.article;
    article.title = req.body.title;
    article.description = req.body.description;
    article.description = req.body.description;

    try {
      console.log("... RUN - saveArticleAndRedirect");
      article = await article.save();
      res.redirect(`/users/articles/${article.slug}`);
    } catch (e) {
      console.log("... Get error when run - saveArticleAndRedirect - " + e);
      res.render(`users/articles/${path}`, { article: article });
    }
  };
}

// usersController.saveArticleAndRedirect = function (path) {
//   return async (req, res) => {
//     let article = req.article;
//     article.title = req.body.title;
//     article.description = req.body.description;
//     article.description = req.body.description;

//     try {
//       console.log("... RUN - saveArticleAndRedirect");
//       article = await article.save();
//       res.redirect(`/users/articles/${article.slug}`);
//     } catch (e) {
//       console.log("... Get error when run - saveArticleAndRedirect - " + e);
//       res.render(`pages/users/articles/${path}`, { article: article });
//     }
//   };
// };

/* Manage categories */
usersController.showAllCategories = async (req, res) => {
  try {
    console.log("... RUN - usersController.showAllCategories");
    const categories = await CategoryModel.getAllCategories();
    res.render("users/categories/categories", { categories: categories });
  } catch (e) {}
};

usersController.showNewCategoryPage = (req, res, next) => {
  try {
    console.log("... RUN - usersController.showNewCategoryPage");
    res.render("users/categories/new", { category: new CategoryModel() });
  } catch (e) {
    console.log(
      "... Get error when run - usersController.showNewCategoryPage - " + e
    );
  }
};

usersController.getCategoryByCategorySlug = async (req, res, next) => {
  try {
    console.log("... RUN - usersController.getCategoryByCategorySlug");
    const article = await CategoryModel.getCategoryByCategorySlug(
      req.params.categorySlug
    );
    res.render("users/categories/show", { category: category });
  } catch (e) {
    console.log(
      "... Get error when run - usersController.getCategoryByCategorySlug - " +
        e
    );
    res.redirect("/users/categories");
  }
};

usersController.addCategory = async (req, res, next) => {
  let categoryToAdd = new CategoryModel({
    title: req.body.title,
  });

  try {
    console.log("... RUN - usersController.addCategory");
    categoryToAdd = await CategoryModel.addCategory(categoryToAdd);
    res.redirect(`/users/categories/${categoryToAdd.categorySlug}`);
  } catch (e) {
    console.log("... Get error when run - usersController.addCategory - " + e);
    res.render("users/categories/new", { category: categoryToAdd });
  }
};

usersController.deleteCategory = async (req, res, next) => {
  try {
    console.log("... RUN - usersController.deleteCategory");
    await CategoryModel.deleteCategory(req.params.id);
    res.redirect("/users/categories");
  } catch (e) {
    console.log(
      "... Get error when run - usersController.deleteCategory - " + e
    );
  }
};

usersController.showEditCategoryPage = async (req, res, next) => {
  try {
    console.log("... RUN - usersController.showEditCategoryPage");
    let categoryToEdit = await CategoryModel.getCategoryById(req.params.id);
    res.render("users/categories/edit", { category: categoryToEdit });
  } catch (e) {
    console.log(
      "... Get error when run - usersController.showEditCategoryPage - " + e
    );
  }
};

usersController.editCategory = async (req, res, next) => {
  try {
    console.log("... RUN - usersController.editCategory");
    let categoryToEdit = await CategoryModel.getCategoryById(req.params.id);
    categoryToEdit.title = req.body.title;

    await categoryToEdit.save();
    res.redirect(`/users/categories/${categoryToEdit.categorySlug}`);
  } catch (e) {
    console.log("... Get error when run - usersController.editCategory - " + e);
    res.render("users/categories/edit", { category: categoryToEdit });
  }
};

module.exports = usersController;
