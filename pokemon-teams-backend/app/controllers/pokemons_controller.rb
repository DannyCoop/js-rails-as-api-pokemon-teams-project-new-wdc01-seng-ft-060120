class PokemonsController < ApplicationController

    def index
        pokemons = Pokemon.all

        render json: pokemons
    end

    def create 
        pokemon = Pokemon.create!(pokemon_params)

        render json: pokemon
    end

    private

    def pokemon_params
        params.require(:pokemon).permit(:trainer_id, :nickname, :species)
    end
end
