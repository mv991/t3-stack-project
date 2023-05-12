
import { useSession } from 'next-auth/react'

function ProfilePage() {
  const {data:session} = useSession()
  return (
   <div>
        <h2>Welcome Back {session?.user.email}</h2>
       
   </div>
  )
}

export default ProfilePage