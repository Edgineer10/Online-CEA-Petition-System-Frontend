import { useState, useEffect } from "react";
import { useAddNewPetitionMutation } from "./petitionsApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";


const NewCourseForm = ({ courses, user }) => {

    const [addNewPetition, { isLoading, isSuccess, isError, error }] =
        useAddNewPetitionMutation();
    const navigate = useNavigate();
    const options = courses.map((course) => {
        if (Object.values(course.courseProg).includes(user.courseProg))
            return (
                <option key={course.id} value={course.id}>
                    {course.courseCode + " - " + course.descTitle}
                </option>
            )
        else return null;
    });



    const [course, setCourse] = useState("");
    const [petitionee, setPetitionee] = useState([user.id]);
    const [schedule, setSchedule] = useState("");


    useEffect(() => {
        if (isSuccess) {
            setCourse('')
            setPetitionee([])
            setSchedule('')
            navigate("/dash/petitions");
        }
    }, [isSuccess, navigate]);

    const onCourseChanged = (e) => setCourse(e.target.value);
    const onScheduleChanged = (e) => setSchedule(e.target.value);
    const canSave =
        [
            course.length ||
            schedule
        ].every(Boolean) && !isLoading;

    const onSavePetitionClicked = async (e) => {
        e.preventDefault();
        console.log(course + " " + schedule)
        if (canSave) {
            await addNewPetition({
                course,
                petitionee,
                schedule
            });
        }
    };


    const errClass = isError ? "errmsg" : "offscreen";
    const validCourseClass = !course ? "form__input--incomplete" : "";
    const validScheduleClass = !schedule ? "form__input--incomplete" : "";

    const content = (
        <>
            <p className={errClass}>{error?.data?.message}</p>

            <form className="form" onSubmit={onSavePetitionClicked}>
                <div className="form__title-row">
                    <h2>New Petition</h2>
                    <div className="form__action-buttons">
                        <button className="icon-button" title="Save" disabled={!canSave}>
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                    </div>
                </div>
                <label className="form__label" htmlFor="course">
                    Course :
                </label>
                <select
                    id="course"
                    name="course"
                    className={`form__select ${validCourseClass}`}
                    multiple={false}
                    size="1"
                    value={course}
                    onChange={onCourseChanged}
                >
                    {options}
                </select>

                <label className="form__label" htmlFor="schedule">
                    Preferred Schedule:{" "}
                </label>
                <input
                    className={`form__input ${validScheduleClass}`}
                    id="schedule"
                    name="schedule"
                    type="schedule"
                    value={schedule}
                    onChange={onScheduleChanged}
                />
            </form>
        </>
    );

    return content;
};
export default NewCourseForm;
