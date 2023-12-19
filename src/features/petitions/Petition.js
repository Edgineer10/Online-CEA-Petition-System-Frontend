import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useGetPetitionsQuery } from "./petitionsApiSlice";
import { memo } from "react";
const Petition = ({ petitionId, user }) => {
  const { petition } = useGetPetitionsQuery("petitionsList", {
    selectFromResult: ({ data }) => ({
      petition: data?.entities[petitionId]
    }),
  })

  const navigate = useNavigate();
  if (petition && (user.role === "Instructor" || user.role === "Admin")) {
    const handleViewIns = () => navigate(`/dash/petitions/edit/${petitionId}`);
    const status = petition.status === "On-going" ? <span className="pet__status--completed">{petition.status}</span>
      : <span className="pet__status--open">{petition.status}</span>
    return (
      <tr className="table__row user">
        <td className={`table__cell `}>{petition.courseProg.join(", ") + " " + petition.currYear}</td>
        <td className={`table__cell `}>{petition.courseCode}<br />{status}</td>
        <td className={`table__cell `}>{petition.descTitle}<br /><span className="note__status--completed">Remark: {petition.remark}</span></td>
        <td className={`table__cell `}>{petition.unit}</td>
        <td className={`table__cell `}>{petition.schedule}</td>
        <td className={`table__cell `}>{petition.petitionee.length} <br />
        </td>
        <td className={`table__cell `}>
          <button className="icon-button table__button" onClick={handleViewIns}>
            <FontAwesomeIcon icon={faEye} />
          </button>
        </td>
      </tr>
    );
  }
  else if (petition && user.role === "Student" && (petition.courseProg.includes(user.courseProg) && petition.currYear === user.currYear)) {
    const joined = petition.petitionee.includes(user.id) ? <span className="note__status--completed">Joined</span>
      : null
    const status = petition.status === "On-going" ? <span className="pet__status--completed">{petition.status}</span>
      : <span className="pet__status--open">{petition.status}</span>

    const handleView = () => navigate(`/dash/petitions/${petitionId}`);

    return (
      <tr className="table__row user">
        <td className={`table__cell `}>{petition.courseProg.join(", ") + " " + petition.currYear}</td>
        <td className={`table__cell `}>{petition.courseCode}<br />{status}</td>
        <td className={`table__cell `}>{petition.descTitle}<br /><span className="note__status--completed">Remark: {petition.remark}</span></td>
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
const memoizedPetition = memo(Petition)
export default memoizedPetition;
