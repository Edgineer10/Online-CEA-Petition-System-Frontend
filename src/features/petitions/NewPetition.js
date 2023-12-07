import { useGetCoursesQuery } from "../courses/coursesApiSlice";
import NewPetitionForm from "./NewPetitionForm";
import useAuth from "../../hooks/useAuth";
import useTitle from "../../hooks/useTitle";
const NewPetition = () => {
    useTitle('UC-CEA Add New Petition')
    const { courses } = useGetCoursesQuery("coursesList", {
        selectFromResult: ({ data }) => ({
            courses: data?.ids.map(id => data?.entities[id])
        }),
    })

    const { id, courseProg } = useAuth();
    const user = {
        id: id,
        courseProg: courseProg
    };
    const content = courses ? <NewPetitionForm courses={courses} user={user} /> : <p>Loading...</p>;
    return content;
};
export default NewPetition;
