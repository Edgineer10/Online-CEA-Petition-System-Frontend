import Petition from "./Petition";
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
    const result = petitions.filter((petition) => {
        return petition.courseCode.toLowerCase().includes(filterWord.toLowerCase()) ||
            petition.courseProg.toString().toLowerCase().includes(filterWord.toLowerCase()) ||
            petition.descTitle.toLowerCase().includes(filterWord.toLowerCase()) ||
            petition.status.toLowerCase().includes(filterWord.toLowerCase())
    })
    // Items per page
    const itemsPerPage = 10;

    // Calculate the total number of pages
    const totalPages = Math.ceil(result.length / itemsPerPage);

    // State to manage the current page
    const [currentPage, setCurrentPage] = useState(1);

    // Calculate the index range for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Get the current page data
    const currentData = result.slice(startIndex, endIndex);

    // Handle page change
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };


    const tableContent = result?.length
        ? currentData.map(petition => <Petition key={petition.id} petitionId={petition.id} user={user} />)
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
                    <div className="pagination">
                        {Array.from({ length: totalPages }).map((_, index) => (
                            <button
                                key={index + 1}
                                className={index + 1 === currentPage ? 'pagBut active' : 'pagBut'}
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </>
            }
        </>
    )


    return content
}
export default SearchablePetitionsList