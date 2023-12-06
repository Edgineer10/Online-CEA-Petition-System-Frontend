import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Public from "./components/Public";
import Login from "./features/auth/Login";
import DashLayout from "./components/DashLayout.js";
import Welcome from "./features/auth/Welcome";
import CoursesList from "./features/courses/CoursesList";
import UsersList from "./features/users/UsersList";
import EditUser from "./features/users/EditUser";
import NewUserForm from "./features/users/NewUserForm";
import EditCourse from "./features/courses/EditCourse";
import NewCourse from "./features/courses/NewCourse";
import Prefetch from "./features/auth/Prefetch.js";
import NewPetition from "./features/petitions/NewPetition.js";
import PetitionsList from "./features/petitions/PetitionsList.js";
import ViewPetiion from "./features/petitions/ViewPetition.js";
import PersistLogin from "./features/auth/PersistLogin.js";
import ViewPetiionAd from "./features/petitions/ViewPetition.js";
import EditPasword from "./features/users/EditPassword.js";
import RequireAuth from "./features/auth/RequireAuth.js";
import NotAllowed from "./components/NotAllowed.js";
import { ROLE } from "./config/role.js";

function App() {
  return (
    //Establishing routes for the web application and assigning elements for every rout
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} /> {/* Index route with the Public element */}
        <Route path="login" element={<Login />} /> {/* Login route with the Login element */}
        <Route path="notallowed" element={<NotAllowed />} /> {/* redirection route with the NotAllowed element */}

        <Route element={<PersistLogin />}>{/* Implements the Persist Login */}
          <Route element={<RequireAuth allowedRoles={Object.values(ROLE)} />}> {/*Requires Authentication for the routes*/}
            <Route element={<Prefetch />}> {/*Implements fetching queries*/}
              <Route path="dash" element={<DashLayout />}>{/*Dashboard routes and Elements*/}
                <Route index element={<Welcome />} />
                <Route path="user">{/*User Details and change Password*/}
                  <Route index element={<EditPasword />} />
                </Route>
                <Route
                  element={
                    <RequireAuth allowedRoles={[ROLE.Admin, ROLE.Instructor]} />
                  }
                >
                  <Route path="users"> {/*Users path route*/}
                    <Route index element={<UsersList />} />
                    <Route path=":id" element={<EditUser />} />
                    <Route path="new" element={<NewUserForm />} />
                  </Route>

                  <Route path="courses"> {/*Courses path route*/}
                    <Route index element={<CoursesList />} />
                    <Route path=":id" element={<EditCourse />} />
                    <Route path="new" element={<NewCourse />} />
                  </Route>
                </Route>
                <Route path="petitions"> {/*Petitions path route*/}
                  <Route index element={<PetitionsList />} />

                  <Route
                    element={<RequireAuth allowedRoles={[ROLE.Student]} />}
                  >
                    <Route path="new" element={<NewPetition />} />
                  </Route>
                  <Route
                    element={
                      <RequireAuth
                        allowedRoles={[ROLE.Admin, ROLE.Instructor]}
                      />
                    }
                  >
                    <Route path="edit/:petid" element={<ViewPetiionAd />} />
                  </Route>
                  <Route path=":petid" element={<ViewPetiion />} />
                </Route>
              </Route>
            </Route>
          </Route>
          {/* End Dash */}
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
