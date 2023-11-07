import React from "react";

const PetitionDetails = ({ petition }) => {
  return (
    <>
      <table className="table table-view-pet">
        <thead className="table__thead">
          <tr>
            <th scope="col" className="table__th note__status">
              Course Program/s
            </th>
            <th scope="col" className="table__th note__status">
              Course Code
            </th>
            <th scope="col" className="table__th note__status">
              Descriptive Title
            </th>
            <th scope="col" className="table__th note__status">
              Units
            </th>
            <th scope="col" className="table__th note__status">
              Schedule
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="table__row user">
            <td className={`table__cell `}>{petition.courseProg.join(", ")}</td>
            <td className={`table__cell `}>{petition.courseCode}</td>
            <td className={`table__cell `}>{petition.descTitle}</td>
            <td className={`table__cell `}>{petition.unit}</td>
            <td className={`table__cell `}>{petition.schedule}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default PetitionDetails;
