import recipeView from './views/recipeViews.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import searchView from './views/searchView';
import resultsView from './views/resultsView';
import PaginationView from './views/paginationView';
import BookmarksView from './views/bookmarksView.js'
 import AddRecipeView from './views/addRecipeView';
if (module.hot) {
  module.hot.accept();
}

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);
    if (!id) return;
    recipeView.renderSpinner();
    resultsView.render(model.getSearchResultsPage());
    await model.loadRecipe(id);

    const { recipe } = model.state;
    recipeView.render(model.state.recipe);
    // controlServings();
  } catch (err) {
    recipeView.renderError();
    console.error(err);
  }
};
const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    // console.log(resultsView);
    const query = searchView.getQuery();
    if (!query) return;
    await model.loadSearchResults(query);
    resultsView.render(model.getSearchResultsPage());
    PaginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};
const controlServings = function (newServings) {
  model.updateServings(newServings);
  recipeView.render(model.state.recipe);
  // recipeView.update(model.state.recipe);
};
const controlPagination = function (goToPage) {
  resultsView.render(model.getSearchResultsPage(goToPage));
  PaginationView.render(model.state.search);
};
const controlAddBookmark = function () {
  console.log(model.state.recipe.bookmarked);
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else if(model.state.recipe.bookmarked)model.deleteBookmark(model.state.recipe.id);
  recipeView.render(model.state.recipe);

  BookmarksView.render(model.state.bookmarks)
  // model.addBookmark(model.state.recipe);
  console.log(model.state.recipe);
};
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  PaginationView.addHandlerClick(controlPagination);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
};
init();
