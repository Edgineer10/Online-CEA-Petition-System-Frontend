import { useGetUsersQuery } from "../users/usersApiSlice";


const Petitionee = ({ userId, user, onDeleteStudent }) => {
  console.log(userId)
  const onDeleteStud = (e) => {
    e.preventDefault()
    onDeleteStudent(userId)
  }

  const { petitionee } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[userId]
    }),
  })


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
