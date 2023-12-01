import { useGetPetitionsQuery } from "./petitionsApiSlice"
import SearchablePetitionsList from "./SearchablePetitionsList";
const PetitionsList = () => {


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
        content = (<SearchablePetitionsList petitions={Object.values(entities)} />)
    }

    return content
}
export default PetitionsList