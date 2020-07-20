const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

// When a user loads the page, they should see all trainers, 
// with their current team of Pokemon.

document.addEventListener("DOMContentLoaded", () => {
    const getTrainers = () => {
        fetch(TRAINERS_URL)
        .then(res => res.json())
        .then(listOfTrainers => {renderCards(listOfTrainers)})
    }

    
    const renderCards = (listOfCards) => {
        listOfCards.forEach(trainer => renderCard(trainer) );
    }

    const renderCard = (trainer) => {
        let main = document.querySelector('main')
        
        let div = document.createElement('div')
        div.className = 'card'
        div.dataset.id = trainer.id
        main.appendChild(div)

        let p = document.createElement('p')
        p.innerText = trainer.name;
        div.appendChild(p)
        
        let button = document.createElement('button')
        button.dataset.trainerId = trainer.id
        button.innerText = 'Add Pokemon'
        div.appendChild(button)

        let teamList = document.createElement('ul')
        div.appendChild(teamList)
        
        
        for(const pokemon of trainer.pokemons) {
            let li = document.createElement('li')
            let speciesAndNickname = `${pokemon.species}, ${pokemon.nickname}`
            li.innerText = speciesAndNickname;

            let button = document.createElement('button')
            button.classNme = 'release'
            button.dataset.pokemonId = pokemon.id;
            li.appendChild(button)
            teamList.appendChild(li)


        }




    }

    getTrainers()
})

