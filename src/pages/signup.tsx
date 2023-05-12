
import { useState } from 'react';
import { api } from "~/utils/api";
import { useRouter } from 'next/router';
export default function SignUp() {
  const router = useRouter()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const router = useRouter();
  const createUser = api.user.create.useMutation({
    onSuccess: (email,password) => {
      console.log("email1",email, "password1",password)
      setEmail("");
       setPassword("")
       router.push('/')
    }
  })
  const handleSubmit =  (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
     createUser.mutate({email,password})

  };
 

  return (
    <div className="h-screen flex border-b items-center justify-center">
    
      <form onSubmit={handleSubmit}>
      
      
      <input className="border-2 border-black-600 p-1 mx-4"
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input className="border-2 border-black-600 p-1 mx-4"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Sign Up</button>
    </form>
    </div>
  );
}
