import React from 'react'
import Match from './Match';

const Usermatch = ({ choices }) => {

    const tableContent = choices?.length
        ? choices.slice(0, 5).map((petitionee) =>
            <Match key={petitionee.idNumber} petitionee={petitionee} />
        )
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