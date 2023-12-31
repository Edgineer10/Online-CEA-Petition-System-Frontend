import Course from "./Course"
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faSearch, faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { PROGRAM } from "../../config/program";
import { useGetCoursesQuery } from "./coursesApiSlice";
const ArrangedCourse = () => {

    const { courses } = useGetCoursesQuery("coursesList", {
        selectFromResult: ({ data }) => ({
            courses: data?.ids.map((id) => data?.entities[id]),
        }),
    });

    const pOptions = Object.keys(PROGRAM).map((program, i) => {
        return (
            <option key={program} value={program}>
                {program + " - " + Object.values(PROGRAM)[i]}
            </option>
        );
    });
    const [courseProg, setCourseProg] = useState(Object.keys(PROGRAM)[0]);
    const [currYear, setCurrYear] = useState("2018");
    const [courseYear, setCourseYear] = useState("1");
    const [courseSem, setCourseSem] = useState("1");


    const validProgramClass = !courseProg ? "form__input--incomplete" : "";
    const validCurrYearClass = !currYear ? "form__input--incomplete" : "";
    const validCourseYearClass = !courseYear ? "form__input--incomplete" : "";
    const validCourseSemClass = !courseSem ? "form__input--incomplete" : "";


    const onCourseProgramChanged = (e) => setCourseProg(e.target.value)
    const onCurrYearChanged = (e) => setCurrYear(e.target.value)
    const onCourseYearChanged = (e) => setCourseYear(e.target.value)
    const onCourseSemChanged = (e) => setCourseSem(e.target.value)

    let content = null

    if (courses) {

        const result = courses.filter((course) => {
            return course.courseProg.includes(courseProg) &&
                course.courseYear.toString().toLowerCase() === courseYear.toString().toLowerCase() &&
                course.courseSem.toString().toLowerCase() === courseSem.toString().toLowerCase() &&
                course.currYear.toString().toLowerCase() === currYear.toString().toLowerCase()
        })

        const tableContent = result?.length
            ? result.map(courseId => <Course key={courseId.id} courseId={courseId.id} />)
            : null

        content = (
            <>
                <div className="form">
                    <label
                        className="form__label form__checkbox-container"
                        htmlFor="user-active"
                    >
                        <Link className="naviBut" to="/dash/courses/general">
                            <FontAwesomeIcon icon={faSearch} /> Search by keyword</Link>
                        <Link className="naviBut" to="/dash/courses/new">
                            <FontAwesomeIcon icon={faSquarePlus} /> Add Course</Link>
                    </label>

                    <div className="form__title-row">
                        <h2>View Courses</h2>
                    </div>

                    <label
                        className="form__label form__checkbox-container"
                        htmlFor="user-active"
                    >
                        <label className="form__label" htmlFor="course">
                            Program : <select
                                id="program"
                                name="program"
                                className={`form__select ${validProgramClass}`}
                                value={courseProg}
                                onChange={onCourseProgramChanged}

                            >
                                {pOptions}
                            </select>
                        </label>

                        <label className="form__label" htmlFor="curryear">
                            Curriculum Year: <input
                                className={`form__input ${validCurrYearClass}`}
                                id="curryear"
                                name="curryear"
                                type="number"
                                value={currYear}
                                onChange={onCurrYearChanged}
                            />
                        </label>

                        <label className="form__label" htmlFor="curryear">
                            Course Year: <input
                                className={`form__input ${validCourseYearClass}`}
                                id="courseYear"
                                name="courseYear"
                                type="number"
                                value={courseYear}
                                onChange={onCourseYearChanged}
                            />
                        </label>

                        <label className="form__label" htmlFor="curryear">
                            Course Semester: <input
                                className={`form__input ${validCourseSemClass}`}
                                id="courseSem"
                                name="courseSem"
                                type="number"
                                value={courseSem}
                                onChange={onCourseSemChanged}
                            />
                        </label>

                    </label>


                </div>

                {result.length !== 0 &&
                    <>
                        <br />
                        <p><b> {"Showing the subjects for " + currYear + " " + courseProg + " Year: " + courseYear + " Term: " + courseSem + " "}</b></p>


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
export default ArrangedCourse