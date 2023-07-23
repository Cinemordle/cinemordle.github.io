import { SubmissionBox } from "./SubmissionBox";
import { objToCategories} from "../utils/Util";

export const Submission = (props) => {
    const movie = props.movie;

    const categories = objToCategories(movie);

    return (
        <tr className="Submission-Row">
            <td className="Submission-Container">{props.attemptNumber}</td>
            {
                Object.keys(categories).map((cat) => {
                    return (
                        <SubmissionBox answer={props.answer} category={cat} value={categories[cat]} addMatch={props.addMatch}/>
                    )
                })
            }
        </tr>
    )
}