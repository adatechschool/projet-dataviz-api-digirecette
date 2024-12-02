const buttonContainer = document.getElementById("buttonContainer")
const buttonValider = document.getElementById("buttonValider")
const afficheNomDeRecette = document.getElementById("nomDeRecette")
const buttonNouvelleRecette = document.getElementById("nouvelleRecette")
const buttonRetour = document.getElementById("buttonRetour")
const frigidaire = document.getElementById("frigo")
let selectedIngredient = new Set()

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
let imagesFrigo = [,
    {title:"frigo_fermé", image:"images/frigo-fermé.png"},
    {title:"frigo_ouvert", image:"images/frigo-ouvert.png"}
]
listeIngredients.ingredients.forEach(ingredient => {
    const optionIngredient = document.createElement('button')
    optionIngredient.innerHTML = `<img src = "${ingredient.image}" class= "ingredients"/>`
    buttonContainer.appendChild(optionIngredient)

    optionIngredient.addEventListener("click", () => {
        //console.log(optionIngredient.innerText)
        if (selectedIngredient.has(ingredient.text)) {
            selectedIngredient.delete(ingredient.text)
        } else {
            selectedIngredient.add(ingredient.text)
        }
        console.log(Array.from(selectedIngredient))
    }) 
})
let recipesResult = ""
async function displayRecipes (url,index){
    const recipesReponse = await fetch(url)
    recipesResult = await recipesReponse.json()
    //console.log(recipesResult)
    afficheNomDeRecette.innerHTML=""

    for (let i = 0; i < index; i++){
        const recipeElement = document.createElement('div')
        recipeElement.innerHTML =
        `<button>
        <p>${recipesResult[i].title}</p> 
        <img src = "${recipesResult[i].image}"/>
        </button>`
    afficheNomDeRecette.appendChild(recipeElement)
    } 
    }
buttonValider.addEventListener("click",() => {
    // on masque le première page 
    document.getElementById("ingredientsPage").style.display ="none"
    document.getElementById("recipesPage").style.display="inline-block"

    const selectedArray = Array.from(selectedIngredient); // Convertit le Set en tableau
    console.log("Ingrédients choisis :", selectedArray)
    ingredientsGroupe = selectedArray.map((ingredient) => encodeURIComponent(ingredient)).join(",")
    console.log("ingredient regroupée:",ingredientsGroupe)
    displayRecipes(remplaceIngredient(ingredientsGroupe),3) 
    document.getElementById('texte').innerText = "Voici les plats possibles avec vos ingrédients"
})
frigidaire.addEventListener('click', function () {
    frigidaire.src = "images/frigo-ouvert.png";
    frigidaire.style= "width: 400px"
  })
let nombreRecetteIndex = 3
buttonNouvelleRecette.addEventListener("click", ()=>{
    nombreRecetteIndex += 3
    if (nombreRecetteIndex < recipesResult.length){
        displayRecipes(remplaceIngredient(ingredientsGroupe),nombreRecetteIndex)
    }else if(nombreRecetteIndex = recipesResult.length){
        buttonNouvelleRecette.style.display = "none"
        buttonRetour.style.display = "inline-block"
        displayRecipes(remplaceIngredient(ingredientsGroupe),nombreRecetteIndex)
    } else {
    }
})
buttonRetour.addEventListener("click", () => {
    document.getElementById("ingredientsPage").style.display ="inline-block"
    document.getElementById("recipesPage").style.display="none"
})
function remplaceIngredient(ingredientsChoisi){
    return  `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientsChoisi}&number=12&limitLicense=true&ranking=1&ignorePantry=false&apiKey=04aeff9c7aa54db4add1b4bf65923c49`
}
