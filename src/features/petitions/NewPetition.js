import { useGetCoursesQuery } from "../courses/coursesApiSlice";
import NewPetitionForm from "./NewPetitionForm";
import NewPetitionFormAd from "./NewPetitionFormAd";
import useAuth from "../../hooks/useAuth";
import useTitle from "../../hooks/useTitle";

const NewPetition = () => {

  useTitle("UC-CEA Add New Petition");

  const { courses } = useGetCoursesQuery("coursesList", {
    selectFromResult: ({ data }) => ({
      courses: data?.ids.map((id) => data?.entities[id]),
    }),
  });

  const { id, courseProg, role, currYear } = useAuth();
  const user = {
    id: id,
    courseProg: courseProg,
    role: role,
    currYear: currYear,
  };

  const petitionform = user.role === "Student" ? <NewPetitionForm courses={courses} user={user} /> : <NewPetitionFormAd courses={courses} />
  const content = courses ? petitionform : <p>Loading...</p>

  return content;
};
export default NewPetition;
