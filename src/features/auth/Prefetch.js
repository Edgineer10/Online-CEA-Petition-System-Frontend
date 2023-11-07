import { store } from "../../app/Store";
import { coursesApiSlice } from "../courses/coursesApiSlice";
import { usersApiSlice } from "../users/usersApiSlice";
import { petitionsApiSlice } from "../petitions/petitionsApiSlice";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const Prefetch = () => {
  useEffect(() => {
    console.log("subscribing");
    const courses = store.dispatch(
      coursesApiSlice.endpoints.getCourses.initiate()
    );
    const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate());
    const petitions = store.dispatch(
      petitionsApiSlice.endpoints.getPetitions.initiate()
    );

    return () => {
      console.log("unsubscribing");
      courses.unsubscribe();
      users.unsubscribe();
      petitions.unsubscribe();
    };
  }, []);

  return <Outlet />;
};
export default Prefetch;
