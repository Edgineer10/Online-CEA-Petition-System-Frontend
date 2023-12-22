import { useParams } from "react-router-dom"
import { useGetPetitionsQuery } from "./petitionsApiSlice"
import ViewPetiionForm from "./ViewPetitionForm"
import ViewPetiionFormAd from "./ViewPetitionFormAd"
import useAuth from "../../hooks/useAuth"

const ViewPetiion = () => {
  const { petid } = useParams();

  const { id, courseProg, role } = useAuth();
  const user = {
    id: id,
    courseProg: courseProg,
    role: role
  };

  const { petition } = useGetPetitionsQuery("petitionsList", {
    selectFromResult: ({ data }) => ({
      petition: data?.entities[petid]
    }),
  })

  const petitonform = user.role === "Student" ? <ViewPetiionForm petition={petition} user={user} /> : <ViewPetiionFormAd petition={petition} user={user} />
  const content = petition ? petitonform : <p>Loading...</p>
  return content;
};
export default ViewPetiion;
