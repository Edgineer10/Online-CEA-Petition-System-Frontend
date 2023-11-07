import { useState, useEffect } from "react";
import {
  useUpdatePetitionMutation,
  useDeletePetitionMutation,
} from "./petitionsApiSlice";
import { useNavigate } from "react-router-dom";
import User from "../users/User";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import PetitionDetails from "./PetitionDetails";
import PetitioneeTable from "./PetitioneeTable";

const EditPetitionForm = ({ petition }) => {
  const [updatePetition, { isLoading, isSuccess, isError, error }] =
    useUpdatePetitionMutation();
  const [
    deletePetition,
    { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
  ] = useDeletePetitionMutation();

  const navigate = useNavigate();
  const [petitionee, setPetitionee] = useState(petition.petitionee);

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      navigate("/dash/petitions");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const canSave = !isLoading;

  const onSavePetitionClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await updatePetition({
        id: petition.id,
        course: petition.course,
        petitionee,
      });
    }
  };

  const onDeletePetitionClicked = async () => {
    await deletePetition({ id: petition.id });
  };

  const content = (
    <>
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

        <label className="form__label">Petitionee/s: </label>
        <PetitioneeTable petitionee={petition.petitionee} />
      </form>
    </>
  );

  return content;
};
export default EditPetitionForm;
