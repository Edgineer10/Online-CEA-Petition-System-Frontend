import { useParams } from "react-router-dom";
import { useGetUsersQuery } from "./usersApiSlice";
import EditUserForm from "./EditUserForm";
import { PulseLoader } from "react-spinners";
import useTitle from "../../hooks/useTitle";
import useAuth from "../../hooks/useAuth";

const EditUser = () => {
  useTitle("UC-CEA Edit User");
  const { id } = useParams();

  const { role } = useAuth();

  const { user } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[id],
    }),
  });

  const content = user ? (
    <EditUserForm user={user} mrole={role} />
  ) : (
    <PulseLoader color={"#FFF"} />
  );

  return content;
};
export default EditUser;
