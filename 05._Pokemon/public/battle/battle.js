//task create a fetch to /battlepokemon

fetch('/battlepokemon')
    .then(response => {
        if (response.ok) {
            return response.json();
        }
    })
    .then(result => {
        pokemonName = result.data.name;
        pokemonSpriteUrl = result.data.imgUrl;
        pokemonStrength = result.data.strength;

        const imageWrapper = document.getElementById('image-wrapper');

        imageWrapper.innerHTML = `
        <img id="pokemon-image" src="${pokemonSpriteUrl}" alt="${pokemonName}">`;
        document.getElementById('pokemon-name').innerText = pokemonName;
        document.getElementById('pokemon-strength').innerText = 'Strength: ' + pokemonStrength;
    });
