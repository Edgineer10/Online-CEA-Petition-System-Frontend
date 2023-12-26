import { useState, useEffect } from "react";
import { useUpdateUserMutation } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";

const EditPasswordForm = ({ user }) => {
    const [updateUser, { isLoading, isSuccess, isError, error }] =
        useUpdateUserMutation();


    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");


    console.log();
    useEffect(() => {
        if (isSuccess) {
            setPassword("");
            setPassword2("");
            navigate("/login");
        }
    }, [isSuccess, navigate]);

    const onPasswordChanged = (e) => setPassword(e.target.value);
    const onPassword2Changed = (e) => setPassword2(e.target.value);
    const canSave =
        [
            password.length !== 0, password === password2
        ].every(Boolean) && !isLoading;

    const onSaveUserClicked = async (e) => {
        e.preventDefault();
        if (canSave) {
            await updateUser({
                id: user.id,
                idNumber: user.idNumber,
                password: password,
                role: user.role,
                firstName: user.firstName,
                lastName: user.lastName,
                middleName: user.middleName,
                birthday: user.birthday,
                year: user.year,
                gender: user.gender,
                currYear: user.currYear,
                courseProg: user.courseProg,
                active: user.active,
            });
        }
    };



    const errClass = isError ? "errmsg" : "offscreen";
    const validPasswordClass = !password ? "form__input--incomplete" : "";
    const Bdate = new Date(user.birthday);

    const errContent = (error?.data?.message) ?? "";

    const content = (
        <>
            <p className={errClass}>{errContent}</p>

            <form className="form" onSubmit={onSaveUserClicked}>
                <div className="form__title-row">
                    <h2>Edit Password</h2>
                    <div className="form__action-buttons">
                        <button className="icon-button" title="Save" disabled={!canSave}>
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                    </div>
                </div>
                <h3 >
                    Student Details:
                </h3>
                <table className="table table--users">
                    <thead className="table__thead">
                        <tr>
                            <th scope="col" className="table__th user__username">
                                ID Number
                            </th>
                            <th scope="col" className="table__th user__roles">
                                Name
                            </th>
                            <th scope="col" className="table__th user__roles">
                                Course & Year / Department
                            </th>
                            <th scope="col" className="table__th user__edit">
                                Birthday
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="table__row user">
                            <td className={`table__cell `}>{user.idNumber}</td>
                            <td className={`table__cell `}>
                                {user.lastName + ", " + user.firstName + " " + user.middleName}
                            </td>
                            <td className={`table__cell `}>
                                {user.courseProg + " " + user.year}
                            </td>
                            <td className={`table__cell `}>
                                {
                                    Bdate.getFullYear() +
                                    "-" +
                                    (Bdate.getMonth() + 1) +
                                    "-" +
                                    Bdate.getDate()
                                }
                            </td>
                        </tr>


                    </tbody>
                </table>

                <label className="form__label" htmlFor="password">
                    Enter Password:{" "}
                </label>
                <input
                    className={`form__input ${validPasswordClass}`}
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={onPasswordChanged}
                />
                <label className="form__label" htmlFor="password">
                    Re-enter Password:{" "}
                </label>
                <input
                    className={`form__input ${validPasswordClass}`}
                    id="password2"
                    name="password2"
                    type="password"
                    value={password2}
                    onChange={onPassword2Changed}
                />


            </form>
        </>
    );

    return content;
};
export default EditPasswordForm;
