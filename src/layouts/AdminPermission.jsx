import { useSelector } from 'react-redux'
import isAdmin from '../utils/isAdmin'

const AdminPermission = ({children}) => {

  const user = useSelector(state => state.user)

  return (
    <>
        {
            isAdmin(user.role) ? children : <p className='text-red-600 bg-red-400 p-4'>Do not have access</p>
        }
    </>
  )
}

export default AdminPermission