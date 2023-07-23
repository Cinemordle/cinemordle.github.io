import { useState, useEffect } from 'react';
import './styles/Poster.css';

export const PosterComponent = (props) => {

    useEffect(() => {
        if(props.isGameOver) {
            setIsPosterShown(true);
        }
    }, [props.isGameOver]);

    const [isPosterShown, setIsPosterShown] = useState(false);

    return (
        <div className="Poster-Component">
            {
                isPosterShown ? 
                <img
                    style={props.isGameOver ? {height: '40vh', width:'25vh'} : { filter: "grayscale(100%) blur(5px)", height: '40vh', width:'25vh' }}
                    src={props.src}
                    />
                : <div/>
            }
            <button
                onClick={()=>setIsPosterShown(!isPosterShown)}
                className="Poster-Button"
            >
                <span class="text">
                    {isPosterShown ?  "Hide Poster" : "Show Poster"}
                </span>
            </button>
        </div>
    )
}