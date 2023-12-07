import { useGetCoursesQuery } from "./coursesApiSlice"
import SearchableCoursesList from "./SearchableCoursesList"
import useTitle from "../../hooks/useTitle"
const CoursesList = () => {
  useTitle('UC-CEA Courses')
  const {
    data: courses,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetCoursesQuery('coursesList', {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
  })

  let content

  if (isLoading) content = <p>Loading...</p>

  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>
  }

  if (isSuccess) {
    const { entities } = courses
    content = (<SearchableCoursesList courses={Object.values(entities)} />)
  }

  return content
}
export default CoursesList