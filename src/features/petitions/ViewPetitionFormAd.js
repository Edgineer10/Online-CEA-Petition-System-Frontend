import { useState, useEffect } from "react";
import {
    useUpdatePetitionMutation,
    useDeletePetitionMutation,
} from "./petitionsApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faSave } from "@fortawesome/free-solid-svg-icons";
import PetitionDetails from "./PetitionDetails";
import PetitioneeTable from "./PetitioneeTable";
import { useGetUsersQuery } from "../users/usersApiSlice";
import Usermatch from './Usermatch'
import useTitle from "../../hooks/useTitle";
const EditPetitionFormAd = ({ petition, user }) => {
    useTitle('UC-CEA Edit Petition')
    const [updatePetition, { isLoading, isSuccess, isError, error }] =
        useUpdatePetitionMutation();
    const [
        deletePetition,
        { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
    ] = useDeletePetitionMutation();

    const navigate = useNavigate();
    useEffect(() => {
        if (isSuccess) {
            navigate();
        }
        if (isDelSuccess) {
            navigate(`/dash/petitions/`);
        }
        if (navigate) {
            setIdNumber('')
        }
    }, [isSuccess, isDelSuccess, navigate]);



    const [idNumber, setIdNumber] = useState("");
    const [remark, setRemark] = useState(petition.remark);
    const validRemarkClass = !remark ? "form__input--incomplete" : "";

    const onRemarkChanged = (e) => setRemark(e.target.value)

    const { users } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            users: data?.ids.map(id => data?.entities[id])
        }),
    })

    const canSave = [remark].every(Boolean) && !isLoading;
    const aduser = users ? users.find(user => { return user.idNumber.replace(/\s/g, '') === idNumber }) : null;
    const choices = users ? users.filter(user => { return user.idNumber.includes(idNumber) && user.role === "Student" }) : null;

    const usermatch = (idNumber.length >= 2 && choices) ? <Usermatch key={choices.length} choices={choices} /> : null;

    const onDeletePetitionClicked = async (e) => {
        e.preventDefault()
        await deletePetition({ id: petition.id });
    };

    const onAddPetitioneeClicked = async (e) => {
        e.preventDefault();
        if (!isLoading && aduser) {
            if (aduser && !petition.petitionee.includes(aduser.id) && aduser.role === "Student") {
                await updatePetition({
                    id: petition.id,
                    course: petition.course,
                    schedule: petition.schedule,
                    status: petition.status,
                    remark: petition.remark,
                    petitionee: [...petition.petitionee, aduser.id],
                })
            } else {
                if (petition.petitionee.includes(aduser.id)) {
                    window.alert("Student is already in the petition")

                } else {
                    window.alert("No User Found")
                }
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
                remark: petition.remark,
                status: petition.status,
                petitionee: petition.petitionee.filter((userr) => {
                    return userr !== id
                })
            })
        }
    }

    const onSBclicked = async (e) => {
        e.preventDefault();
        console.log(petition.status === "On-going")
        if (petition.status === "On-going") {
            await updatePetition({
                id: petition.id,
                course: petition.course,
                schedule: petition.schedule,
                remark: "SUBJECT OPENED FOR ENROLMENT",
                status: "Opened",
                petitionee: petition.petitionee
            })
            setRemark("SUBJECT OPENED FOR ENROLMENT")
        } else {
            await updatePetition({
                id: petition.id,
                course: petition.course,
                schedule: petition.schedule,
                remark: "WAITING FOR MORE PETITIONEE",
                status: "On-going",
                petitionee: petition.petitionee
            })
            setRemark("WAITING FOR MORE PETITIONEE")
        }


    }

    const onSavePetitionClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await updatePetition({
                id: petition.id,
                course: petition.course,
                schedule: petition.schedule,
                remark: remark,
                status: petition.status,
                petitionee: petition.petitionee
            })
        }
    };

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
                        <button className="icon-button" title="Save" disabled={!canSave}
                            onClick={onSavePetitionClicked}>
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                        <button
                            className="icon-button"
                            title="Delete"
                            onClick={onDeletePetitionClicked}
                        >
                            <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                    </div>
                </div>
                <PetitionDetails petition={petition} onSBclicked={onSBclicked} />
                <label className="form__label" htmlFor="schedule">
                    Remark:{" "}
                </label>
                <input
                    className={`form__input ${validRemarkClass}`}
                    id="remark"
                    name="remark"
                    type="text"
                    value={remark}
                    onChange={onRemarkChanged}
                />
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
