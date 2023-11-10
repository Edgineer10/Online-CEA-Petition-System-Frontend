import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectPetitionById } from "./petitionsApiSlice";

const Petition = ({ petitionId, user }) => {
  const petition = useSelector((state) =>
    selectPetitionById(state, petitionId)
  );
  const navigate = useNavigate();


  if (petition) {
    const joined = petition.petitionee.includes(user.id) ? <span className="note__status--completed">Joined</span>
      : null
    const handleView = () => navigate(`/dash/petitions/${petitionId}`);

    return (
      <tr className="table__row user">
        <td className={`table__cell `}>{petition.courseProg.join(", ")}</td>
        <td className={`table__cell `}>{petition.courseCode}</td>
        <td className={`table__cell `}>{petition.descTitle}</td>
        <td className={`table__cell `}>{petition.unit}</td>
        <td className={`table__cell `}>{petition.schedule}</td>
        <td className={`table__cell `}>{petition.petitionee.length} <br /> {joined}
        </td>
        <td className={`table__cell `}>
          <button className="icon-button table__button" onClick={handleView}>
            <FontAwesomeIcon icon={faEye} />
          </button>
        </td>
      </tr>
    );
  } else return null;
};
export default Petition;
