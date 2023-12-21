import { useGetUsersQuery } from "./usersApiSlice";
import SearchableUsersList from "./SearchableUsersList";
import useTitle from "../../hooks/useTitle";
const UsersList = () => {

  useTitle('UC-CEA Users')
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery('usersList', {
    pollingInterval: 10000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
  });

  let content;

  if (isLoading) content = <p>Loading...</p>;

  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>;
  }

  if (isSuccess) {
    const { entities } = users
    content = (<SearchableUsersList users={Object.values(entities)} />)
  }

  return content;
};
export default UsersList;
