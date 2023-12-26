import { Link, Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
const Welcome = () => {
  const { name, role, isPWSet } = useAuth();
  const isStudent = role === "Student" ? true : false;
  const isAdmin = role === "Admin" ? true : false;
  const isInstructor = role === "Instructor" ? true : false;
  const location = useLocation();
  const date = new Date();
  const today = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "long",
  }).format(date);

  const content = isPWSet ? (
    <section className="welcome">
      <p>{today}</p>

      <h1>Welcome {name}!</h1>
      {(isAdmin || isInstructor || isStudent) && <p><Link to="/dash/petitions">View Petitions</Link></p>}
      {(isAdmin || isInstructor || isStudent) && <p><Link to="/dash/petitions/new">Create Petitions</Link></p>}
      {(isAdmin || isInstructor) && <p><Link to="/dash/courses">View Courses</Link></p>}
      {(isAdmin || isInstructor) && <p><Link to="/dash/courses/new">Add Course</Link></p>}
      {(isAdmin || isInstructor) && <p><Link to="/dash/users">View {isAdmin && "Admin/Instructor/"}Student Information</Link></p>}
      {(isAdmin || isInstructor) && <p><Link to="/dash/users/new">Add {isAdmin && "Admin/Instructor/"}Student</Link></p>}
      {<p><Link to="/dash/user">Edit Password</Link></p>}

    </section>
  ) : <Navigate to="/dash/user" state={{ from: location }} replace />;

  return content;
};
export default Welcome;
