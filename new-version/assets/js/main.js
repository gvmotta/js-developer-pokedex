const pokeApi = {}
const offset = 0;
const limit = 10;

class Pokemon {
    number;
    name;
    color;
    types = []
}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon();
    pokemon.number = pokeDetail.order;
    pokemon.name = pokeDetail.name;
    const types = pokeDetail.types.map(function (specificType) {
        specificType.type.name;
    })
    const [type] = types;
    pokemon.types = types;
    pokemon.type = type;
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;
    return pokemon;
}

pokeApi.getPokemonDetail = function (pokemon) {
    return fetch(pokemon.url) // caminha por todos os pokemons, e retorna o fetch de cada um deles
        .then(function (response) {
            return response.json(); // transforma o fetch de cada pokemon em json
        }).then(convertPokeApiDetailToPokemon)
}

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
        .then(function (pokemons){
            return pokemons.map(pokeApi.getPokemonDetail) // mapeia todos os fetchs de todos os pokemons, e retorna um json de cada um deles, dessa forma teremos todos os detalhes de todos os pokemons
        }).then(function (detailRequests) {
            return Promise.all(detailRequests); // promise.all recebe um array de promessas e retorna uma nova promessa resolvida
        }).then(function (pokemonsDetails) {
            return pokemonsDetails;
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
                <span class="number">${pokemon.order}</span>
                <span class="name">${pokemon.name}</span>
                <div class="details">
                    <div class="poke-types">
                        ${pokemon.types.map(function (type) {
                            return '<li class="type">${type}</li>';
                        }).join('')}
                    </div>
                    <div class="pokemon-img">
                        <img src="${pokemon.photo}" alt="${pokemon.name}">
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

