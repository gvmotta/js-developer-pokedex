const pokeApi = {}; // criando a variável

function convertPokemonApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
    pokemon.types = types
    pokemon.type = type
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default
    console.log(pokemon.photo);

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url).
        then((response) => response.json()).
        then(convertPokemonApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 10) => { // criando uma função atrelada à um método, que já traz variável offset e limit
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`; // variável com offset e limite atrelados à variável
   
    return fetch(url) // função retornando uma requisição
        .then((response) => response.json()) // quando a requisição terminar, converte os dados da resposta para um objeto javascript
        .then((jsonBody) => jsonBody.results) 
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}
