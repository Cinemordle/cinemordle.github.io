import { useState, useEffect } from 'react';
import { generateText, arrayToList } from '../utils/Util.js';

export const Answer = (props) => {

    const [categories, setCategories] = useState({
        "Title": props.answer["Title"]==props.matchMap["Title"] ? props.matchMap["Title"] : "?",
        "Genre": generateText(props.answer, props.matchMap, "Genre"),
        "Actors": generateText(props.answer, props.matchMap, "Actors"),
        "Director": props.answer["Director"]==props.matchMap["Director"] ? props.matchMap["Director"] : "?",
        "Year": props.answer["Year"]==props.matchMap["Year"] ? props.matchMap["Year"] : "?"
    });

    useEffect(()=>{
        let obj;
        if(props.isGameOver) {
            obj = {
                "Title": props.answer["Title"],
                "Genre": props.answer["Genre"],
                "Actors": props.answer["Actors"],
                "Director": props.answer["Director"],
                "Year": props.answer["Year"]
            };
        } else {
            obj = {
                "Title": props.answer["Title"]==props.matchMap["Title"] ? props.matchMap["Title"] : "?",
                "Genre": arrayToList(generateText(props.answer, props.matchMap, "Genre")),
                "Actors": arrayToList(generateText(props.answer, props.matchMap, "Actors")),
                "Director": props.answer["Director"]==props.matchMap["Director"] ? props.matchMap["Director"] : "?",
                "Year": props.answer["Year"]==props.matchMap["Year"] ? props.matchMap["Year"] : "?"
            };
        }
        setCategories({...obj});
    }, [props.matchMap, props.answer, props.isGameOver]);

    return (
        <tr className="Submission-Row">
            <td></td>
            {
                Object.keys(categories).map((cat) => {
                    return (
                        <td 
                            className="Submission-Container"
                        >
                            {categories[cat]}
                        </td>
                    )
                })
            }
        </tr>
    )
}