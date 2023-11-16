import React from 'react'

const Usermatch = ({ choices }) => {

    const tableContent = choices?.length
        ? choices.slice(0, 10).map((petitionee) => <>

            <tr className="table__row user">
                <td className={`table__cell usermatch`}>{petitionee.idNumber}</td>
                <td className={`table__cell usermatch`}>
                    {petitionee.lastName + ", " + petitionee.firstName + " " + petitionee.middleName}
                </td>
                <td className={`table__cell usermatch`}>
                    {petitionee.courseProg + " " + petitionee.year}
                </td>
            </tr>
        </>)
        : null;

    return (
        <table className="table table--petitionee usermatch">
            <thead className="table__thead">
                <tr>
                    <th scope="col" className="table__th user__username usermatch">
                        ID Number
                    </th>
                    <th scope="col" className="table__th user__roles usermatch">
                        Name
                    </th>
                    <th scope="col" className="table__th user__roles usermatch">
                        Course & Year
                    </th>
                </tr>
            </thead>
            <tbody>{tableContent}</tbody>
        </table>
    )
}

export default Usermatch