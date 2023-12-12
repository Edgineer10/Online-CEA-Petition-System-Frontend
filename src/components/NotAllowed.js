import { Link } from "react-router-dom";

const NotAllowed = () => {
  const content = (
    <section className="public">
      <header>
        <h1>
          Welcome to{" "}
          <span >UC-CEA Online Petition System!</span>
        </h1>
      </header>
      <main className="public__main">
        <h1>We're very sorry but You Are Not Allowed To View This Page </h1>
        <br />
        <p>Dev: ELJ</p>
      </main>
      <footer>
        <Link to="/">Back to Home</Link>
      </footer>
    </section>
  );
  return content;
};
export default NotAllowed;
