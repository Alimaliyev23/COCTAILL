class CocktailAPI {
    path = 'https://www.thecocktaildb.com/api/json/v1/1'
    async randomCocktail () {
        return fetch(`${this.path}/random.php`)
            .then(resp => resp.json())
            .then(json => json.drinks[0] )
    }
    async listCocktailByLetter (letter = 'a') {
        return fetch(`${this.path}/search.php?f=${letter}`)
            .then(resp => resp.json())
            .then(json => json.drinks)
    }
}

export default CocktailAPI