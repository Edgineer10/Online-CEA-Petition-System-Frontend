import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectUserById } from "../users/usersApiSlice";

const Petitionee = ({ userId }) => {
  const user = useSelector((state) => selectUserById(state, userId));

  const navigate = useNavigate();

  if (user) {
    const cellStatus = user.active ? "" : "table__cell--inactive";

    return (
      <tr className="table__row user">
        <td className={`table__cell ${cellStatus}`}>{user.idNumber}</td>
        <td className={`table__cell ${cellStatus}`}>
          {user.lastName + ", " + user.firstName + " " + user.middleName}
        </td>
        <td className={`table__cell ${cellStatus}`}>
          {user.courseProg + " " + user.year}
        </td>
      </tr>
    );
  } else return null;
};
export default Petitionee;
