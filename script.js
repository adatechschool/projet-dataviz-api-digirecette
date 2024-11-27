const buttonContainer = document.getElementById("buttonContainer")
const buttonValider = document.getElementById("buttonValider")
const afficheNomDeRecette = document.getElementById("recette")
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
buttonValider.addEventListener("click",() => {
    const selectedArray = Array.from(selectedIngredient); // Convertit le Set en tableau
    console.log("Ingrédients choisis :", selectedArray)
    const ingredientsGroupe = selectedArray.map((ingredient) => encodeURIComponent(ingredient)).join(",")
    console.log("ingredient regroupée:",ingredientsGroupe)
    console.log(remplaceIngredient(ingredientsGroupe))
    displayRecipes(remplaceIngredient(ingredientsGroupe))   
})
async function displayRecipes (url){
    const reponse = await fetch(url)
    const result = await reponse.json()
    afficheNomDeRecette.innerHTML = result[0].title
    afficheNomDeRecette.innerHTML += "<img src = result[0].image />"
    console.log(result)
    //console.log(result[0].missedIngredients[0])
}
//displayRecipes()
function remplaceIngredient(ingredientsGroupé){
    return  `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientsGroupé}&number=10&limitLicense=true&ranking=1&ignorePantry=false&apiKey=04aeff9c7aa54db4add1b4bf65923c49`
}

console.log(remplaceIngredient()) 