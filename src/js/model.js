import { async } from 'regenerator-runtime';
import { API_URL, RES_PER_PAGE } from './config.js';
import { getJSON } from './helpers';
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
  bookmarks:[],
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}`);
    let { recipe } = data.data;
    // console.log("hi"+recipe);
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    if(state.bookmarks.some(bookmark=>bookmark.id==id))
    state.recipe.bookmarked=true;
    else state.recipe.bookmarked=false;
    console.log(state.recipe);
  } catch (e) {
    console.error(`${e}🙄😶😶`);
    throw e;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    state.search.page=1;
    const data = await getJSON(`${API_URL}?search=${query}`);
    console.log('here isyour data');
    console.log(data);
    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
    // console.log(state.search.results);
  } catch (err) {
    console.error(`${err}😶😶😑😑`);
    throw err;
  }
};
export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });
  state.recipe.servings = newServings;
};
export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;

  const start = state.search.resultsPerPage * (page - 1);
  const end = page * state.search.resultsPerPage;
  console.log(start, end);

  return state.search.results.slice(start, end);
};

export const addBookmark=function(recipe){
state.bookmarks.push(recipe);
if(recipe.id===state.recipe.id)state.recipe.bookmarked=true;
}

export const deleteBookmark=function(id){
  const index=state.bookmarks.findIndex(el=>el.id===id);
  state.bookmarks.splice(index,1);
  if(id===state.recipe.id)state.recipe.bookmarked=false;

}