import './App.css';
import Game from './Game';
import { constants } from "./utils/constants";

function App() {
    const { gameTitle } = constants;
    return (
        <div className="App">
            <header className="App-header">
                <div>{gameTitle}</div>
            </header>
            <Game/>
        </div>
    );
}

export default App;