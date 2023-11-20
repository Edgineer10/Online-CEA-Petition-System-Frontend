import User from "./User";
import { useSelector } from "react-redux";
import { selectAllUsers } from "./usersApiSlice";
import { useState } from "react";
import {
    faUserPlus
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

const SearchableUsersList = () => {
    const users = useSelector(selectAllUsers);
    const [filterWord, setFilterWorld] = useState("");
    const onFilterWordChanged = (e) => setFilterWorld(e.target.value)
    let content
    if (users) {
        const result = users.filter((user) => {
            return user.idNumber.toLowerCase().includes(filterWord.toLowerCase()) ||
                user.firstName.toLowerCase().includes(filterWord.toLowerCase()) ||
                user.lastName.toLowerCase().includes(filterWord.toLowerCase()) ||
                user.middleName.toLowerCase().includes(filterWord.toLowerCase()) ||
                user.courseProg.toLowerCase().includes(filterWord.toLowerCase()) ||
                user.role.toLowerCase().includes(filterWord.toLowerCase())
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
                            <label className="form__label" htmlFor="filterWord">
                                Search Users:{" "}
                            </label>
                            <input
                                className={`form__input`}
                                id="filterWord"
                                name="filterWord"
                                type="filterWord"
                                value={filterWord}
                                onChange={onFilterWordChanged}
                            />

                            <Link className="naviBut" to="/dash/users/new">

                                <FontAwesomeIcon icon={faUserPlus} /> Add User</Link>
                        </label>

                    </p>

                </div>

                {result.length !== 0 &&
                    <>

                        <br />
                        <p> Displaying top 10 results of search:</p>

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