async function displayRecipes (){
    const reponse = await fetch("https://api.spoonacular.com/recipes/findByIngredients?ingredients=carrots,tomatoes&number=10&limitLicense=true&ranking=1&ignorePantry=false&apiKey=04aeff9c7aa54db4add1b4bf65923c49")
    const result = await reponse.json()
    //console.log(result)
    console.log(result[0].missedIngredients[0])
}
displayRecipes()