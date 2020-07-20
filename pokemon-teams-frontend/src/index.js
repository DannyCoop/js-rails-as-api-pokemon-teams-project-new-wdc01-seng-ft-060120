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
        
        let addButton = document.createElement('button')
        addButton.dataset.trainerId = trainer.id
        addButton.innerText = 'Add Pokemon'
        div.appendChild(addButton)

        addButton.addEventListener('click', (e) => {
           let config = {
               method: 'POST',
               headers: {
                'Content-Type': 'application/json'
               },
               body: JSON.stringify({
                   'trainer_id': trainer.id  
               })
           }
           fetch(POKEMONS_URL, config)
           .then(res => res.json())
           .then(data => {console.log(data)})
           
           
            //  if (teamList.childElementCount < 6) {
            //      addButton.disabled = false;
            //      console.log('hello')
            //  }
            // console.log(teamList.childElementCount)
        })

        let teamList = document.createElement('ul')
        div.appendChild(teamList)
        
        
        for(const pokemon of trainer.pokemons) {
            let li = document.createElement('li')
            let speciesAndNickname = `${pokemon.species}, ${pokemon.nickname}`
            li.innerText = speciesAndNickname;

            let releaseButton = document.createElement('button')
            releaseButton.className = 'release'
            releaseButton.innerText = 'Release'
            releaseButton.dataset.pokemonId = pokemon.id;
            li.appendChild(releaseButton)
            teamList.appendChild(li)
        }
    }

    getTrainers()
})

