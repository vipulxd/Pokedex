import React from 'react'
import './App.css';
import {api, getPokemonByLink, getPokemons} from "./Api";
import {PokeCard} from "./components/PokeCard";


function App() {
    const [state, setState] = React.useState({
        next: null,
        previous: null,
        data: [],
        currentlink: api
    })
    React.useEffect(() => {
        getPokemons().then(response => {
            setState({
                ...state,
                data: response.data.results,
                next: response.data.next,
                previous: response.data.previous,
            })
        })
    }, [])

    function handleFilter(name) {
        getPokemonByLink(state.currentlink).then(response => {
            setState({
                ...state,
                data: response.data.results.filter(item => item.name.includes(name))
            })
        })
    }

    function getter(link) {
        getPokemonByLink(link).then(response => {
            console.log(response)
            setState({
                ...state,
                data: response.data.results,
                next: response.data.next,
                previous: response.data.previous,
                currentlink: link
            })
        })
    }

    return (
        <>
            <div className={'container'}>
                <div className={'search-cnt'}>
                    <div><input className={'form__input'} type={'text'} onInput={(e) => handleFilter(e.target.value)}
                                placeholder={'Search pokemon ...'}/>
                    </div>
                </div>
                <div className={'card-cnt'}>
                    {state.data.length > 0 && state.data.map(item => (
                            <PokeCard data={item}/>
                        )
                    )
                    }
                </div>
                <div className={'btn-cnt'}>
                    <button className={'btn'} style={{width: "300px"}} onClick={() => getter(state.previous)}
                            disabled={!state.previous}>PREVIOUS
                    </button>
                    <button className={'btn'} style={{width: "300px"}} onClick={() => getter(state.next)}>NEXT</button>
                </div>
            </div>
        </>
    );
}

export default App;
