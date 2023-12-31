import { useParams } from "react-router-dom";
import { useGetCoursesQuery } from "./coursesApiSlice";
import EditCourseForm from "./EditCourseForm";
import useAuth from "../../hooks/useAuth";
import useTitle from "../../hooks/useTitle";
const EditCourse = () => {
  useTitle('UC-CEA Edit Course')
  const { id } = useParams();
  const { role } = useAuth();

  const { course } = useGetCoursesQuery("coursesList", {
    selectFromResult: ({ data }) => ({
      course: data?.entities[id]
    }),
  })

  const content = course ? (
    <EditCourseForm course={course} role={role} />
  ) : (
    <p>Loading...</p>
  );

  return content;
};
export default EditCourse;
