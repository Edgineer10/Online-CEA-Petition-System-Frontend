import { useState, useEffect } from "react";
import { useAddNewCourseMutation } from "./coursesApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { PROGRAM } from "../../config/program";
import useTitle from "../../hooks/useTitle";

const NewCourse = () => {
    useTitle('UC-CEA Add New Course')
    const [addNewCourse, { isLoading, isSuccess, isError, error }] =
        useAddNewCourseMutation();

    const navigate = useNavigate();
    const options = Object.keys(PROGRAM).map((program) => {
        return (
            <option key={program} value={program}>
                {program}
            </option>
        );
    });


    const [courseProg, setCourseProg] = useState([]);
    const [currYear, setCurrYear] = useState(1);
    const [courseCode, setCourseCode] = useState("");
    const [descTitle, setDescTitle] = useState("");
    const [unit, setUnit] = useState(3);
    const [courseYear, setCourseYear] = useState(1);
    const [courseSem, setCourseSem] = useState(1);

    useEffect(() => {
        if (isSuccess) {
            setCourseProg([]);
            setCurrYear("");
            setCourseCode("");
            setDescTitle("");
            setUnit("");
            setCourseYear("");
            setCourseSem("");
            navigate("/dash/courses");
        }
    }, [isSuccess, navigate]);
    const onCourseProgChanged = (e) => {
        const values = Array.from(
            e.target.selectedOptions, //HTMLCollection 
            (option) => option.value
        )
        setCourseProg(values)
    }
    const onCurrYearChanged = (e) => setCurrYear(e.target.value);
    const onCourseCodeChanged = (e) => setCourseCode(e.target.value);
    const onDescTitleChanged = (e) => setDescTitle(e.target.value);
    const onUnitChanged = (e) => setUnit(e.target.value);
    const onCourseYearChanged = (e) => setCourseYear(e.target.value);
    const onCourseSemChanged = (e) => setCourseSem(e.target.value);
    const canSave =
        [
            courseProg.length ||
            currYear ||
            courseCode ||
            descTitle ||
            unit ||
            courseYear ||
            courseSem
        ].every(Boolean) && !isLoading;

    const onSaveCourseClicked = async (e) => {
        e.preventDefault();
        if (canSave) {
            await addNewCourse({
                currYear,
                courseCode,
                descTitle,
                unit,
                courseYear,
                courseSem,
                courseProg
            });
        }
    };


    const errClass = isError ? "errmsg" : "offscreen";
    const validCurrYearClass = !currYear ? "form__input--incomplete" : "";
    const validCourseCodeClass = !courseCode ? "form__input--incomplete" : "";
    const validDescTitleClass = !descTitle ? "form__input--incomplete" : "";
    const validUnitClass = !unit ? "form__input--incomplete" : "";
    const validCourseYearClass = !courseYear ? "form__input--incomplete" : "";
    const validCourseSemClass = !courseSem ? "form__input--incomplete" : "";
    const validCourseProgClass = !courseProg ? "form__input--incomplete" : "";

    const content = (
        <>
            <p className={errClass}>{error?.data?.message}</p>

            <form className="form" onSubmit={onSaveCourseClicked}>
                <div className="form__title-row">
                    <h2>New Course</h2>
                    <div className="form__action-buttons">
                        <button className="icon-button" title="Save" disabled={!canSave}>
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                    </div>
                </div>
                <label className="form__label" htmlFor="program">
                    Course Program: (press ctrl button to multiselect)
                </label>
                <select
                    id="program"
                    name="program"
                    className={`form__select ${validCourseProgClass}`}
                    multiple={true}
                    size="5"
                    value={courseProg}
                    onChange={onCourseProgChanged}
                >
                    {options}
                </select>
                <label className="form__label" htmlFor="curryear">
                    Curriculum Year:{" "}
                </label>
                <input
                    className={`form__input ${validCurrYearClass}`}
                    id="curryear"
                    name="curryear"
                    type="curryear"
                    value={currYear}
                    onChange={onCurrYearChanged}
                />

                <label className="form__label" htmlFor="coursecode">
                    Course Code:
                </label>
                <input
                    className={`form__input ${validCourseCodeClass}`}
                    id="coursecode"
                    name="coursecode"
                    type="text"
                    autoComplete="off"
                    value={courseCode}
                    onChange={onCourseCodeChanged}
                />


                <label className="form__label" htmlFor="desctitle">
                    Descriptive Title:
                </label>
                <input
                    className={`form__input ${validDescTitleClass}`}
                    id="desctitle"
                    name="desctitle"
                    type="text"
                    autoComplete="off"
                    value={descTitle}
                    onChange={onDescTitleChanged}
                />
                <label className="form__label" htmlFor="unit">
                    Unit:
                </label>
                <input
                    className={`form__input ${validUnitClass}`}
                    id="unit"
                    name="unit"
                    type="number"
                    autoComplete="off"
                    value={unit}
                    onChange={onUnitChanged}
                />

                <label className="form__label" htmlFor="courseyear">
                    Course Year:
                </label>
                <input
                    className={`form__input ${validCourseYearClass}`}
                    id="courseyear"
                    name="courseyear"
                    type="text"
                    autoComplete="off"
                    value={courseYear}
                    onChange={onCourseYearChanged}
                />
                <label className="form__label" htmlFor="coursesem">
                    Course Semester:
                </label>
                <input
                    className={`form__input ${validCourseSemClass}`}
                    id="coursesem"
                    name="coursesem"
                    type="number"
                    autoComplete="off"
                    value={courseSem}
                    onChange={onCourseSemChanged}
                />


            </form>
        </>
    );

    return content;
};
export default NewCourse;
