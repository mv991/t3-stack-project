
import {  useSession } from "next-auth/react";
import { type NextPage } from "next";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import {useState} from 'react'


const EditBlog = () => {
  const router = useRouter();
  const k = JSON.parse(JSON.stringify(router.query))
 let  data = k.id
   const {data:session} = useSession();
   if(!session) {
    throw Error("Not authorized");
    
   }
   else {
   const userId = session?.user.id
  
    const blog = api.blog.getBlog.useQuery({data,userId})
    if(!blog) {
      throw Error("Not authorized");
    }
  }
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  
  const EditBlog = api.blog.EditBlog.useMutation({
    onSuccess: (title,content,data) => {
      console.log("email1",title, "password1",content)
      setTitle("");
      setContent("")
      router.push("/");
    }
  })
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
     EditBlog.mutate({title,content,data})

  };
 
  
      return (
      <div>
          <form onSubmit={handleSubmit} className="my-3 mx-4 text-center text-2 text-black-500">
    <input
      type="string"
      placeholder="Title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      required
    />
    <input
      type="string"
      placeholder="Content"
      value={content}
      onChange={(e) =>setContent(e.target.value)}
      required
    />
    <button type="submit">Update Changes</button>
  </form>
      </div>
      
      )
  
  }
    
  
     
    
  
  
  export default EditBlog ;