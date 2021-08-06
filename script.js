const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');

const recipeCloseBtn = document.getElementById('recipe-close-btn');

// Event listeners
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('show-recipe');
});

// Get the meal list that matches with the ingredients
function getMealList() {
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`).then(response => {
        response.json().then(data => {
            let html = "";
            if (data.meals) {
                data.meals.forEach(meal => {
                    html += `
                    <div class="meal-item" data-id="${ meal.idMeal }">
                        <div class="meal-img">
                            <img src="${ meal.strMealThumb }" alt="food">
                        </div>
                        <div class="meal-name">
                            <h3>${ meal.strMeal }</h3>
                            <a href="#"class="recipe-btn">Get  Recipe</a>
                        </div>
                    </div>
                    `;
                });
                mealList.classList.remove('not-found');
            } else {
                html = "Sorry, we didn't find any meal!";
                mealList.classList.add('not-found');
            }
            // console.log(data);
            mealList.innerHTML = html;
        });
    });
}

// Get recipe of the meal
function getMealRecipe(event) {
    event.preventDefault();
    if (event.target.classList.contains('recipe-btn')) {
        let mealItem = event.target.parentElement.parentElement;
        // console.log(mealItem);
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`).then(response => {
            response.json().then(data => {
                mealRecipeModal(data.meals);
            });
        });
    };
};

// Create a modal
function mealRecipeModal(meal) {
    // console.log(meal);
    meal = meal[0];
    let html = `
        <h2 class="recipe-title">${ meal.strMeal }</h2>
        <p class="recipe-category">${ meal.strCategory }</p>
        <div class="recipe-instruct">
            <h3>Instructions:</h3>
            <p>${ meal.strInstructions }</p>
            <div class="recipe-meal-img">
                <img src="${ meal.strMealThumb }" alt="food">
            </div>
            <div class="recipe-link">
                <a href="${ meal.strYoutube }" class="btn" target="_blank">Watch Video</a>
            </div>
        </div>
    `;
    // console.log(mealDetailsContent);

    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('show-recipe');
}