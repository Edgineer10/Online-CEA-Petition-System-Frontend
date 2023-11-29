import { store } from '../../app/Store'
import { coursesApiSlice } from '../courses/coursesApiSlice';
import { usersApiSlice } from '../users/usersApiSlice';
import { petitionsApiSlice } from '../petitions/petitionsApiSlice';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const Prefetch = () => {

  useEffect(() => {
    store.dispatch(coursesApiSlice.util.prefetch('getCourses', 'coursesList', { force: true }))
    store.dispatch(petitionsApiSlice.util.prefetch('getPetitions', 'petitionsList', { force: true }))
    store.dispatch(usersApiSlice.util.prefetch('getUsers', 'usersList', { force: true }))
  }, [])

  return <Outlet />
}
export default Prefetch