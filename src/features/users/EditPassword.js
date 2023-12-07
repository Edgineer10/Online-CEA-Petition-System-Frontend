import { useGetUsersQuery } from "./usersApiSlice";
import EditPasswordForm from "./EditPasswordForm";
import useAuth from "../../hooks/useAuth";
import useTitle from "../../hooks/useTitle";
const EditUser = () => {
    useTitle('UC-CEA Edit Password')
    const { id } = useAuth();

    const { user } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            user: data?.entities[id]
        }),
    })

    const content = user ? <EditPasswordForm user={user} /> : <p>Loading...</p>;

    return content;
};
export default EditUser;
