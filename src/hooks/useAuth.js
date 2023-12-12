import { useSelector } from 'react-redux'
import { selectCurrentToken } from "../features/auth/authSlice"
import jwtDecode from 'jwt-decode'

const useAuth = () => {
    const token = useSelector(selectCurrentToken)

    if (token) {
        const decoded = jwtDecode(token)
        const { name, idNumber, id, courseProg, role } = decoded.UserInfo
        return { name, idNumber, role, id, courseProg }
    }
    return { name: '', idNumber: '', id: '', courseProg: '', role: '' }
}
export default useAuth