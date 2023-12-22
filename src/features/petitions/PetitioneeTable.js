import React from "react";
import Petitionee from "./Petitionee";
const PetitioneeTable = ({ petitionee, user, onDeleteStudent }) => {
  const tableContent = petitionee?.length
    ? petitionee.map((userId) => <Petitionee key={userId} userId={userId} curUser={user} onDeleteStudent={onDeleteStudent} />)
    : null;
  const tableclass = (user.role === "Admin" || user.role === "Instructor") ? "table table--petitionee--add" : "table table--petitionee"
  return (
    <table className={tableclass}>
      <thead className="table__thead">
        <tr>
          <th scope="col" className="table__th user__username">
            ID Number
          </th>
          <th scope="col" className="table__th user__roles">
            Name
          </th>
          <th scope="col" className="table__th user__roles">
            Course & Year
          </th>
          {(user.role === "Admin" || user.role === "Instructor") &&
            <th scope="col" className="table__th user__roles">
              Action
            </th>}
        </tr>
      </thead>
      <tbody>{tableContent}</tbody>
    </table>
  );

};

export default PetitioneeTable;
