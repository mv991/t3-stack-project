import { useState } from "react";
import { api } from "~/utils/api";
import {useRouter} from "next/router";
import { useSession } from "next-auth/react";
export default function CreateBlog() { 
  const {data:session} = useSession()
  if(!session) {
    throw Error("Not authorized");
}
  const router = useRouter()
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const trpcUtils = api.useContext();
    
    const CreateBlog = api.blog.create.useMutation({
      onSuccess: ({title,content}) => {
        setTitle("");
        setContent("")
        router.push("/");
        
       
  
        trpcUtils.blog.infiniteBlog.setInfiniteData({}, (oldData) => {
          if (oldData == null || oldData.pages[0] == null) return;
  
          const newCacheTweet = {
            title,
            content,
          };
  
          return {
            ...oldData,
            pages: [
              {
                ...oldData.pages[0],
                tweets: [newCacheTweet, ...oldData.pages[0].blogs],
              },
              ...oldData.pages.slice(1),
            ],
          };
        });
      },
    });
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
       CreateBlog.mutate({title,content})
  
    };
return(
    <form onSubmit={handleSubmit} className = "my-4 mx-4 text-center text-2 text-black-500">
    <input
      type="string"
      placeholder="Title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      required
    />
    <input
      type="string"
      placeholder="Content...."
      value={content}
      onChange={(e) =>setContent(e.target.value)}
      required
    />
    <button type="submit">Add blog</button>
  </form>
)

}