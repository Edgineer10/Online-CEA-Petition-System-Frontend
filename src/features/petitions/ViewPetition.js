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
  let content = null

  const { petition } = useGetPetitionsQuery("petitionsList", {
    selectFromResult: ({ data }) => ({
      petition: data?.entities[petid]
    }),
  })


  if (user.role === "Student") {
    content = petition ? (
      <ViewPetiionForm petition={petition} user={user} />
    ) : (
      <p>Loading...</p>
    );
  } else {
    content = petition ? (
      <ViewPetiionFormAd petition={petition} user={user} />
    ) : (
      <p>Loading...</p>
    )
  }

  return content;
};
export default ViewPetiion;
