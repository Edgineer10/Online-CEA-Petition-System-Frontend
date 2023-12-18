import { useState, useEffect } from "react";
import {
  useUpdateCourseMutation,
  useDeleteCourseMutation,
} from "./coursesApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { PROGRAM } from "../../config/program";

const EditCourseForm = ({ course, role }) => {
  const [updateCourse, { isLoading, isSuccess, isError, error }] =
    useUpdateCourseMutation();

  const [
    deleteCourse,
    { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
  ] = useDeleteCourseMutation();

  const navigate = useNavigate();

  const [courseProg, setCourseProg] = useState(course.courseProg);
  const [currYear, setCurrYear] = useState(course.currYear);
  const [courseCode, setCourseCode] = useState(course.courseCode);
  const [descTitle, setDescTitle] = useState(course.descTitle);
  const [unit, setUnit] = useState(course.unit);
  const [courseYear, setCourseYear] = useState(course.courseYear);
  const [courseSem, setCourseSem] = useState(course.courseSem);

  console.log();
  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setCourseProg([]);
      setCurrYear("");
      setCourseCode("");
      setDescTitle("");
      setUnit("");
      setCourseYear("");
      setCourseSem("");
      navigate("/dash/courses");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const onCourseProgChanged = (e) => {
    const values = Array.from(
      e.target.selectedOptions, //HTMLCollection
      (option) => option.value
    );
    setCourseProg(values);
  };
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
      courseSem,
    ].every(Boolean) && !isLoading;

  const onSaveCourseClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await updateCourse({
        id: course.id,
        currYear,
        courseCode,
        descTitle,
        unit,
        courseYear,
        courseSem,
        courseProg,
      });
    }
  };

  const onDeleteCourseClicked = async () => {
    await deleteCourse({ id: course.id });
  };

  let deleteButton = null;
  if (role === "Admin") {
    deleteButton = (
      <button
        className="icon-button"
        title="Delete"
        onClick={onDeleteCourseClicked}
      >
        <FontAwesomeIcon icon={faTrashCan} />
      </button>
    );
  }

  const options = Object.keys(PROGRAM).map((program) => {
    return (
      <option key={program} value={program}>
        {program}
      </option>
    );
  });

  const errClass = isError || isDelError ? "errmsg" : "offscreen";
  const validCurrYearClass = !currYear ? "form__input--incomplete" : "";
  const validCourseCodeClass = !courseCode ? "form__input--incomplete" : "";
  const validDescTitleClass = !descTitle ? "form__input--incomplete" : "";
  const validUnitClass = !unit ? "form__input--incomplete" : "";
  const validCourseYearClass = !courseYear ? "form__input--incomplete" : "";
  const validCourseSemClass = !courseSem ? "form__input--incomplete" : "";
  const validCourseProgClass = !courseProg ? "form__input--incomplete" : "";

  const errContent = (error?.data?.message || delerror?.data?.message) ?? "";

  const content = (
    <>
      <p className={errClass}>{errContent}</p>

      <form className="form" onSubmit={onSaveCourseClicked}>
        <div className="form__title-row">
          <h2>Edit Course</h2>
          <div className="form__action-buttons">
            <button className="icon-button" title="Save" disabled={!canSave}>
              <FontAwesomeIcon icon={faSave} />
            </button>

            {deleteButton}
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
          type="number"
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
export default EditCourseForm;
