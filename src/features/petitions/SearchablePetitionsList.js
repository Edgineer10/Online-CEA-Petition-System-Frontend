import Petition from "./Petition";
import { useSelector } from "react-redux";
import { selectAllPetitions } from "./petitionsApiSlice";
import { useState } from "react";
import {
    faCirclePlus
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import useAuth from "../../hooks/useAuth";


const SearchablePetitionsList = ({ petitions }) => {
    const { id, courseProg, role } = useAuth();
    const user = {
        id: id,
        courseProg: courseProg,
        role: role
    };

    const [filterWord, setFilterWorld] = useState("");
    const onFilterWordChanged = (e) => setFilterWorld(e.target.value)
    let content
    if (petitions) {
        const result = petitions.filter((petition) => {
            return petition.courseCode.toLowerCase().includes(filterWord.toLowerCase()) ||
                petition.courseProg.toString().toLowerCase().includes(filterWord.toLowerCase()) ||
                petition.descTitle.toLowerCase().includes(filterWord.toLowerCase())
        })
        const tableContent = result?.length
            ? result.slice(0, 10).map(petition => <Petition key={petition.id} petitionId={petition.id} user={user} />)
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
                                Search Petitions:{" "}
                            </label>
                            <input
                                className={`form__input`}
                                id="filterWord"
                                name="filterWord"
                                type="filterWord"
                                value={filterWord}
                                onChange={onFilterWordChanged}
                            />

                            {user.role === "Student" && <Link className="naviBut" to="/dash/petitions/new">
                                <FontAwesomeIcon icon={faCirclePlus} /> Create Petition</Link>}
                        </label>

                    </p>

                </div>

                {result.length !== 0 &&
                    <>

                        <br />
                        <p> Displaying top 10 results of search:</p>

                        <table className="table table--petitions">
                            <thead className="table__thead">
                                <tr>
                                    <th scope="col" className="table__th note__status">Course Program/s</th>
                                    <th scope="col" className="table__th note__status">Course Code</th>
                                    <th scope="col" className="table__th note__status">Descriptive Title</th>
                                    <th scope="col" className="table__th note__status">Units</th>
                                    <th scope="col" className="table__th note__status">Schedule</th>
                                    <th scope="col" className="table__th note__status">Petitionee/s</th>
                                    <th scope="col" className="table__th note__status">View/join</th>
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
export default SearchablePetitionsList