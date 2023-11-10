import { useState, useEffect } from "react";
import {
  useUpdatePetitionMutation,
  useDeletePetitionMutation,
} from "./petitionsApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import PetitionDetails from "./PetitionDetails";
import PetitioneeTable from "./PetitioneeTable";

const EditPetitionForm = ({ petition, user }) => {
  const [updatePetition, { isLoading, isSuccess, isError, error }] =
    useUpdatePetitionMutation();
  const [
    deletePetition,
    { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
  ] = useDeletePetitionMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      navigate(`/dash/petitions/${petition.id}`);
    }
    if (isDelSuccess) {
      navigate(`/dash/petitions/`);
    }
  }, [isSuccess, isDelSuccess, navigate]);


  const canSave = !isLoading;

  const [join, setJoin] = useState(petition.petitionee.includes(user.id));

  const onSavePetitionClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      if (!join) {
        await updatePetition({
          id: petition.id,
          course: petition.course,
          schedule: petition.schedule,
          petitionee: [...petition.petitionee, user.id],
        })
        onJoinChanged();
      } else {
        if (petition.petitionee.length === 1) {
          const con = window.confirm("You are the last student in this petition, the petition will be deleted if you wish to continue")
          if (con) onDeletePetitionClicked()
        } else {
          await updatePetition({
            id: petition.id,
            course: petition.course,
            schedule: petition.schedule,
            petitionee: petition.petitionee.filter((userr) => {
              return userr !== user.id
            })
          })
        }
        onJoinChanged();
      }

    }
  };

  const onDeletePetitionClicked = async () => {
    await deletePetition({ id: petition.id });
  };
  const onJoinChanged = () => {
    setJoin((prev) => !prev)

  };
  const errClass = isError || isDelError ? "errmsg" : "offscreen";
  const errContent = (error?.data?.message || delerror?.data?.message) ?? "";

  const content = (
    <>
      <p className={errClass}>{errContent}</p>
      <form className="form" onSubmit={onSavePetitionClicked}>
        <div className="form__title-row">
          <h2>Petition Details</h2>
          <div className="form__action-buttons">
            <button className="icon-button" title="Save" disabled={!canSave}>
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
        <PetitionDetails petition={petition} />
        <label
          className="form__label form__checkbox-container"
          htmlFor="user-active"
        >
          JOIN THIS PETITION:
          <button
            id="user-active"
            name="user-active"
            type="button"
            className={join ? "unjoin-button" : "join-button"}
            onClick={onSavePetitionClicked}
          >{join ? " Unjoin " : " Join "}</button>
        </label>
        <label className="form__label">Petitionee/s: <b>{petition.petitionee.length}</b></label>
        <PetitioneeTable petitionee={petition.petitionee} />
      </form>
    </>
  );

  return content;
};
export default EditPetitionForm;
