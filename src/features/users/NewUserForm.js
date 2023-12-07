import { useState, useEffect } from "react";
import { useAddNewUserMutation } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { PROGRAM } from "../../config/program";
import { ROLE } from "../../config/role";
import useAuth from "../../hooks/useAuth";
import useTitle from "../../hooks/useTitle";

const NewUserForm = () => {
    useTitle('UC-CEA Add New User')

    const { role: userrole } = useAuth();
    const [addNewUser, { isLoading, isSuccess, isError, error }] =
        useAddNewUserMutation();

    const navigate = useNavigate();
    const options = Object.keys(PROGRAM).map((program, i) => {
        return (
            <option key={program} value={program}>
                {Object.values(PROGRAM)[i]}
            </option>
        );
    });
    const roleoptions = Object.keys(ROLE).map((role, i) => {
        return (
            <option key={role} value={role}>
                {Object.values(ROLE)[i]}
            </option>
        );
    })


    const [idNumber, setIdNumber] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("Student");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [birthday, setBirthday] = useState("");
    const [year, setYear] = useState(1);
    const [courseProg, setCourseProg] = useState("BSCE");

    useEffect(() => {
        if (isSuccess) {
            setIdNumber("");
            setPassword("");
            setRole("");
            setFirstName("");
            setLastName("");
            setMiddleName("");
            setBirthday("");
            setYear("");
            setCourseProg("");
            navigate("/dash/users");
        }
    }, [isSuccess, navigate]);

    const onIdNumberChanged = (e) => setIdNumber(e.target.value);
    const onPasswordChanged = (e) => setPassword(e.target.value);
    const onRoleChanged = (e) => setRole(e.target.value);
    const onFirstNameChanged = (e) => setFirstName(e.target.value);
    const onLastNameChanged = (e) => setLastName(e.target.value);
    const onMiddleNameChanged = (e) => setMiddleName(e.target.value);
    const onBirthdayChanged = (e) => setBirthday(e.target.value);
    const onYearChanged = (e) => setYear(e.target.value);
    const onCourseProgChanged = (e) => {
        setCourseProg(e.target.value)
        console.log(e.target.value)
    };

    const canSave =
        [
            idNumber ||
            password ||
            role ||
            firstName ||
            lastName ||
            middleName ||
            birthday ||
            year ||
            courseProg,
        ].every(Boolean) && !isLoading;

    const onSaveUserClicked = async (e) => {
        e.preventDefault();
        if (canSave) {
            await addNewUser({
                idNumber: idNumber.replace(/\s/g, ''),
                password,
                role,
                firstName,
                lastName,
                middleName,
                birthday,
                year,
                courseProg,
            });
        }
    };


    const errClass = isError ? "errmsg" : "offscreen";
    const validNumberClass = !idNumber ? "form__input--incomplete" : "";
    const validPasswordClass = !password ? "form__input--incomplete" : "";
    const validRoleClass = !role ? "form__input--incomplete" : "";
    const validFirstNameClass = !firstName ? "form__input--incomplete" : "";
    const validLastNameClass = !lastName ? "form__input--incomplete" : "";
    const validMiddleNameClass = !middleName ? "form__input--incomplete" : "";
    const validBirthdayClass = !birthday ? "form__input--incomplete" : "";
    const validYearClass = !year ? "form__input--incomplete" : "";
    const validCourseProgClass = !courseProg ? "form__input--incomplete" : "";

    const content = (
        <>
            <p className={errClass}>{error?.data?.message}</p>

            <form className="form" onSubmit={onSaveUserClicked}>
                <div className="form__title-row">
                    <h2>New User</h2>
                    <div className="form__action-buttons">
                        <button className="icon-button" title="Save" disabled={!canSave}>
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                    </div>
                </div>
                <label className="form__label" htmlFor="idnumber">
                    ID Number: <span className="nowrap">[3-20 letters]</span>
                </label>
                <input
                    className={`form__input ${validNumberClass}`}
                    id="idnumber"
                    name="idnumber"
                    type="text"
                    autoComplete="off"
                    value={idNumber}
                    onChange={onIdNumberChanged}
                />

                <label className="form__label" htmlFor="password">
                    Password:{" "}
                </label>
                <input
                    className={`form__input ${validPasswordClass}`}
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={onPasswordChanged}
                />
                {userrole === "Admin" &&
                    <>
                        <label className="form__label" htmlFor="role">
                            Role:
                        </label>
                        <select
                            id="role"
                            name="role"
                            className={`form__select ${validRoleClass}`}
                            multiple={false}
                            size="1"
                            value={role}
                            onChange={onRoleChanged}
                        >
                            {roleoptions}
                        </select>
                    </>
                }
                <label className="form__label" htmlFor="firstname">
                    First Name: <span className="nowrap">[3-20 letters]</span>
                </label>
                <input
                    className={`form__input ${validFirstNameClass}`}
                    id="firstname"
                    name="firstname"
                    type="text"
                    autoComplete="off"
                    value={firstName}
                    onChange={onFirstNameChanged}
                />
                <label className="form__label" htmlFor="middleName">
                    Middle Name: <span className="nowrap">[3-20 letters]</span>
                </label>
                <input
                    className={`form__input ${validMiddleNameClass}`}
                    id="middlename"
                    name="middlename"
                    type="text"
                    autoComplete="off"
                    value={middleName}
                    onChange={onMiddleNameChanged}
                />

                <label className="form__label" htmlFor="lastname">
                    Last Name: <span className="nowrap">[3-20 letters]</span>
                </label>
                <input
                    className={`form__input ${validLastNameClass}`}
                    id="lastname"
                    name="lastname"
                    type="text"
                    autoComplete="off"
                    value={lastName}
                    onChange={onLastNameChanged}
                />
                <label className="form__label" htmlFor="birthday">
                    Birthday:
                </label>
                <input
                    className={`form__input ${validBirthdayClass}`}
                    id="birthday"
                    name="birthday"
                    type="date"
                    autoComplete="off"
                    value={birthday}
                    onChange={onBirthdayChanged}
                />
                <label className="form__label" htmlFor="year">
                    Year:
                </label>
                <input
                    className={`form__input ${validYearClass}`}
                    id="year"
                    name="year"
                    type="number"
                    autoComplete="off"
                    value={year}
                    onChange={onYearChanged}
                />

                <label className="form__label" htmlFor="program">
                    Course Program / Department:
                </label>
                <select
                    id="program"
                    name="program"
                    className={`form__select ${validCourseProgClass}`}
                    multiple={false}
                    size="1"
                    value={courseProg}
                    onChange={onCourseProgChanged}
                >
                    {options}
                </select>
            </form>
        </>
    );

    return content;
};
export default NewUserForm;
