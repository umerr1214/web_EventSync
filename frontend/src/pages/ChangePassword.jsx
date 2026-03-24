import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changePassword } from '../features/user/userSlice'

export default function ChangePassword() {
  const [newPassword, setNewPassword] = useState('')
  const dispatch = useDispatch()

  const user = useSelector(state => state.user.currentUser)

  const handleSubmit = (e) => {
    e.preventDefault()

    dispatch(changePassword({
      email: user.email,
      newPassword
    }))

    alert('Password updated successfully!')
    setNewPassword('')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow w-full max-w-md">
        
        <h2 className="text-xl font-bold mb-4">Change Password</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <input
            type="password"
            placeholder="New Password"
            className="w-full p-2 border rounded"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
          />

          <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Update Password
          </button>
        </form>

      </div>
    </div>
  )
}