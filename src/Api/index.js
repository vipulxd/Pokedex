import axios from 'axios'
export const api = 'https://pokeapi.co/api/v2/pokemon'


export function getPokemons(){
    return  axios.get(`${api}`)
}
export function getPokemonByLink(link){
    return axios.get(link)
}
export function getPokemonByName(name){
    return axios.get(`${api}/${name}`)
}