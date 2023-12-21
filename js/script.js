document.getElementById("search").addEventListener("click",() => {
    const error = document.getElementById("error");
    error.innerHTML='';
    error.className='';

    let pokemonName = document.getElementById("pokemonName").value;
    //Verifica que el nombre contenga solo letras
    let validName = /^[a-zA-Z]+$/.test(pokemonName);

    if(validName) {
        printPokemonInfo(pokemonName.toLowerCase());
    }else {
        error.className="p-3 mb-2 bg-warning text-dark rounded";
        error.innerHTML="¡Nombre inválido!";
        const pokemonInfo = document.getElementById("pokemonInfo");
        pokemonInfo.innerHTML="";
    }
});

function printPokemonInfo(pokemonName) {
    const url =`https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
    
    fetch(url)
    .then(response => {
        switch(response.status) {
            case 200:
                return response.json();
            case 404:
                const error = document.getElementById("error");
                error.className="p-3 mb-2 bg-warning text-dark rounded";
                error.innerHTML="¡No se encontró ese pokémon!";
                break;
        }  
    })
    .then(data =>{

        const pokemonInfo = document.getElementById("pokemonInfo");
        pokemonInfo.innerHTML="";

        const weightParagraph = document.createElement('p');
        weightParagraph.innerHTML = `<b>Peso: </b> ${data.weight}`;

        const typeParagraph = document.createElement('p');
        typeParagraph.innerHTML =  `<b>Tipo: </b> ${data.types[0].type.name}`;
        
        const movesParagraph = document.createElement('p');
        movesParagraph.innerHTML =  `<b>Cantidad de movimientos: </b> ${data.moves.length}`;
        
        const spritesParagraph = document.createElement('p');
        spritesParagraph.innerHTML= `<b>Imágenes: </b>`;

        const firstFrontImage = document.createElement('img');
        const secondFrontImage = document.createElement('img');
        firstFrontImage.src = data.sprites.front_default;
        firstFrontImage.alt="front_default";
        firstFrontImage.className="img-fluid";

        secondFrontImage.src = data.sprites.front_shiny;
        secondFrontImage.alt="front_shiny";
        secondFrontImage.className="img-fluid";

        pokemonInfo.appendChild(weightParagraph);
        pokemonInfo.appendChild(typeParagraph);
        pokemonInfo.appendChild(movesParagraph);
        pokemonInfo.appendChild(spritesParagraph);
        pokemonInfo.appendChild(firstFrontImage);
        pokemonInfo.appendChild(secondFrontImage);
    
    })
    .catch(error => {
        console.log(error);
    });
}



