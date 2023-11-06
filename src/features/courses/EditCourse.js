import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCourseById } from "./coursesApiSlice";
import EditCourseForm from "./EditCourseForm";

const EditCourse = () => {
    const { id } = useParams();

    const course = useSelector((state) => selectCourseById(state, id));

    const content = course ? <EditCourseForm course={course} /> : <p>Loading...</p>;

    return content;
};
export default EditCourse;
