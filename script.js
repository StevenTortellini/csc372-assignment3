document.addEventListener("DOMContentLoaded", domLoaded);

function domLoaded() {  
    // Grab all dish cards on the page
    const dishCards = document.querySelectorAll(".dishes .card");
    // Hard-coded prices; could assign attribute to item cards or use item objects with a price attribute if dynamic
    const samplePrices = [12, 9, 3, 6, 8, 9, 20, 8, 10];

    // Create summary section (favorites list)
    const summaryContainer = createFavoritesSummary();
    
    // Insert summary before contact section
    const contactSection = document.getElementById("contact");
    contactSection.parentNode.insertBefore(summaryContainer, contactSection);

    // Once created and inserted create references to favorites list and total
    const favoritesList = document.getElementById("favorites-list");
    const favoritesTotal = document.getElementById("favorites-total"); // global string total, not int

    let favorites = [];

    // Setup each card: price tag, button, and click listener
    dishCards.forEach(function (card, index) {
        const price = samplePrices[index]; 
        setupCard(card, price, favorites, favoritesList, favoritesTotal);
    });
}


//Creates and returns the favorites summary container only executes once but created func for readability in domloaded
function createFavoritesSummary() {
    const container = document.createElement("div");
    container.classList.add("favorites-summary");
    // Hardcoded HTML elements; safe to use innerHTML since no user input
    container.innerHTML = `
        <h3>Favorites</h3>
        <ul id="favorites-list"></ul>
        <p><strong>Total:</strong> $<span id="favorites-total">0.00</span></p>
    `;
    return container;
}

// Sets up a single dish card 
function setupCard(card, price, favorites, favoritesList, favoritesTotal) {
    // Add price tag to card
    const priceTag = document.createElement("p");
    priceTag.classList.add("price-tag");
    priceTag.textContent = "Price: $" + price.toString();
    card.appendChild(priceTag);

    // Add "Add to Favorites" button
    const button = document.createElement("button");
    button.textContent = "Add to Favorites";
    button.classList.add("fav-btn");
    card.appendChild(button);

    // Add click listener for button  allows for passing of params without executing on startup.
    button.addEventListener("click", function () {
        handleFavoriteClick(card, button, price, favorites, favoritesList, favoritesTotal);
    });
}

//Handles adding/removing a dish from favorites 
function handleFavoriteClick(card, button, price, favorites, favoritesList, favoritesTotal) {
    const dishName = card.querySelector("h4").textContent;
    const existingIndex = favorites.findIndex(item => item.name === dishName); //find an item with .name atribute eq to dishName string  if not found will ret -1. will iterate through entire list
    //if found
    if (existingIndex !== -1) { 
        // Remove from favorites in place
        favorites.splice(existingIndex, 1);
        updateSummary(favorites, favoritesList, favoritesTotal);
        button.textContent = "Add to Favorites";
        card.classList.remove("highlight");
    } else {
        // Add to favorites
        favorites.push({ name: dishName, price: price });
        updateSummary(favorites, favoritesList, favoritesTotal);
        button.textContent = "Remove from Favorites";
        card.classList.add("highlight");
    }
}

// Updates the favorites summary list and total 
function updateSummary(favorites, favoritesList, favoritesTotal) {
    // Clear current list
    favoritesList.innerHTML = "";
    let total = 0;

    // Rebuild favorites list and calculate total
    favorites.forEach(function (item) {
        const li = document.createElement("li");
        li.textContent = item.name + " — $" + item.price.toString();
        favoritesList.appendChild(li);
        total += item.price;
    });

    // Update total displayed in summary
    favoritesTotal.textContent = total.toString();
}


