const url = window.location.href;
const id = (url) => url.slice(url.indexOf('=') + 1);
const menuId = id(url);
// console.log(menuId(url));

const getRecipeByMenuID = async (menuId) => {
    // const baseUrl = 'https://api.spoonacular.com/';
    // const apiKey = 'fd4411eddc234b1295eed0e8b54ecc65';
    // const url = `${baseUrl}recipes/${menuId}/information?apiKey=${apiKey}`;
    const url = `https://api.spoonacular.com/food/menuItems/${menuId}?apiKey=fd4411eddc234b1295eed0e8b54ecc65`;

    const res = await fetch(url);
    const menuD = await res.json();
    console.log("data by menuId: " + menuD);

    return menuD;
}

const menuData = async (menuId) => { 
    const data = await getRecipeByMenuID(menuId); 
    console.log(data);
    
    const menuNameTag = document.querySelector('.menuName');
    const imgTag = document.querySelector('img');
    const nutrientsTag = document.querySelector('.nutrients');
    const totalNutritionTag = document.querySelector('.totalNutrition');

    console.log('Title Is here:' + data.title);
    menuNameTag.innerHTML = data.title;
    imgTag.src = data.image;

    let htmlDataNutrientsTag = '';
    data.nutrition.nutrients.forEach(element => {
        htmlDataNutrientsTag += `<li>${element.name}: ${element.amount} ${element.unit} (${element.percentOfDailyNeeds}% of Daily Need)</li>`;
    });
    nutrientsTag.insertAdjacentHTML('afterbegin',htmlDataNutrientsTag);

    let htmlDataFortotalNutritionTag = 
    `<li>Calories: ${data.nutrition.calories}</li>
    <li>Fat: ${data.nutrition.fat}</li>
    <li>Protein: ${data.nutrition.protein}</li>
    <li>Carbs: ${data.nutrition.carbs}</li>`;
    totalNutritionTag.insertAdjacentHTML('afterbegin',htmlDataFortotalNutritionTag);
}

window.addEventListener('load', function() {menuData(menuId)})