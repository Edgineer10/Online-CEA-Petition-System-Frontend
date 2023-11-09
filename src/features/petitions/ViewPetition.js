import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectPetitionById } from "./petitionsApiSlice";
import ViewPetiionForm from "./ViewPetitionForm";

const ViewPetiion = () => {
  const { id } = useParams();
  const user = {
    id: "6541afcbe5106beb14681501",
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
