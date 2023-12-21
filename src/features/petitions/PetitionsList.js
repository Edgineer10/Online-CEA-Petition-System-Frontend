import { useGetPetitionsQuery } from "./petitionsApiSlice"
import SearchablePetitionsList from "./SearchablePetitionsList";
import useTitle from "../../hooks/useTitle";
import useAuth from "../../hooks/useAuth";
const PetitionsList = () => {

    const { id, courseProg, role, currYear } = useAuth();
    const user = {
        id: id,
        courseProg: courseProg,
        role: role,
        currYear: currYear
    };
    useTitle('UC-CEA On-going Petitions')
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
        const { entities } = petitions
        content = (<SearchablePetitionsList petitions={Object.values(entities)} user={user} />)
    }

    return content
}
export default PetitionsList