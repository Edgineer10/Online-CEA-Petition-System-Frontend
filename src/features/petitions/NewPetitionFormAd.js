import { useState, useEffect } from "react";
import { useAddNewPetitionMutation } from "./petitionsApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { PROGRAM } from "../../config/program";
import { useGetUsersQuery } from "../users/usersApiSlice";
import Usermatch from "./Usermatch";


const NewCourseFormAd = ({ courses }) => {
    const [addNewPetition, { isLoading, isSuccess, isError, error }] =
        useAddNewPetitionMutation();
    const navigate = useNavigate();
    const { users } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            users: data?.ids.map(id => data?.entities[id])
        }),
    })

    const pOptions = Object.keys(PROGRAM).map((program) => {
        return (
            <option key={program} value={program}>
                {program}
            </option>
        );
    });
    const [program, setProgram] = useState(Object.keys(PROGRAM)[0]);

    const fcourse = Object.values(courses).filter(course => { return course.courseProg.includes(program) })
    const options = fcourse.map((course) => {
        return (
            <option key={course.id} value={course.id}>
                {course.courseCode + " - " + course.descTitle}
            </option>
        )
    });

    const [course, setCourse] = useState(fcourse[0].id);
    const [petitionee, setPetitionee] = useState("");
    const [schedule, setSchedule] = useState("");
    const userfound = users ? users.find(user => { return user.idNumber.replace(/\s/g, '') === petitionee }) : null;
    const choices = users ? users.filter(user => { return user.idNumber.includes(petitionee) && user.role === "Student" }) : null;
    let usermatch = null;

    if (choices) {
        usermatch = <Usermatch key={choices.length} choices={choices} />
    }


    useEffect(() => {
        if (isSuccess) {
            setCourse('')
            setPetitionee()
            setSchedule('')
            navigate("/dash/petitions");
        }
    }, [isSuccess, navigate]);

    const onProgramChanged = (e) => setProgram(e.target.value);
    const onCourseChanged = (e) => setCourse(e.target.value);
    const onScheduleChanged = (e) => setSchedule(e.target.value);
    const onPetitioneeChanged = (e) => setPetitionee(e.target.value);
    const canSave =
        [
            course &&
            schedule &&
            program &&
            petitionee
        ].every(Boolean) && !isLoading;

    const onSavePetitionClicked = async (e) => {
        e.preventDefault();
        console.log(userfound)
        if (canSave && userfound) {
            await addNewPetition({
                course,
                petitionee: [userfound.id],
                schedule
            });
        } else {
            window.alert("No user found")
        }
    };


    const errClass = isError ? "errmsg" : "offscreen";
    const validCourseClass = !course ? "form__input--incomplete" : "";
    const validScheduleClass = !schedule ? "form__input--incomplete" : "";
    const validProgramClass = !program ? "form__input--incomplete" : "";
    const validPetitioneeClass = !petitionee ? "form__input--incomplete" : "";

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
                    Program :
                </label>
                <select
                    id="program"
                    name="program"
                    className={`form__select ${validProgramClass}`}
                    value={program}
                    onChange={onProgramChanged}

                >
                    {pOptions}
                </select>

                <label className="form__label" htmlFor="course">
                    Course :
                </label>
                <select
                    id="course"
                    name="course"
                    className={`form__select ${validCourseClass}`}
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
                    type="text"
                    value={schedule}
                    onChange={onScheduleChanged}
                />

                <label className="form__label" htmlFor="schedule">
                    Initial Petitionee ID Number:{" "}
                </label>
                <input
                    className={`form__input ${validPetitioneeClass}`}
                    id="petitionee"
                    name="petitionee"
                    type="text"
                    value={petitionee}
                    onChange={onPetitioneeChanged}
                />
                {(usermatch && petitionee) && <label className="form__label" htmlFor="schedule">
                    Usermatches:{" "}
                </label>}
                {petitionee && usermatch}
            </form>
        </>
    );

    return content;
};
export default NewCourseFormAd;
