import { useGetPetitionsQuery } from "./petitionsApiSlice"
import Petition from "./Petition"
import useAuth from "../../hooks/useAuth";
const PetitionsList = () => {

    const { id, courseProg, role } = useAuth();
    const user = {
        id: id,
        courseProg: courseProg,
        role: role
    };


    const {
        data: petitions,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetPetitionsQuery('petitionslist', {
        pollingInterval: 10000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })
    let content

    if (isLoading) content = <p>Loading...</p>

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {
        const { ids } = petitions
        const tableContent = ids?.length
            ? ids.map(petitionId => <Petition key={petitionId} petitionId={petitionId} user={user} />)
            : null

        content = (
            <table className="table table--petitions">
                <thead className="table__thead">
                    <tr>
                        <th scope="col" className="table__th note__status">Course Program/s</th>
                        <th scope="col" className="table__th note__status">Course Code</th>
                        <th scope="col" className="table__th note__status">Descriptive Title</th>
                        <th scope="col" className="table__th note__status">Units</th>
                        <th scope="col" className="table__th note__status">Schedule</th>
                        <th scope="col" className="table__th note__status">Petitionee/s</th>
                        <th scope="col" className="table__th note__status">View/join</th>
                    </tr>
                </thead>
                <tbody>
                    {tableContent}
                </tbody>
            </table>
        )
    }

    return content
}
export default PetitionsList