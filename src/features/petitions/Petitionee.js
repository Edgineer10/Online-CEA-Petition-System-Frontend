import { useGetUsersQuery } from "../users/usersApiSlice";
import { memo } from "react";


const Petitionee = ({ userId, curUser, onDeleteStudent }) => {

  const onDeleteStud = (e) => {
    e.preventDefault()
    onDeleteStudent(userId)
  }

  const { user } =
    useGetUsersQuery("usersList", {
      selectFromResult: ({ data }) => ({
        user: data?.entities[userId]
      }),
    })


  if (user && curUser.role === "Student") {
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
  } else if (user && (curUser.role === "Admin" || curUser.role === "Instructor")) {
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
const memoizedPetionee = memo(Petitionee)
export default memoizedPetionee;
