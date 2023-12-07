import { useParams } from "react-router-dom";
import { useGetUsersQuery } from "./usersApiSlice";
import EditUserForm from "./EditUserForm";
import { PulseLoader } from "react-spinners";
import useTitle from "../../hooks/useTitle";
const EditUser = () => {
  useTitle('UC-CEA Edit User')
  const { id } = useParams();

  const { user } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[id]
    }),
  })

  const content = user ? <EditUserForm user={user} /> : <PulseLoader color={"#FFF"} />;

  return content;
};
export default EditUser;
