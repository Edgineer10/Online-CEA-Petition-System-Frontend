import { Link } from "react-router-dom";

const Welcome = () => {
  const date = new Date();
  const today = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "long",
  }).format(date);

  const content = (
    <section className="welcome">
      <p>{today}</p>

      <h1>Welcome!</h1>
      <p>
        <Link to="/dash/courses">View Petitions</Link>
      </p>
      <p>
        <Link to="/dash/courses">Create Petition</Link>
      </p>
      <p>
        <Link to="/dash/courses">View Courses</Link>
      </p>
      <p>
        <Link to="/dash/users">View/Edit Student Information</Link>
      </p>
    </section>
  );

  return content;
};
export default Welcome;
