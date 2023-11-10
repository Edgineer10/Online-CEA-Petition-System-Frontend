import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectPetitionById } from "./petitionsApiSlice";
import ViewPetiionForm from "./ViewPetitionForm";

const ViewPetiion = () => {
  const { id } = useParams();
  const user = {
    id: "6548391e52cf6fea690ce3f9",
    courseProg: "BSCpE",
  };
  const petition = useSelector((state) => selectPetitionById(state, id));

  const content = petition ? (
    <ViewPetiionForm petition={petition} user={user} />
  ) : (
    <p>Loading...</p>
  );

  return content;
};
export default ViewPetiion;
