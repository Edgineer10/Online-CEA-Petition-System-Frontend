import { Link } from "react-router-dom";

const Public = () => {
  const content = (
    <section className="public">
      <header>
        <h1>
          Welcome to{" "}
          <span className="nowrap">UC-CEA Online Petition System!</span>
        </h1>
      </header>
      <main className="public__main">
        <p>
          Thank you for visiting the Online Subject Petition System. This system is designed to make it easy for students to petition for changes to their subject schedules.
        </p>
        <address className="public__addr">
          To get started, please log in to your existing account. Once you are logged in, you will be able to submit a new petition, view the status of your existing petitions, and track the progress of your petitions.
        </address>
        <br />
        <p>Dev: ELJ</p>
      </main>
      <footer>
        <Link to="/login">Student Login</Link>
      </footer>
    </section>
  );
  return content;
};
export default Public;
