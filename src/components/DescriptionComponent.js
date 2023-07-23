import { useState } from 'react';

export const DescriptionComponent = (props) => {

    const [isShown, setIsShown] = useState(false);

    return (
        <div className="Poster-Component">
            {
                isShown ? 
                <span>{props.value}</span>
                : <div/>
            }
            <button
                onClick={()=>setIsShown(!isShown)}
                className="Poster-Button"
            >
                <span class="text">
                    {isShown ?  "Hide Description" : "Show Description"}
                </span>
            </button>
        </div>
    )
}