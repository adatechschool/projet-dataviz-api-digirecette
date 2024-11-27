const buttonContainer = document.getElementById("buttonContainer")
const buttonValider = document.getElementById("buttonValider")
const afficheNomDeRecette = document.getElementById("nomDeRecette")
const afficheImages = document.getElementById("images")
let selectedIngredient = new Set()

let listeIngredients = ["carrots", "tomatoes", "steaks", "spagettis","potatoes", 
    "fish", "butter", "egg york","Brocoli","olives","flour","cucumber"]
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
async function displayRecipes (url){
    const recipesReponse = await fetch(url)
    const recipesResult = await recipesReponse.json()
    //afficheNomDeRecette.innerHTML = recipesResult[0].title
    console.log(recipesResult)
    for ( let index = 0; index < recipesResult.length; index++){
        let NomDeRecette = document.createElement('h3')
        NomDeRecette.innerHTML = recipesResult[index].title
        afficheNomDeRecette.appendChild(NomDeRecette)
    }
    //afficheNomDeRecette.innerHTML = recipesResult[0].title
    //console.log(result[0].missedIngredients[0])
}
buttonValider.addEventListener("click",() => {
    // on masque le première page 
    document.getElementById("ingredientsPage").style.display ="none"
    document.getElementById("recipesPage").style.display="flex"

    const selectedArray = Array.from(selectedIngredient); // Convertit le Set en tableau
    //console.log("Ingrédients choisis :", selectedArray)
    const ingredientsGroupe = selectedArray.map((ingredient) => encodeURIComponent(ingredient)).join(",")
    console.log("ingredient regroupée:",ingredientsGroupe)
    console.log(remplaceIngredient(ingredientsGroupe))
    displayRecipes(remplaceIngredient(ingredientsGroupe)) 
    document.getElementById('texte').innerText = "Voici les plats possibles avec vos ingrédients"
    //afficheNomDeRecette.innerHTML = recipesResult[0].title
})
function remplaceIngredient(ingredientsChoisi){
    return  `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientsChoisi}&number=10&limitLicense=true&ranking=1&ignorePantry=false&apiKey=04aeff9c7aa54db4add1b4bf65923c49`
}

//console.log(remplaceIngredient()) 