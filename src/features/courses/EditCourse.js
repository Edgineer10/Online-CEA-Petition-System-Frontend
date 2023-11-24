import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCourseById } from "./coursesApiSlice";
import EditCourseForm from "./EditCourseForm";
import useAuth from "../../hooks/useAuth";
const EditCourse = () => {
  const { id } = useParams();
  const { role } = useAuth();
  const course = useSelector((state) => selectCourseById(state, id));

  const content = course ? (
    <EditCourseForm course={course} role={role} />
  ) : (
    <p>Loading...</p>
  );

  return content;
};
export default EditCourse;
