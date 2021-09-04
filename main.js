const form = document.getElementById("food-search");
const search = document.getElementById("search-bar");
const submit = document.getElementById("submit-btn");
const resultsHeading = document.getElementById("results-heading");
const results = document.getElementById("results");
const total = document.getElementById("total");
const scrollDownBtn = document.getElementById("scroll-down");
const scrollUpBtn = document.getElementById("scroll-up");

var rootElement = document.documentElement;

// nutrient variables
var totalCalories = 0;
var totalCarbs = 0;
var totalCholesterol = 0;
var totalSatFat = 0;
var totalFat = 0;
var totalFiber = 0;
var totalPotassium = 0;
var totalProtein = 0;
var totalServingSize = 0;
var totalSodium = 0;
var totalSugars = 0;

// uses the search input to make the API look for food items
function findFood(e) {
  e.preventDefault();

  const searchTerm = search.value;

  // console.log(searchTerm);

  // if there is no input found in the search bar after search button has been pressed
  if (searchTerm.trim()) {
    // using Calorie Ninjas API to find the food items and their nutrients' information
    $.ajax({
      method: "GET",
      url: "https://api.calorieninjas.com/v1/nutrition?query=" + searchTerm,
      headers: { "X-Api-Key": "2PyueR1IQUQ7RVv3GbA5iQ==2MpJfXId6iEa6XTt" },
      contentType: "application/json",
      success: function (result) {
        // console.log(result.items);
        // if the food does not exist
        if (result.items.length === 0) {
          alert("Unknown food");
        } else {
          $.map(result.items, function (food, i) {
            totalCalories += food.calories;
            totalCarbs += food.carbohydrates_total_g;
            totalCholesterol += food.cholesterol_mg;
            totalSatFat += food.fat_saturated_g;
            totalFat += food.fat_total_g;
            totalFiber += food.fiber_g;
            totalPotassium += food.potassium_mg;
            totalProtein += food.protein_g;
            totalServingSize += food.serving_size_g;
            totalSodium += food.sodium_mg;
            totalSugars += food.sugar_g;
            $("#results").append(`
              <h3>${food.name}</h3>
              <p>Calories: ${food.calories}</p>
              <p>Carbonhydrates: ${food.carbohydrates_total_g} g</p>
              <p>Cholesterol: ${food.cholesterol_mg} mg</p>
              <p>Saturated Fat: ${food.fat_saturated_g} g</p>
              <p>Fat: ${food.fat_total_g} g</p>
              <p>Fiber: ${food.fiber_g} g</p>
              <p>Potassium: ${food.potassium_mg} mg</p>
              <p>Protein: ${food.protein_g} g</p>
              <p>Serving Size: ${food.serving_size_g} g</p>
              <p>Sodium: ${food.sodium_mg} mg</p>
              <p>Sugars: ${food.sugar_g} g</p>
              <hr>`);
          });

          total.innerHTML = `<h2>Total</h2>
                           <p>Total Calories: ${totalCalories}</p>
                           <p>Total Carbonhydrates: ${totalCarbs} g</p>
                           <p>Total Cholesterol: ${totalCholesterol} mg</p>
                           <p>Total Saturated Fat: ${totalSatFat} g</p>
                           <p>Total Fat: ${totalFat} g</p>
                           <p>Total Fiber: ${totalFiber} g</p>
                           <p>Total Potassium: ${totalPotassium} mg</p>
                           <p>Total Protein: ${totalProtein} g</p>
                           <p>Total Serving Size: ${totalServingSize} g</p>
                           <p>Total Sodium: ${totalSodium} mg</p>
                           <p>Total Sugars: ${totalSugars} g</p>`;
        }
      },
      error: function ajaxError(jqXHR) {
        console.error("Error: ", jqXHR.responseText);
      },
    });
    search.value = "";
    scrollDownBtn.style.display = "block";
  } else {
    alert("No inputs detected");
  }

  resultsHeading.innerHTML = `<h1 id="heading-text">Search results for: ${searchTerm}</h1>`;
  results.innerHTML = "";

  // set nutrient variables back to 0 to restart calculations
  totalCalories = 0;
  totalCarbs = 0;
  totalCholesterol = 0;
  totalSatFat = 0;
  totalFat = 0;
  totalFiber = 0;
  totalPotassium = 0;
  totalProtein = 0;
  totalServingSize = 0;
  totalSodium = 0;
  totalSugars = 0;
}

// scroll down button function
function scrollDown() {
  // scrolls all the way to the bottom to see the total amount of nutrients
  window.scroll({
    top: 2500,
    left: 0,
    behavior: "smooth",
  });
  // scrollDownBtn.style.display = "none";
  // scrollUpBtn.style.display = "block";
}

// scroll up button function
function scrollUp() {
  // scrolls all the way up to go back to the search bar
  window.scroll({ top: 0, left: 0, behavior: "smooth" });
  // scrollDownBtn.style.display = "block";
  // scrollUpBtn.style.display = "none";
}

// function button that handles the scroll position of the page
function handleScroll() {
  var scrollTotal = rootElement.scrollHeight - rootElement.clientHeight;
  // if user scrolls down 80% of the web page, then scoll up button is displayed
  if (rootElement.scrollTop / scrollTotal > 0.8) {
    scrollUpBtn.style.display = "block";
  } else {
    scrollUpBtn.style.display = "none";
  }

  // if user scrolls up 80% of the web page, then scoll down button is displayed
  if (rootElement.scrollTop / scrollTotal < 0.8) {
    scrollDownBtn.style.display = "block";
  } else {
    scrollDownBtn.style.display = "none";
  }
}

document.addEventListener("scroll", handleScroll);
form.addEventListener("submit", findFood);
scrollDownBtn.addEventListener("click", scrollDown);
scrollUpBtn.addEventListener("click", scrollUp);
