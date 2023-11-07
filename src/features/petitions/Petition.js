import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectPetitionById } from "./petitionsApiSlice";

const Petition = ({ petitionId }) => {

    const petition = useSelector(state => selectPetitionById(state, petitionId))
    const navigate = useNavigate();
    console.log(petition)

    if (petition) {
        const handleView = () => navigate(`/dash/petitions/${petitionId}`);


        return (
            <tr className="table__row user">
                <td className={`table__cell `}>{petition.courseProg.join(", ")}</td>
                <td className={`table__cell `}>{petition.courseCode}</td>
                <td className={`table__cell `}>{petition.descTitle}</td>
                <td className={`table__cell `}>{petition.unit}</td>
                <td className={`table__cell `}>{petition.schedule}</td>
                <td className={`table__cell `}>{petition.petitionee.length}</td>
                <td className={`table__cell `}>
                    <button className="icon-button table__button" onClick={handleView}>
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                </td>
            </tr>
        );
    } else return null;
};
export default Petition;
