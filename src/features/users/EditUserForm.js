import { useState, useEffect } from "react";
import { useUpdateUserMutation, useDeleteUserMutation } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { PROGRAM } from "../../config/program";

const EditUserForm = ({ user }) => {
  const [updateUser, { isLoading, isSuccess, isError, error }] =
    useUpdateUserMutation();

  const [
    deleteUser,
    { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
  ] = useDeleteUserMutation();

  const navigate = useNavigate();

  const [idNumber, setIdNumber] = useState(user.idNumber);
  const [password, setPassword] = useState(user.password);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [middleName, setMiddleName] = useState(user.middleName);
  const [birthday, setBirthday] = useState(user.birthday);
  const [year, setYear] = useState(user.year);
  const [courseProg, setCourseProg] = useState(user.courseProg);
  const [active, setActive] = useState(user.active);
  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setIdNumber("");
      setPassword("");
      setFirstName("");
      setLastName("");
      setMiddleName("");
      setBirthday("");
      setYear("");
      setCourseProg("");
      navigate("/dash/users");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const onIdNumberChanged = (e) => setIdNumber(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);
  const onFirstNameChanged = (e) => setFirstName(e.target.value);
  const onLastNameChanged = (e) => setLastName(e.target.value);
  const onMiddleNameChanged = (e) => setMiddleName(e.target.value);
  const onBirthdayChanged = (e) => setBirthday(e.target.value);
  const onYearChanged = (e) => setYear(e.target.value);
  const onCourseProgChanged = (e) => setCourseProg(e.target.value);
  const onActiveChanged = () => setActive((prev) => !prev);

  const canSave =
    [
      !idNumber ||
        !firstName ||
        !lastName ||
        !middleName ||
        !birthday ||
        !year ||
        !courseProg,
    ].every(Boolean) && !isLoading;

  const onSaveUserClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      console.log(
        idNumber +
          firstName +
          lastName +
          middleName +
          birthday +
          year +
          courseProg +
          active
      );
      if (password) {
        await updateUser({
          idNumber,
          password,
          firstName,
          lastName,
          middleName,
          birthday,
          year,
          courseProg,
          active,
        });
      } else {
        await updateUser({
          idNumber,
          firstName,
          lastName,
          middleName,
          birthday,
          year,
          courseProg,
          active,
        });
      }
    }
  };
  const onDeleteUserClicked = async () => {
    await deleteUser({ id: user.id });
  };

  const options = Object.keys(PROGRAM).map((program) => {
    return (
      <option key={program} value={program}>
        {program}
      </option>
    );
  });

  const errClass = isError || isDelError ? "errmsg" : "offscreen";
  const validNumberClass = !idNumber ? "form__input--incomplete" : "";
  const validPasswordClass = !password ? "form__input--incomplete" : "";
  const validFirstNameClass = !firstName ? "form__input--incomplete" : "";
  const validLastNameClass = !lastName ? "form__input--incomplete" : "";
  const validMiddleNameClass = !middleName ? "form__input--incomplete" : "";
  const validBirthdayClass = !birthday ? "form__input--incomplete" : "";
  const validYearClass = !year ? "form__input--incomplete" : "";
  const validCourseProgClass = !courseProg ? "form__input--incomplete" : "";
  const Bdate = new Date(user.birthday);

  const errContent = (error?.data?.message || delerror?.data?.message) ?? "";

  const content = (
    <>
      <p className={errClass}>{error?.data?.message}</p>

      <form className="form" onSubmit={onSaveUserClicked}>
        <div className="form__title-row">
          <h2>Edit User</h2>
          <div className="form__action-buttons">
            <button className="icon-button" title="Save" disabled={!canSave}>
              <FontAwesomeIcon icon={faSave} />
            </button>
            <button
              className="icon-button"
              title="Delete"
              onClick={onDeleteUserClicked}
            >
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
          </div>
        </div>
        <label className="form__label" htmlFor="idnumber">
          ID Number:
        </label>
        <input
          className={`form__input ${validNumberClass}`}
          id="idnumber"
          name="idnumber"
          type="text"
          autoComplete="off"
          value={idNumber}
          onChange={onIdNumberChanged}
        />

        <label className="form__label" htmlFor="password">
          Password:{" "}
        </label>
        <input
          className={`form__input ${validPasswordClass}`}
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={onPasswordChanged}
        />
        <label className="form__label" htmlFor="firstname">
          First Name:
        </label>
        <input
          className={`form__input ${validFirstNameClass}`}
          id="firstname"
          name="firstname"
          type="text"
          autoComplete="off"
          value={firstName}
          onChange={onFirstNameChanged}
        />
        <label className="form__label" htmlFor="middleName">
          Middle Name:
        </label>
        <input
          className={`form__input ${validMiddleNameClass}`}
          id="middlename"
          name="middlename"
          type="text"
          autoComplete="off"
          value={middleName}
          onChange={onMiddleNameChanged}
        />

        <label className="form__label" htmlFor="lastname">
          Last Name:
        </label>
        <input
          className={`form__input ${validLastNameClass}`}
          id="lastname"
          name="lastname"
          type="text"
          autoComplete="off"
          value={lastName}
          onChange={onLastNameChanged}
        />
        <label className="form__label" htmlFor="birthday">
          Birthday:
        </label>
        <input
          className={`form__input ${validBirthdayClass}`}
          id="birthday"
          name="birthday"
          type="date"
          autoComplete="off"
          value={
            Bdate.getFullYear() +
            "-" +
            (Bdate.getMonth() + 1) +
            "-" +
            Bdate.getDate()
          }
          onChange={onBirthdayChanged}
        />
        <label className="form__label" htmlFor="year">
          Year:
        </label>
        <input
          className={`form__input ${validYearClass}`}
          id="year"
          name="year"
          type="number"
          autoComplete="off"
          value={year}
          onChange={onYearChanged}
        />

        <label className="form__label" htmlFor="program">
          Course Program:
        </label>
        <select
          id="program"
          name="program"
          className={`form__select ${validCourseProgClass}`}
          size="1"
          onChange={onCourseProgChanged}
        >
          {options}
        </select>
        <label
          className="form__label form__checkbox-container"
          htmlFor="user-active"
        >
          ACTIVE:
          <input
            className="form__checkbox"
            id="user-active"
            name="user-active"
            type="checkbox"
            checked={active}
            onChange={onActiveChanged}
          />
        </label>
      </form>
    </>
  );

  return content;
};
export default EditUserForm;
