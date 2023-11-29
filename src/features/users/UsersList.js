import { useGetUsersQuery } from "./usersApiSlice";
import SearchableUsersList from "./SearchableUsersList";
const UsersList = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery('usersList', {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
  });

  let content;

  if (isLoading) content = <p>Loading...</p>;

  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>;
  }

  if (isSuccess) {
    const { ids, entities } = users
    content = (<SearchableUsersList users={Object.values(entities)} />)
  }

  return content;
};
export default UsersList;
