import { Answer } from './Answer';
import { Submission } from './Submission';
import { constants } from '../utils/constants';
import './styles/SubmissionTable.css';

export const SubmissionTable = (props) => {
    const { categories } = constants;

    return(
        <table className="Submission-Table">
          <Answer
            matchMap={props.matchMap}
            answer={props.answer}
            isGameOver={props.isGameOver}
            />
          <tr>
            <th>Attempt({props.movies.length}/8)</th>
              {
                  categories.map((cat) => {
                      return (
                          <th>{cat.category}</th>
                      );
                  })
              }
          </tr>
          {props.movies.map((movie, i) => {
            return (
              <Submission
                attemptNumber={i+1}
                movie={movie}
                answer={props.answer}
                addMatch={(x, y) => props.addMatch(x,y)}
              />
            )
          })}
        </table>
    );
}