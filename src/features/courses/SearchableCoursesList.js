import Course from "./Course"
import { useSelector } from "react-redux";
import { selectAllCourses } from "./coursesApiSlice";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";
const SearchableCoursesList = () => {
    const courses = useSelector(selectAllCourses);
    const [filterWord, setFilterWorld] = useState("");
    const onFilterWordChanged = (e) => setFilterWorld(e.target.value)
    let content
    if (courses) {
        const result = courses.filter((course) => {
            return course.courseCode.toLowerCase().includes(filterWord.toLowerCase()) ||
                course.courseProg.toString().toLowerCase().includes(filterWord.toLowerCase()) ||
                course.courseYear.toString().toLowerCase().includes(filterWord.toLowerCase()) ||
                course.courseSem.toString().toLowerCase().includes(filterWord.toLowerCase()) ||
                course.descTitle.toLowerCase().includes(filterWord.toLowerCase())
        })
        const tableContent = result?.length
            ? result.slice(0, 10).map(courseId => <Course key={courseId.id} courseId={courseId.id} />)
            : null

        content = (
            <>
                <div className="form">
                    <p>
                        <label
                            className="form__label form__checkbox-container"
                            htmlFor="user-active"
                        >
                            <label className="form__label" htmlFor="filterWord">
                                Search Courses:{" "}
                            </label>
                            <input
                                className={`form__input`}
                                id="filterWord"
                                name="filterWord"
                                type="filterWord"
                                value={filterWord}
                                onChange={onFilterWordChanged}
                            />
                            <Link className="naviBut" to="/dash/courses/new">
                                <FontAwesomeIcon icon={faSquarePlus} /> Add Course</Link>
                        </label>
                    </p>

                </div>

                {result.length !== 0 &&
                    <>
                        <br />
                        <p> Displaying top 10 results of search:</p>

                        <table className="table table--courses">
                            <thead className="table__thead">
                                <tr>
                                    <th scope="col" className="table__th note__status">Course Program & Year</th>
                                    <th scope="col" className="table__th note__status">Year & Term</th>
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
                    </>
                }
            </>
        )
    }

    return content
}
export default SearchableCoursesList