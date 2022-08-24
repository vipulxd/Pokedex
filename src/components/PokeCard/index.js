import React from 'react'
import './index.css'
import 'react-responsive-modal/styles.css';
import {Modal} from "react-responsive-modal";
import {getPokemonByName} from "../../Api";

export function PokeCard({data}) {
    const [da, setData] = React.useState(
        {
            name: null,
            weight: null,
            height: null,
            url: null
        }
    )

    function getID(name) {
        return name.charAt(name.length - 2);
    }

    function handleOpen() {
        getPokemonByName(data.name).then(response => {
            setData({
                name: response.data.name,
                weight: response.data.weight,
                height: response.data.height,
                url: `https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${getID(data.url)}.svg`
            })

        })
    }

    const [open, setOpen] = React.useState(false);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
    return (
        <>
            <div className={'-card'}>
                <div className={'image-cnt'}>
                    <img
                        src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${getID(data.url)}.svg`}
                        alt={data.name}/>
                </div>
                <div className={'name-cnt'}>{data.name}</div>

                <div className={'open-cnt'}>
                    <button className={'btn'} onClick={() => {
                        onOpenModal();
                        handleOpen();
                    }
                    }> SHOW DETAILS
                    </button>
                </div>
            </div>
            <Modal open={open} onClose={onCloseModal} center>
                <div className={'modal-cnt'}>

                    <div style={{padding: '40px'}}>
                        <img src={da.url} alt={data.name}/>
                    </div>
                    <div className={'detail-cnt'}>
                        <div className={'label'}>Name</div>
                        <span>{da.name}</span>
                        <div className={'label'}>Weight</div>
                        <span>{da.weight}</span>
                        <div className={'label'}>Height</div>
                        <span>{da.height}</span>
                    </div>
                </div>
            </Modal>
        </>
    )
}