const buttonContainer = document.getElementById("buttonContainer")
const buttonValider = document.getElementById("buttonValider")
const afficheNomDeRecette = document.getElementById("nomDeRecette")
const buttonNouvelleRecette = document.getElementById("nouvelleRecette")
const buttonRetour = document.getElementById("buttonRetour")
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
let nombreRecetteIndex = 3
buttonNouvelleRecette.addEventListener("click", ()=>{
    nombreRecetteIndex+=3;
    // console.log(nombreRecette, "ceci est un test")
    if(nombreRecetteIndex<recipesResult.length){
    displayRecipes(remplaceIngredient(ingredientsGroupe),nombreRecetteIndex)
    }else if(nombreRecetteIndex = recipesResult.length){
    buttonNouvelleRecette.style.display="none"
    buttonRetour.style.display = "inline-block"
    displayRecipes(remplaceIngredient(ingredientsGroupe),nombreRecetteIndex)
    }else{
    }
})
buttonRetour.addEventListener("click", () => {
    document.getElementById("recipesPage").style.display="none"
    document.getElementById("ingredientsPage").style.display ="inline-block"
})

function remplaceIngredient(ingredientsChoisi){
    return  `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientsChoisi}&number=12&limitLicense=true&ranking=1&ignorePantry=false&apiKey=7061bca4946b450486a78ee6c6b7e398`
}
//console.log(recipesAleatoire(recipesResult))