const axios = require('axios');
const { API_KEY } = require('../config');


// gets the basic recipe info from an id
async function getRecipeInfo(id/*, name, image, imageType*/) {
    try {
        const response = await axios({
            method: 'get',
            url: `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
        })
        let info = response.data;
        //let prepTime = info.preparationMinutes; MAY NOT BE AVAILABLE FOR ALL RECIPES
        let cookingTime = info.readyInMinutes;
        let image = info.image;
        let title = info.title;
        let servings = info.servings;
        let ingredientsInfo = info.extendedIngredients;
        let ingredients = [];
        for (let ingredientInfo in ingredientsInfo) {
            ingredients.push(ingredientsInfo[ingredientInfo].originalString)
        }
        return [id, title, image, cookingTime, servings, ingredients]
    } catch (err) {
        console.log(err.response);
    } 
}

// gets the steps only from a recipe
async function getSteps(id) {
    try {
        const response = await axios({
            method: 'get',
            url: `https://api.spoonacular.com/recipes/${id}/analyzedInstructions?apiKey=${API_KEY}`
        })
        let info = response.data;
        // there may be multiple things being made, each with their own steps
        let allItemsSteps = [];
        for (let item in info) {
            let itemSteps = item.steps
            let itemName = item.name;
            for (let step in itemsSteps) {
                //let pair = [itemsSteps[step].number, itemsSteps[step].step];
                //itemSteps.push(pair)
                itemSteps.push(itemsSteps[step].number + itemSteps[step].step)
            }
            if (itemName = '') {
                allItemsSteps.push('Main recipe', itemSteps);
            } else {
                allItemsSteps.push(itemName, itemSteps);
            }
        }
        return allItemsSteps;
    } catch (err) {
        console.log(err.response);
    }
}

module.exports = {
    getRecipeInfo,
    getSteps
}