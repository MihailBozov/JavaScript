let serverURL = 'http://localhost:3030/jsonstore/tasks/';

let foodInput = document.getElementById('food');
let timeInput = document.getElementById('time');
let caloriesInput = document.getElementById('calories');

let addMealButton = document.getElementById('add-meal');
let editMealButton = document.getElementById('edit-meal');
let loadMealsButton = document.getElementById('load-meals');

let mealsContainer = document.getElementById('list');
mealsContainer.innerHTML = '';

loadMealsButton.addEventListener('click', loadMealsButtonClicked);
addMealButton.addEventListener('click', addMealButtonClicked);

async function loadMealsButtonClicked() {
    
    let request = await fetch(serverURL);

    let response = await request.json();


    mealsContainer.innerHTML = '';

    for (let key in response) {

        let mealElement = document.createElement('div');
        mealElement.className = 'meal';
        mealElement.id = key;

        let food = document.createElement('h2');
        food.textContent = response[key].food;

        let time = document.createElement('h3');
        time.textContent = response[key].time;

        let calories = document.createElement('h3');
        calories.textContent = response[key].calories;

        let mealButtonsContainer = document.createElement('div');
        mealButtonsContainer.id = 'meal-buttons';

        let changeButton = document.createElement('button');
        changeButton.className = 'change-meal';
        changeButton.innerText = 'Change';

        let deleteButton = document.createElement('button');
        deleteButton.className = 'delete-meal';
        deleteButton.innerText = 'Delete';

        mealButtonsContainer.appendChild(changeButton);
        mealButtonsContainer.appendChild(deleteButton);

        mealElement.appendChild(food);
        mealElement.appendChild(time);
        mealElement.appendChild(calories);
        mealElement.appendChild(mealButtonsContainer)

        mealsContainer.appendChild(mealElement);

        editMealButton.disabled = true;

        changeButton.addEventListener('click', changeButtonClicked);

        deleteButton.addEventListener('click', deleteButtonClicked);

        async function changeButtonClicked() {
            foodInput.value = food.textContent;
            timeInput.value = time.textContent;
            caloriesInput.value = calories.textContent;
            mealElement.remove();
            
            
            editMealButton.disabled = false;
            addMealButton.disabled = true;

            editMealButton.addEventListener('click', editMealButtonClicked);
        }

        async function editMealButtonClicked() {
            let obj = {
                calories: caloriesInput.value.trim(),
                food: foodInput.value.trim(),
                time: timeInput.value.trim(),
            }
            
            // await fetch(`${serverURL}${key}`, {
            await fetch(`${serverURL}${response[key]._id}`, {
                method: 'PUT',
                body: JSON.stringify(obj),
            });

            foodInput.value = '';
            caloriesInput.value = '';
            timeInput.value = '';
            editMealButton.disabled = true;
            addMealButton.disabled = false;

            await loadMealsButtonClicked();
        }
        
        async function deleteButtonClicked() {

            // await fetch(`${serverURL}${key}`, {
            await fetch(`${serverURL}${response[key]._id}`, {
                method: 'DELETE',
                // body: response,
            });

            await loadMealsButtonClicked();
        }
    }
}

async function addMealButtonClicked() {
    
    let obj = {
        calories: caloriesInput.value,
        food: foodInput.value,
        time: timeInput.value,
    }

    await fetch(serverURL, {
        method: 'POST',
        body: JSON.stringify(obj),
    });

    caloriesInput.value = '';
    foodInput.value = '';
    timeInput.value = '';

    await loadMealsButtonClicked();
}


