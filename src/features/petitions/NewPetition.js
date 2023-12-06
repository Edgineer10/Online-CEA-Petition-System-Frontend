import { useGetCoursesQuery } from "../courses/coursesApiSlice";
import NewPetitionForm from "./NewPetitionForm";
import useAuth from "../../hooks/useAuth";

const NewPetition = () => {
    const { courses } = useGetCoursesQuery("coursesList", {
        selectFromResult: ({ data }) => ({
            courses: data.entities
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
