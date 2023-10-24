const pokemonList = document.getElementById('pokemons');
const loadMoreButton = document.getElementById('loadMoreButton')
const limit = 10
let offset = 0
const maxRecord = 151
/* 
// retorna uma promise (promessa de um resultado, do response). get por padrão, devolve uma promisse de response
pokeApi.getPokemons().then((pokemons = []) => { // após a requisição ser concluída, começa a função com uma lista vazia por padrão
    pokemonList.innerHTML += pokemons.map(convertPokemonToLi).join('');//
}) // lista de pokemons em formato array */



// const listItens = [];// criando uma lista
// pokemons.map()
// for (let i = 0; i < pokemons.length; i++) { // loop que 
//     const pokemon = pokemons[i];
//     listItens.push(convertPokemonToLi(pokemon));
// }
// console.log(listItens);

function loadMoreItems(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `
                <li class="${pokemon.type}">
                    <a class="no-link-style" href="#">
                        <span class="number">#${pokemon.number}</span>
                        <span class="name">${pokemon.name}</span>
                        <div class="details">
                            <div class="poke-types">
                                ${pokemon.types.map((type) => `<span class="type">${type}</span>`).join('')}
                            </div>
                            <div class="pokemon-img">
                                <img src="${pokemon.photo}" alt="${pokemon.name}">
                            </div>
                        </div>
                        <div class="pokeball-img">
                            <img src="assets/poke_ball_icon.png" alt="Pokeball background image">
                        </div>
                    </a>
                </li>
        `).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadMoreItems(offset, limit)
loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecord = offset + limit
    if (qtdRecord >= maxRecord) {
        const newLimit = maxRecord - offset
        loadMoreItems(offset, newLimit)
        loadMoreButton.parentElement.removeChild(loadMoreButton)
        return 
    } else {
        loadMoreItems(offset, limit)
    }
})