import React from 'react'

const Match = ({ petitionee }) => {
    return (
        <tr className="table__row user" >
            <td className={`table__cell usermatch`}>{petitionee.idNumber}</td>
            <td className={`table__cell usermatch`}>
                {petitionee.lastName + ", " + petitionee.firstName + " " + petitionee.middleName}
            </td>
            <td className={`table__cell usermatch`}>
                {petitionee.courseProg + " " + petitionee.year}
            </td>
        </tr>
    )
}

export default Match