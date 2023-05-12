
import { useState } from 'react';
import { api } from "~/utils/api";

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const router = useRouter();
  const createUser = api.user.create.useMutation({
    onSuccess: (email,password) => {
      console.log("email1",email, "password1",password)
      setEmail("");
       setPassword("")
    }
  })
  const handleSubmit =  (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
     createUser.mutate({email,password})

  };
 

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Log in</button>
    </form>
  );
}