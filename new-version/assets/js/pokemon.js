const pokemonSpecified = document.getElementById("pokemonSpecified");
// Recuperar parâmetros da URL
const urlParams = new URLSearchParams(window.location.search);
const url = urlParams.get("url");
console.log(url);

function allTheTypes(pokemonTypes) {
    return pokemonTypes.map(function (type){
        return `
            <span class="type ${type.type.name}">${type.type.name}</span>
        `
        })
}

function allTheTypesTd(pokemonTypes) {
    return pokemonTypes.map(function (type){
        return `
            <td class="capitalize">${type.type.name}</td>
        `
        })
}

function allTheAbilities(pokemonAbilities) {
    return pokemonAbilities.map(function (ability) {
        return `
            <td class="capitalize">${ability.ability.name}</td>
        `
    })
}

fetch(url)
    .then(function (response) { // quando dar o fetch, retorna response
        responseJson = response.json(); // transformando response em json para que possa ser manipulado
        return responseJson;
    }).then(function (pokemon) {
        return `
        <section class="${pokemon.types[0].type.name}">
            <header>
                <a href="./"><i class="fa-solid fa-arrow-left"></i></a>
                <i class="fa-regular fa-heart"></i>
            </header>
            <div class="pokemon-info">
                <div class="top-side">
                    <h1 class="capitalize poke-name">${pokemon.name}</h1>
                    <div class="col">
                        <div class="left-side">
                            <div class="poke-types">
                                ${allTheTypes(pokemon.types).join('')}
                            </div>
                        </div>
                        <div class="right-side">
                            <p class="number">#${pokemon.order}</p>
                        </div>
                    </div>
                    <img src="${pokemon.sprites.other.dream_world.front_default}" alt="${pokemon.name}" class="poke-img">
                    <img class="pokeball-img" src="assets/img/poke_ball_icon.png" alt="">
                </div>
                <div class="bot-side">
                    <nav class="nav-bar">
                        <p class="about">About</p>
                        <p class="attacks">Ataques</p>
                        <p class="evolutions">Evoluções</p>
                        <p class="about">About</p>
                    </nav>
                    <table class="first-table">
                        <tbody>
                        <tr>
                            <td class="info">Espécie(s):</td>
                            ${allTheTypesTd(pokemon.types).join('')}
                        </tr>
                        <tr>
                            <td class="info">Altura:</td>
                            <td>${pokemon.height} metros</td>
                        </tr>
                        <tr>
                            <td class="info">Peso:</td>
                            <td>${pokemon.weight} kilogramas</td>
                        </tr>
                        <tr>
                            <td class="info">Habilidades:</td>
                            ${allTheAbilities(pokemon.abilities).join('')}
                        </tr>
                        </tbody>
                    </table>
                    <span class="breeding">Breeding</span>
                    <table class="second-table">
                        <tbody>
                            <tr>
                                <td class="info">Gender</td>
                                <td>Masc</td>
                                <td>Fem</td>
                            </tr>
                            <tr>
                                <td class="info">Egg Campus</td>
                                <td>Monster</td>
                            </tr>
                            <tr>
                                <td class="info">Egg Cycle</td>
                                <td>Grass</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
        `
    }).then(function (newHtml) {
        pokemonSpecified.innerHTML += newHtml;
    })