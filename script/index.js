// console.log("Hello World");

const categoriesContainer = document.getElementById("categoriesContainer");
const treesContainer = document.getElementById("treesContainer");
const loadingSpinner = document.getElementById("loadingSpinner");

function showLoading() {
    loadingSpinner.classList.remove("hidden");
    loadingSpinner.classList.add("loadingSpinner");
    treesContainer.innerHTML = "";

}

function hideLoading() {
    loadingSpinner.classList.add("hidden");
    loadingSpinner.classList.remove("loadingSpinner");

}


async function loadCategories() {
    const url = "https://openapi.programming-hero.com/api/categories";

    // async await

    const response = await fetch(url);
    const data = await response.json();
    // console.log(data);
    // console.log(categoriesContainer);
    data.categories.forEach(category => {
        console.log(category);
        const btn = document.createElement("button");
        btn.className = "btn btn-outline w-full"
        btn.textContent = category.category_name;
        btn.onclick = () => selectCategory(category.id, btn);

        categoriesContainer.appendChild(btn);
    });

}

async function selectCategory(categoryId, btn) {
    console.log(categoryId, btn);
    showLoading();
    // update active button style

    const allButtons = document.querySelectorAll("#categoriesContainer button, #allTreesBtn");
    // console.log(allButtons);
    allButtons.forEach(btn => {
        btn.classList.remove("btn-primary");
        btn.classList.add("btn-outline");
    });

    btn.classList.add("btn-primary");
    btn.classList.remove("btn-outline");

    const response = await fetch(`https://openapi.programming-hero.com/api/category/${categoryId}`)
    const data = await response.json();
    console.log(data);
    displayTrees(data.plants);

}

allTreesBtn.addEventListener("click", () => {
    // update active button style

    showLoading();
    const allButtons = document.querySelectorAll("#categoriesContainer button, #allTreesBtn");
    // console.log(allButtons);
    allButtons.forEach(btn => {
        btn.classList.remove("btn-primary");
        btn.classList.add("btn-outline");
    });

    allTreesBtn.classList.add("btn-primary");
    allTreesBtn.classList.remove("btn-outline");

    loadTrees () 

})

async function loadTrees() {
    showLoading();
    const response = await fetch("https://openapi.programming-hero.com/api/plants")
    const data = await response.json();
    hideLoading()
    displayTrees(data.plants);
}

function displayTrees(trees) {
    console.log(trees)
    trees.forEach(tree => {
        console.log(tree);
        const card = document.createElement("div")
        card.className = "card bg-white shadow-sm mx-auto";
        card.innerHTML = `
        
            <figure>
                <img src="${tree.image}"
                    alt="${tree.name}" 
                    title ="${tree.name}"
                    class = "h-50 w-full object-cover"
                    />
            </figure>
            <div class="card-body">
                <h2 class="card-title">${tree.name}</h2>
                <p class="line-clamp-2">${tree.description}</p>
                <div class="badge badge-outline badge-success">${tree.category}</div>
                <div class="card-actions flex justify-between items-center mt-2">
                    <h2 class="text-xl font-bold text-success">$${tree.price}</h2>
                    <button class="btn btn-primary">${"Cart"}</button>
                </div>
            </div>
        `;

        treesContainer.appendChild(card);
    })
    hideLoading()

}

loadCategories()
loadTrees()

