import React from "react";
import Petitionee from "./Petitionee";
const PetitioneeTable = ({ petitionee, user, onDeleteStudent }) => {
  const tableContent = petitionee?.length
    ? petitionee.map((userId) => <Petitionee key={userId} userId={userId} curUser={user} onDeleteStudent={onDeleteStudent} />)
    : null;


  if (user.role === "Admin" || user.role === "Instructor") {
    return (
      <table className="table table--petitionee--add">
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
            <th scope="col" className="table__th user__roles">
              Action
            </th>
            { }
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    );
  } else {
    return (
      <table className="table table--petitionee">
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
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    );
  }
};

export default PetitioneeTable;
