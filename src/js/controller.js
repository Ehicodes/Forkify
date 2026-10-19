import * as model from './model.js'
import recipeView from './views/recipeView.js'; 

// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io

///////////////////////////////////////
const controlRecipes = async function() {
   try{
    const id = window.location.hash.slice(1) 
  
    if(!id)  return;

    recipeView.renderSpinner()

    //1) Loading Recipe
    await model.loadRecipe(id)

   //2) Rendering Recipe
   recipeView.render(model.state.recipe)
   } catch(err) {
      recipeView.renderError()
   }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes)
}

init()