import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'
import { memo } from 'react'
import { useGetCoursesQuery } from './coursesApiSlice'
const Course = ({ courseId }) => {

    const { course } = useGetCoursesQuery("coursesList", {
        selectFromResult: ({ data }) => ({
            course: data?.entities[courseId]
        }),
    })

    const navigate = useNavigate()

    if (course) {

        const handleEdit = () => navigate(`/dash/courses/${courseId}`)

        return (
            <tr className="table__row">
                <td className="table__cell ">{course.courseProg.join(", ") + " " + course.currYear}</td>
                <td className="table__cell ">{"year: " + course.courseYear + " term: " + course.courseSem}</td>
                <td className="table__cell ">{course.courseCode}</td>
                <td className="table__cell ">{course.descTitle}</td>
                <td className="table__cell ">{course.unit}</td>

                <td className="table__cell">
                    <button
                        className="icon-button table__button"
                        onClick={handleEdit}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                </td>
            </tr>
        )

    } else return null
}
const memoizedCourse = memo(Course)
export default memoizedCourse