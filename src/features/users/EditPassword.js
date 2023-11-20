import { useSelector } from "react-redux";
import { selectUserById } from "./usersApiSlice";
import EditPasswordForm from "./EditPasswordForm";
import useAuth from "../../hooks/useAuth";

const EditUser = () => {
    const { id } = useAuth();

    const user = useSelector((state) => selectUserById(state, id));

    const content = user ? <EditPasswordForm user={user} /> : <p>Loading...</p>;

    return content;
};
export default EditUser;
