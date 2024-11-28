const buttonContainer = document.getElementById("buttonContainer")
const buttonValider = document.getElementById("buttonValider")
const afficheNomDeRecette = document.getElementById("nomDeRecette")
const buttonNouvelleRecette = document.getElementById("nouvelleRecette")
let selectedIngredient = new Set()

let listeIngredients = ["carrots", "tomatoes", "steaks", "spagettis","potatoes", 
    "fish", "butter", "egg york","broccoli","olives","flour","cucumber"]
listeIngredients.forEach(ingredient => {
    const optionIngredient = document.createElement('button')
    optionIngredient.innerHTML = `<p> ${ingredient} </p>`
    buttonContainer.appendChild(optionIngredient)

    optionIngredient.addEventListener("click", () => {
        //console.log(optionIngredient.innerText)
        if (selectedIngredient.has(ingredient)) {
            selectedIngredient.delete(ingredient)
        } else {
            selectedIngredient.add(ingredient)
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
    //recipesResult.forEach(ingredient => {
    //let indexDeTrois = recipesResult.length/4
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
    document.getElementById("recipesPage").style.display="flex"

    const selectedArray = Array.from(selectedIngredient); // Convertit le Set en tableau
    //console.log("Ingrédients choisis :", selectedArray)
    ingredientsGroupe = selectedArray.map((ingredient) => encodeURIComponent(ingredient)).join(",")
    //console.log("ingredient regroupée:",ingredientsGroupe)
    //console.log(remplaceIngredient(ingredientsGroupe))
    displayRecipes(remplaceIngredient(ingredientsGroupe),3) 
    document.getElementById('texte').innerText = "Voici les plats possibles avec vos ingrédients"
    //console.log(recipesAleatoire(recipesResult))
})
buttonNouvelleRecette.addEventListener("click", ()=>{
    displayRecipes(remplaceIngredient(ingredientsGroupe),6)
})

function remplaceIngredient(ingredientsChoisi){
    return  `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientsChoisi}&number=12&limitLicense=true&ranking=1&ignorePantry=false&apiKey=04aeff9c7aa54db4add1b4bf65923c49`
}
//console.log(recipesAleatoire(recipesResult))