import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFileCirclePlus,
  faList,
  faRightFromBracket,
  faIdCard,
  faFile
} from "@fortawesome/free-solid-svg-icons"
import { useNavigate, Link, useLocation } from 'react-router-dom'

import { useSendLogoutMutation } from '../features/auth/authApiSlice'
import useAuth from '../hooks/useAuth'

const DASH_REGEX = /^\/dash(\/)?$/
const PETITIONS_REGEX = /^\/dash\/petitions(\/)?$/
const USERS_REGEX = /^\/dash\/users(\/)?$/
const COURSES_REGEX = /^\/dash\/courses(\/)?$/

const DashHeader = () => {
  const { role } = useAuth()

  const navigate = useNavigate()
  const { pathname } = useLocation()

  const [sendLogout, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useSendLogoutMutation()

  useEffect(() => {
    if (isSuccess) navigate('/')
  }, [isSuccess, navigate])

  if (isLoading) return <p>Logging Out...</p>

  if (isError) return <p>Error: {error.data?.message}</p>

  let dashClass = null
  if (!DASH_REGEX.test(pathname) && !PETITIONS_REGEX.test(pathname)) {
    dashClass = "dash-header__container--small"
  }

  let newPetitionButton = null
  if (PETITIONS_REGEX.test(pathname) && role === "Student") {
    newPetitionButton = (

      <Link className="naviBut" to="/dash/petitions/new"><FontAwesomeIcon icon={faFileCirclePlus} /> Create Petition</Link>

    )
  }



  let PetitionButton = null
  if (!PETITIONS_REGEX.test(pathname) && !DASH_REGEX.test(pathname) && pathname.includes('/dash')) {
    console.log("Petition")
    PetitionButton = (

      <Link className="naviBut" to="/dash/petitions"><FontAwesomeIcon icon={faFile} /> View Petitions</Link>
    )
  }
  let UserButton = null
  if (!USERS_REGEX.test(pathname) && !DASH_REGEX.test(pathname) && pathname.includes('/dash') && (role === "Admin" || role === "Instructor")) {
    console.log("User")
    UserButton = (
      <Link className="naviBut" to="/dash/users"><FontAwesomeIcon icon={faIdCard} /> View {role === "Instructor" ? "Students" : "Users"} </Link>

    )
  }
  let CourseButton = null
  if (!COURSES_REGEX.test(pathname) && !DASH_REGEX.test(pathname) && pathname.includes('/dash') && (role === "Admin" || role === "Instructor")) {
    console.log("Course")
    CourseButton = (
      <Link className="naviBut" to="/dash/courses">
        <FontAwesomeIcon icon={faList} /> View Courses</Link>
    )
  }

  const logoutButton = (
    <button
      className="icon-button"
      title="Logout"
      onClick={sendLogout}
    >
      <FontAwesomeIcon icon={faRightFromBracket} />
    </button>
  )

  let buttonContent
  if (isLoading) {
    buttonContent = <p>Logging Out...</p>
  } else {
    buttonContent = (
      <>
        {newPetitionButton}
        {PetitionButton}
        {UserButton}
        {CourseButton}
        {logoutButton}
      </>
    )
  }

  const content = (
    <header className="dash-header">
      <div className={`dash-header__container ${dashClass}`}>
        <Link to="/dash">
          <h1 className="dash-header__title">UC-CEA Online Petition System</h1>
        </Link>
        <nav className="dash-header__nav">
          {buttonContent}
        </nav>
      </div>
    </header>
  )

  return content
}
export default DashHeader