import User from "./User";
import { useState } from "react";
import {
    faUserPlus, faSearch
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import useAuth from "../../hooks/useAuth";
import { ROLE } from "../../config/role";
import { PROGRAM } from "../../config/program";
import { useGetUsersQuery } from "./usersApiSlice";

const SearchableUsersList = () => {

    const { users } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            users: data?.ids.map((id) => data?.entities[id]),
        }),
    });

    const { role } = useAuth();


    const roleoptions = Object.keys(ROLE).map((role, i) => {
        return (
            <option key={role} value={role}>
                {Object.values(ROLE)[i]}
            </option>
        );
    });

    const pOptions = Object.keys(PROGRAM).map((proram, i) => {
        return (
            <option key={proram} value={proram}>
                {Object.values(PROGRAM)[i]}
            </option>
        );
    });


    const [userRole, setUserRole] = useState(Object.keys(ROLE)[0]);
    const [userProgram, setUserProgram] = useState(Object.keys(PROGRAM)[0]);
    const [userYear, setUserYear] = useState("1");
    const [userGender, setUserGender] = useState("Male");
    const [userCurrYear, setUserCurrYear] = useState("2023");

    const validRoleClass = !userRole ? "form__input--incomplete" : "";
    const validUserProgramClass = !userProgram ? "form__input--incomplete" : "";
    const validUserYearClass = !userYear ? "form__input--incomplete" : "";
    const validUserGenderClass = !userGender ? "form__input--incomplete" : "";
    const validUserCurrYearClass = !userCurrYear ? "form__input--incomplete" : "";

    const onUserRoleChanged = (e) => setUserRole(e.target.value)
    const onUserProgramChanged = (e) => setUserProgram(e.target.value)
    const onUserYearChanged = (e) => setUserYear(e.target.value)
    const onUserGenderChanged = (e) => setUserGender(e.target.value)
    const onUserCurrYearChanged = (e) => setUserCurrYear(e.target.value)

    let content

    if (users) {
        const result = users.filter((user) => {
            if (userRole === "Student") {
                return user.courseProg.toString() === userProgram.toString() && user.year.toString() === userYear.toString() && user.gender.toString() === userGender.toString() && user.currYear.toString() === userCurrYear.toString()
            } else if (userRole === "Admin") {
                return user.role === "Admin"
            }
            else {
                return user.role !== "Student" && user.role !== "Admin" && user.courseProg === userProgram && user.gender === userGender

            }
        })
        const tableContent = result?.length
            ? result.slice(0, 10).map(user => <User key={user.id} userId={user.id} />)
            : null

        content = (
            <>
                <div className="form">
                    <p>
                        <label
                            className="form__label form__checkbox-container"
                            htmlFor="user-active"
                        >
                            <Link className="naviBut" to="/dash/users">
                                <FontAwesomeIcon icon={faSearch} /> Search by keyword</Link>
                            <Link className="naviBut" to="/dash/users/new">
                                <FontAwesomeIcon icon={faUserPlus} /> Add {role === "Instructor" ? "Student" : "User"}</Link>
                        </label>
                    </p>
                    {(role === "Admin") && <><label className="form__label" htmlFor="course">
                        Role :
                    </label>
                        <select
                            id="role"
                            name="role"
                            className={`form__select ${validRoleClass}`}
                            value={userRole}
                            onChange={onUserRoleChanged}
                        >
                            {roleoptions}
                        </select></>
                    }
                    {
                        userRole !== "Admin" &&
                        <>
                            <label className="form__label" htmlFor="course">
                                Program :
                            </label>
                            <select
                                id="program"
                                name="program"
                                className={`form__select ${validUserProgramClass}`}
                                value={userProgram}
                                onChange={onUserProgramChanged}

                            >
                                {pOptions}
                            </select>

                        </>
                    }

                    {
                        userRole === "Student" &&
                        <>
                            <label className="form__label" htmlFor="curryear">
                                Year:{" "}
                            </label>
                            <input
                                className={`form__input ${validUserYearClass}`}
                                id="courseYear"
                                name="courseYear"
                                type="number"
                                value={userYear}
                                onChange={onUserYearChanged}
                            />
                        </>}


                    {
                        userRole !== "Admin" &&
                        <>
                            <label className="form__label" htmlFor="gender">
                                Gender:
                            </label>
                            <select
                                id="gender"
                                name="gender"
                                className={`form__select ${validUserGenderClass}`}
                                multiple={false}
                                size="1"
                                value={userGender}
                                onChange={onUserGenderChanged}
                            >
                                <option key="Male" value="Male">
                                    Male
                                </option>
                                <option key="Female" value="Female">
                                    Female
                                </option>
                            </select>
                        </>
                    }


                    {userRole === "Student" && <>
                        <label className="form__label" htmlFor="curryear">
                            Curriculum Year:{" "}
                        </label>
                        <input
                            className={`form__input ${validUserCurrYearClass}`}
                            id="curryear"
                            name="curryear"
                            type="number"
                            value={userCurrYear}
                            onChange={onUserCurrYearChanged}
                        />
                    </>}
                </div>

                {result.length !== 0 &&
                    <>

                        <br />
                        <p> Displaying search results:</p>

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
                                        Course & Year
                                    </th>
                                    <th scope="col" className="table__th user__edit">
                                        Edit
                                    </th>
                                </tr>
                            </thead>
                            <tbody>{tableContent}</tbody>
                        </table>
                    </>
                }
            </>
        )
    }

    return content
}
export default SearchableUsersList