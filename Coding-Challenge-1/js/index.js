
function fetchPokemon(pokemon){
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemon}/`;

    let settings = {
        methods : 'GET'
    };

    fetch(url, settings)
        .then(resp => {
            if(resp.ok){
                return resp.json();
            }

            throw new Error(resp.statusText);
        })
        .then(respJSON => {
            console.log(respJSON);
            displayPokemon(respJSON);
        })
        .catch(err => {
            console.log(err);
            displayError(err);
        });
}

function displayError(data){
    alert("Pokemon not found");
}

function displayPokemon(data){
    let resultSection = document.querySelector(".js-search-results");

    resultSection.innerHTML = `
        <div>Name: ${data.name}</div>
        <img src="${data.sprites.front_default}"/>
    `;

    resultSection.innerHTML += "<h3>Moves:</h3><ul>";
    data.moves.forEach(move => {
        resultSection.innerHTML += `<li>${move.move.name}</li>`;
    });
    resultSection.innerHTML += "</ul>";

    resultSection.innerHTML += "<h3>Stats:</h3><ul>";
    data.stats.forEach(stat => {
        resultSection.innerHTML += `<li>${stat.stat.name} : ${stat.base_stat}</li>`;
    });
    resultSection.innerHTML += "</ul>";

}

function watchForm(){
    let submitButton= document.querySelector(".submitButton");

    submitButton.addEventListener('click', (event)=> {
        event.preventDefault();

        let pokemon = document.querySelector('#query').value;
        console.log(pokemon);

        if(pokemon != "" && pokemon != null){
            fetchPokemon(pokemon);
        }
    })
}

function init(){
    watchForm();
}

init();
