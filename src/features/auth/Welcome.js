import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
const Welcome = () => {
  const { name, idNumber, role } = useAuth();
  const isStudent = role === "Student" ? true : false;
  const isAdmin = role === "Admin" ? true : false;
  const isInstructor = role === "Instructor" ? true : false;

  const date = new Date();
  const today = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "long",
  }).format(date);

  const content = (
    <section className="welcome">
      <p>{today}</p>

      <h1>Welcome {name}!</h1>
      {(isStudent) && <p><Link to="/dash/petitions">View Petitions</Link></p>}
      {(isStudent) && <p><Link to="/dash/petitions/new">Create Petition</Link></p>}
      {(isAdmin) && <p><Link to="/dash/courses">View Courses</Link></p>}
      {(isAdmin || isInstructor || isStudent) && <p><Link to="/dash/users">View/Edit Student Information</Link></p>}
      {(isAdmin || isInstructor || isStudent) && <p><Link to="/dash/users/new">Add Admin/Instructor/Student</Link></p>}

    </section>
  );

  return content;
};
export default Welcome;
