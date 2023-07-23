import { useState, useEffect } from 'react';
import './styles/SubmissionTable.css';

export const SubmissionBox = (props) => {
    const category = props.category;

    const [value, setValue] = useState(props.value);
    const [match, setMatch] = useState(false);
    const [matchList, setMatchList] = useState([]);

    useEffect(() => {
        checkMatch();
        if(props.category == "Year") {
            if(parseInt(value)>parseInt(props.answer[category])) {
                setValue(value + "↓");
            } else if(parseInt(value)<parseInt(props.answer[category])){
                setValue(value + "↑");
            }
        }
    }, []);

    const checkMatch = () => {
        if (value == props.answer[category]) {
            setMatch("FULL");
            props.addMatch([value], category);
        } else {
            let guessArr = value.split(",").map(item => item.trim());
            let answerArr = props.answer[category].split(",").map(item => item.trim());

            let matches = guessArr.filter(val => answerArr.includes(val));

            if (matches.length > 0) {
                setMatch("PARTIAL");
                setMatchList(matches);
                props.addMatch(matches, category);
            } else {
                setMatch("NONE");
            }
        }
    }
    return (
        <td 
            className="Submission-Container"
            style={(match == "FULL") ?
                { backgroundColor: "green" } :
                    (match == "PARTIAL") ?
                    { backgroundColor: "yellow" } :
                    {}
            }
        >
            {value}
        </td>
    );
}