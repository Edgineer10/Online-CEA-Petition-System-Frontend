import { useState, useEffect } from "react";
import {
    useUpdatePetitionMutation,
    useDeletePetitionMutation,
} from "./petitionsApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import PetitionDetails from "./PetitionDetails";
import PetitioneeTable from "./PetitioneeTable";
import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersApiSlice";
import Usermatch from "./Usermatch";

const EditPetitionFormAd = ({ petition, user }) => {
    const [updatePetition, { isLoading, isSuccess, isError, error }] =
        useUpdatePetitionMutation();
    const [
        deletePetition,
        { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
    ] = useDeletePetitionMutation();

    const navigate = useNavigate();

    useEffect(() => {
        if (isSuccess) {
            navigate('/dash/petitions/' + petition.id);
        }
        if (isDelSuccess) {
            navigate(`/dash/petitions/`);
        }
    }, [isSuccess, isDelSuccess, navigate]);



    const [idNumber, setIdNumber] = useState("");
    const users = useSelector(selectAllUsers);
    const aduser = users ? users.find(user => { return user.idNumber === idNumber }) : null;
    let usermatch = null;
    const choices = users ? users.filter(user => { return user.idNumber.includes(idNumber) && user.role === "Student" }) : null;
    if (idNumber.length >= 2 && choices) {
        console.log(choices)
        usermatch = <Usermatch choices={choices} />
    }

    const onDeletePetitionClicked = async (e) => {
        e.preventDefault()
        await deletePetition({ id: petition.id });
    };



    const onAddPetitioneeClicked = async (e) => {

        e.preventDefault();
        if (!isLoading && users) {
            if (aduser && !petition.petitionee.includes(aduser.id) && aduser.role === "Student") {
                await updatePetition({
                    id: petition.id,
                    course: petition.course,
                    schedule: petition.schedule,
                    petitionee: [...petition.petitionee, aduser.id],
                })
            } else {
                window.alert("No User Found")
            }
        }
    };

    const onDeleteStudent = async (id) => {
        if (petition.petitionee.length === 1) {
            window.alert("Warning: You are removing the last student of this petition. Removing the last student means the petition will also have to be deleted. If you wish to do so, proceed deleting the petition by pressing the DELETE button.")
        } else {
            await updatePetition({
                id: petition.id,
                course: petition.course,
                schedule: petition.schedule,
                petitionee: petition.petitionee.filter((userr) => {
                    return userr !== id
                })
            })
        }
    }
    const onIdNumberChanged = (e) => {
        setIdNumber(e.target.value)
    };
    const errClass = isError || isDelError ? "errmsg" : "offscreen";
    const errContent = (error?.data?.message || delerror?.data?.message) ?? "";

    const content = (
        <>
            <p className={errClass}>{errContent}</p>
            <div className="form">
                <div className="form__title-row">
                    <h2>Petition Details</h2>
                    <div className="form__action-buttons">

                        <button
                            className="icon-button"
                            title="Delete"
                            onClick={onDeletePetitionClicked}
                        >
                            <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                    </div>
                </div>
                <PetitionDetails petition={petition} />

                {(user.role === "Admin" || user.role === "Instructor") && <label
                    className="form__label form__checkbox-container"
                    htmlFor="user-active"
                >
                    <label className="form__label" htmlFor="idNumber">
                        Enter Student ID Number:{" "}
                    </label>
                    <input
                        className={`form__input`}
                        id="idNumber"
                        name="idNumber"
                        type="idNumber"
                        value={idNumber}
                        onChange={onIdNumberChanged}
                    />
                    <button
                        id="user-active"
                        name="user-active"
                        type="submit"
                        className="join-button"
                        onClick={onAddPetitioneeClicked}
                    >ADD</button>
                </label>}
                {usermatch}

                <label className="form__label">Petitionee/s: <b>{petition.petitionee.length}</b></label>
                <PetitioneeTable petitionee={petition.petitionee} user={user} onDeleteStudent={onDeleteStudent} />
            </div>
        </>
    );

    return content;
};
export default EditPetitionFormAd;
