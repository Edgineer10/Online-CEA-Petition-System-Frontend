import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import {
  useUpdatePetitionMutation,
  useDeletePetitionMutation,
} from "./petitionsApiSlice";

import { useSelector } from "react-redux";
import { selectUserById } from "../users/usersApiSlice";

const Petitionee = ({ userId, user, onDeleteStudent }) => {
  const [updatePetition, { isLoading, isSuccess, isError, error }] =
    useUpdatePetitionMutation();
  const [
    deletePetition,
    { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
  ] = useDeletePetitionMutation();
  const onDeleteStud = (e) => {
    e.preventDefault()
    onDeleteStudent(userId)
  }
  const petitionee = useSelector((state) => selectUserById(state, userId));

  const navigate = useNavigate();

  if (petitionee && user.role === "Student") {
    const cellStatus = petitionee.active ? "" : "table__cell--inactive";

    return (
      <tr className="table__row user">
        <td className={`table__cell ${cellStatus}`}>{petitionee.idNumber}</td>
        <td className={`table__cell ${cellStatus}`}>
          {petitionee.lastName + ", " + petitionee.firstName + " " + petitionee.middleName}
        </td>
        <td className={`table__cell ${cellStatus}`}>
          {petitionee.courseProg + " " + petitionee.year}
        </td>
      </tr>




    );
  } else if (petitionee && (user.role === "Admin" || user.role === "Instructor")) {
    const cellStatus = petitionee.active ? "" : "table__cell--inactive";

    return (
      <tr className="table__row user">
        <td className={`table__cell ${cellStatus}`}>{petitionee.idNumber}</td>
        <td className={`table__cell ${cellStatus}`}>
          {petitionee.lastName + ", " + petitionee.firstName + " " + petitionee.middleName}
        </td>
        <td className={`table__cell ${cellStatus}`}>
          {petitionee.courseProg + " " + petitionee.year}
        </td>
        <td className={`table__cell ${cellStatus}`}>
          <button
            className="unjoin-button"
            title="Delete"
            onClick={onDeleteStud}
          >
            Remove
          </button>
        </td>
      </tr>




    );
  }
  else return null;
};
export default Petitionee;
