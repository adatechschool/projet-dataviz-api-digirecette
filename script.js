const buttonContainer = document.getElementById("buttonContainer")
const buttonContainer2 = document.getElementById("buttonContainer2")
const buttonContainer3 = document.getElementById("buttonContainer3")
const buttonCook = document.getElementById("buttonValider")
const recetteContainer = document.getElementById("recetteContainer")
const buttonNouvelleRecette = document.getElementById("nouvelleRecette")
const buttonRetour = document.getElementById("buttonRetour")
const fridgeOpenningToggle = document.getElementById("frigo")
const loader = document.getElementById("loading")
const apiKey = "2d65b549176d4a439deba01412837ab9"
const recipePerPage = 6
let selectedIngredient = new Set()
let currentRecipes = new Array()

let listeIngredients = {
    ingredients: [
{text:"carrots", image:"images/carrotes3.png"},
{text:"tomatoes", image:"images/tomatoes.png"},
{text:"steaks", image:"images/steak.png"},
{text:"spagettis", image:"images/spagettis.png"},
{text:"potatoes", image:"images/potatoes.png"},
{text:"fish", image:"images/fish.png"},
{text:"butter", image:"images/butter.png"},
{text:"egg york", image:"images/egg-york.png"},
{text:"broccoli", image:"images/brocoli.png"},
{text:"olives", image:"images/olives.png"},
{text:"flour", image:"images/flour.png"},
{text:"cucumber", image:"images/cucumber.png"}
]}
buttonCook.disabled = true
let buttonContainers = [buttonContainer, buttonContainer2, buttonContainer3]
listeIngredients.ingredients.forEach((ingredient, index) => {
    let container = buttonContainers[index % 3]
    const optionIngredient = document.createElement('button')
    optionIngredient.innerHTML = `<img src = "${ingredient.image}" class= "${ingredient.text}"/>`
    container.appendChild(optionIngredient)
        //ingredient.classList.add("carrots","tomatoes","steaks","spagettis","potatoes","fish","butter","egg york","broccoli","olives","flour","cucumber")
    
    optionIngredient.addEventListener("click", () => {
        buttonCook.disabled = false
        optionIngredient.classList.add("check")
            //console.log(optionIngredient.innerText)
        if (selectedIngredient.has(ingredient.text)) {
            selectedIngredient.delete(ingredient.text)
            optionIngredient.classList.remove("check")
        } else {
            selectedIngredient.add(ingredient.text)
        }
        console.log(Array.from(selectedIngredient))
    }) 
    
})
buttonCook.addEventListener("click",() => {
    // on masque le première page 
    document.getElementById("ingredientsPage").style.display = "none"
    document.getElementById("recipesPage").style.display="inline-block"

    const selectedArray = Array.from(selectedIngredient); // Convertit le Set en tableau
    //console.log("Ingrédients choisis :", selectedArray)
    ingredientsGroupe = selectedArray.map((ingredient) => encodeURIComponent(ingredient)).join(",")
    //console.log("ingredient regroupée:",ingredientsGroupe)
    document.getElementById('texte').innerText = "Voici les plats possibles avec vos ingrédients"
    loadRecipes(ingredientsGroupe)
})
buttonContainers.forEach(container => {
    container.style.display ="none"
})
let isFridgeOpen = false
fridgeOpenningToggle.addEventListener('click',() => {
    if(isFridgeOpen){
        fridgeOpenningToggle.src = "images/frigo-fermé.png"
        fridgeOpenningToggle.style= "width: 500px"
        isFridgeOpen = false
        buttonContainers.forEach(container => {
            container.style.display ="none"
        })
        
    } else {
        fridgeOpenningToggle.src = "images/frigo-ouvert4.png";
        fridgeOpenningToggle.style= "width: 870px"
        isFridgeOpen = true
        buttonContainers.forEach(container => {
            container.style.display ="inline-block"
        })
  }
})
let recipePageIndex = 0
buttonNouvelleRecette.addEventListener("click", ()=>{
    recipePageIndex++
    let pageMinIndex = recipePageIndex * recipePerPage
    let pageMaxIndex = (recipePageIndex + 1) * recipePerPage
    if (pageMaxIndex < currentRecipes.length){
        displayRecipes()
        buttonNouvelleRecette.style.display = "inline-block"
        buttonRetour.style.display = "none"
    } else {
        displayRecipes()
        buttonNouvelleRecette.style.display = "none"
        buttonRetour.style.display = "inline-block"
    }
})
buttonRetour.addEventListener("click", () => {
    buttonCook.disabled = true
    document.getElementById("ingredientsPage").style.display = "inline-block"
    document.getElementById("recipesPage").style.display = "none"
    buttonNouvelleRecette.style.display = "inline-block"
    buttonRetour.style.display = "none"
})

async function loadRecipes(ingredientsChoisi) {
    loader.style.display = "inline-block"
    let url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientsChoisi}&number=12&limitLicense=true&ranking=1&ignorePantry=false&apiKey=${apiKey}`
    const recipesReponse = await fetch(url)
    currentRecipes = await recipesReponse.json()
    loader.style.display = "none"
    console.log(currentRecipes)
    recipePageIndex = 0

    recetteContainer.innerHTML=""
    console.log(currentRecipes)
    displayRecipes()
}
function displayRecipes() {
    recetteContainer.innerHTML = ""
    console.log(recipePageIndex)
    for (let i = recipePageIndex * recipePerPage; (i < currentRecipes.length) && (i < (recipePageIndex + 1) * recipePerPage); i++){
        const recipeElement = document.createElement('button')
        recipeElement.innerHTML = 
        `<p>${currentRecipes[i].title}</p> 
        <img src = "${currentRecipes[i].image}"/>
        `
        recetteContainer.appendChild(recipeElement)
        recipeElement.classList.add("recipeElementContainer")
    } 
}