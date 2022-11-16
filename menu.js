const btnSubmit = document.querySelector('#btnRecipe');
const baseUrl = 'https://api.spoonacular.com/';
const apiKey = 'fd4411eddc234b1295eed0e8b54ecc65';

// let menuD;
// const getRecipeByMenuID = async(menuId) =>{
//     const url = `${baseUrl}recipes/${menuId}/information?apiKey=${apiKey}`;
    
//     const res = await fetch(url);
//     const menuD = await res.json();
//     console.log("data by menuId: "+ menuD.readyInMinutes);

//     return menuD;
// }

const addMenu = async(menu) =>{
    const containerDiv = document.querySelector('.container');

    const menuDiv = document.createElement('div');
    menuDiv.classList.add('menuDiv');

    let htmlData = 
    `<p class="price">Id: ${menu.id} Tk</p>
    <img src="${menu.image}" alt="menuItem">
    <h2>${menu.title}</h2>
    <p class="price"><a href="./nutrition.html?menuId=${menu.id}">Nutrition</a></p>`

    menuDiv.insertAdjacentHTML('afterbegin',htmlData );
    containerDiv.append(menuDiv);
}

const getMenu = async () => {
    const search = document.querySelector('#search');

    try {
        console.log(search.value);
        // let url = `https://api.spoonacular.com/food/menuItems/search?query=${search}&maxFat=25&number=1&apiKey=${apiKey}`
        let url = `${baseUrl}food/menuItems/search?query=${search.value}&number=5&apiKey=${apiKey}`;

        const res = await fetch(url);
        const data = await res.json();

        const menuItems = data.menuItems;
        menuItems.forEach(menu => {
            addMenu(menu);
        });
    } catch (err) {
        console.error(err);
    }


};

btnSubmit.addEventListener('click', () => getMenu());


