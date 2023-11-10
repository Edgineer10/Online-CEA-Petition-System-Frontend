import { useSelector } from "react-redux";
import { selectAllCourses } from "../courses/coursesApiSlice";
import NewPetitionForm from "./NewPetitionForm";

const NewPetition = () => {
    const courses = useSelector(selectAllCourses);
    const user = {
        id: "6548391e52cf6fea690ce3f9",
        courseProg: "BSCpE"
    };
    const content = courses ? <NewPetitionForm courses={courses} user={user} /> : <p>Loading...</p>;
    return content;
};
export default NewPetition;
