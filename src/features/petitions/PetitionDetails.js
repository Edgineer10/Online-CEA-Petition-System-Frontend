import React from "react";
import useAuth from "../../hooks/useAuth"


const PetitionDetails = ({ petition, onSBclicked }) => {
  const { role } = useAuth();
  const status = petition.status === "On-going"
  const Button = (role === "Admin" || role === "Instructor") ?
    <button
      id="user-active"
      name="user-active"
      type="button"
      className={status ? "unjoin-button" : "join-button"}
      onClick={onSBclicked}
    >{status ? " Close Petition " : " Re-open"}
    </button> : null


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
            <td className={`table__cell `}>{petition.courseCode}<br /> {Button}
            </td>
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
