import { useGetCoursesQuery } from "./coursesApiSlice"
import Course from "./Course"

const CoursesList = () => {
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
    const { ids } = courses

    const tableContent = ids?.length
      ? ids.map(courseId => <Course key={courseId} courseId={courseId} />)
      : null

    content = (
      <table className="table table--courses">
        <thead className="table__thead">
          <tr>
            <th scope="col" className="table__th note__status">Course Program & Year</th>
            <th scope="col" className="table__th note__status">Year & Sem</th>
            <th scope="col" className="table__th note__status">Course Code</th>
            <th scope="col" className="table__th note__status">Descriptive Title</th>
            <th scope="col" className="table__th note__status">Units</th>
            <th scope="col" className="table__th note__status">Edit</th>
          </tr>
        </thead>
        <tbody>
          {tableContent}
        </tbody>
      </table>
    )
  }

  return content
}
export default CoursesList