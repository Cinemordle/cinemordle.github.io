import Autosuggest from 'react-autosuggest';
import { useState } from 'react';
import './styles/Autosuggest.css'


// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
    <div>
        {suggestion.toString()}
    </div>
);

export default function AutosuggestComponent(props) {

    const [value, setValue] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    const getSuggestionValue = (suggestion) => {
        return suggestion.name;
    }

    const getSuggestions = value => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
    
        return inputLength === 0 ? [] : props.movieList.filter(movie =>
            movie.toLowerCase().slice(0, inputLength) === inputValue
        );
    };

    const onChange = (event) => {
        event.preventDefault();
        let newValue;
        try {
            newValue = event.target.value.toString()
        } catch {
            newValue = "error";
        }
        setValue(newValue);
    };

    const onSuggestionSelected = (event, {suggestion}) => {
        props.onInputEnter(suggestion);
        setValue("");
        //setValue(suggestion);
    }

    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    const onSuggestionsFetchRequested = () => {
        setSuggestions(getSuggestions(value.toString()));
    };

    // Autosuggest will call this function every time you need to clear suggestions.
   const onSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
        placeholder: props.disabled ? 'Game Over' : 'Type...',
        value: value,
        onChange: onChange,
        disabled: props.disabled
    };

    // Finally, render it!
    return (
        <div className="AutosuggestWrapper">
            <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                onSuggestionsClearRequested={onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                onSuggestionSelected={onSuggestionSelected}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
                options={{ disabled: true }}
            />
        </div>
    );
}
