const pokeApi = {}
const offset = 0;
const limit = 10;
pokeApi.getPokemons = function(offset, limit) { // criando o método getPokemons para pokeApi
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    return fetch(url)
        .then(function (response) { // quando dar o fetch, retorna response
            responseJson = response.json(); // transformando response em json para que possa ser manipulado
            return responseJson;
        }) // após isso retorna response em json para a próxima função
        .then(function (jsonBody) {
            return jsonBody.results; // retorna para a prox função apenas a parte dos resultados do jsonBody, que é o que interessa
        })
        .catch(function (error) {
            console.log(error)
        })
        .finally(function () {
            console.log('Requisição concluida!');
        })
}


function convertendoJsonPokemonToHtml(pokemon) {
    return `
        <li class="grass">
            <a class="no-link-style" href="#">
                <span class="number">${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
                <div class="details">
                    <div class="poke-types">
                        <span class="type">Grass</span>
                    </div>
                    <div class="pokemon-img">
                        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg" alt="${pokemon.name}">
                    </div>
                </div>
                <div class="pokeball-img">
                    <img src="assets/img/poke_ball_icon.png" alt="Pokeball background image">
                </div>
            </a>
        </li>
    `
}

const listaPokemonOl = document.getElementById('listaPokemons');

pokeApi.getPokemons()
.then(function (pokemons = [] ) { // apenas para caso não retorne nada, estarei deixando uma lista criada por padrão
    const newList = pokemons.map(function (pokemon){ // método map substitui um for, é usado para percorrer toda lista
            return convertendoJsonPokemonToHtml(pokemon);
        })
    const newHtml = newList.join('') // pega a lista newList, onde estão a lista de todos os elementos htmls com todos os pokemons, e junta nesta lista newHtml
    listaPokemonOl.innerHTML = newHtml // joga no html da listaPokemonOl
})

