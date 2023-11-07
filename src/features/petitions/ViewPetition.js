import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectPetitionById } from "./petitionsApiSlice";
import ViewPetiionForm from "./ViewPetitionForm";

const ViewPetiion = () => {
    const { id } = useParams();

    const petition = useSelector((state) => selectPetitionById(state, id));

    const content = petition ? <ViewPetiionForm petition={petition} /> : <p>Loading...</p>;

    return content;
};
export default ViewPetiion;
