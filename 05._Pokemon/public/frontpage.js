function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const randomPokemonId = randomIntFromInterval(1, 151);
const pokemonUrl = 'https://pokeapi.co/api/v2/pokemon/';

//https://pokeapi.co/api/v2/pokemon/1

//fetch a random pokemon.

//Http network call to url.
fetch(pokemonUrl + randomPokemonId)
    //Get a response - is a ReadableBytestream - Should be converted to json. Then you get the promise.
    .then(response => {
        if (!response.ok) {
            throw new Error('Error');
        }
        return response.json();
    })
    .then(result => {
        console.log(result);
        pokemonName = result.name.charAt(0).toUpperCase() + result.name.slice(1);
        //pokemonSpriteUrl = result.sprites.versions['generation-i']['red-blue']['back_default'];
        pokemonSpriteUrl = result.sprites.other['official-artwork']['front_default'];
        console.log(pokemonSpriteUrl);
        const imageWrapper = document.getElementById('image-wrapper');
        imageWrapper.innerHTML = `
        <img src="${pokemonSpriteUrl}" alt="${pokemonName}">`;
        document.getElementById('pokemon-name').innerText = pokemonName;
    });
