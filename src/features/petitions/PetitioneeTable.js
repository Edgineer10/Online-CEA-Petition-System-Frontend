import React from "react";
import Petitionee from "./Petitionee";
const PetitioneeTable = ({ petitionee }) => {
  const tableContent = petitionee?.length
    ? petitionee.map((userId) => <Petitionee key={userId} userId={userId} />)
    : null;

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
};

export default PetitioneeTable;
