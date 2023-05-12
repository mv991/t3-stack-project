import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession ,getSession} from "next-auth/react";
import SignUp from "./signup";
import { api } from "~/utils/api";
import CreateBlog from './CreateBlog';
import {InfiniteBlog} from '~/components/InfiniteBlog'

const Home: NextPage = () => {
  const { data: session } = useSession();
  //run a qury getting all blog data
  // const { data, isLoading: postsLoading } = api.posts.getAll.useQuery();
    return (
    <div >
       <AuthShowcase/> 
       
       <div className="flex-start items-center justify-center">
      
      {session ? <Link href = {"CreateBlog"}><h3 className="display:block text-center">Create Blog</h3></Link>:<Link href = {"/signup"}><h3 className = "display:block text-center">Create a New Account  </h3></Link> }
      {session? <Link href={"ProfilePage"}><h3 className="display:block text-center">Profile Page</h3></Link>:""}
      </div>
      <DisplayBlogs/>
      
      
     
  
    </div>
    
    )

}


function DisplayBlogs()  {
  const blogs = api.blog?.infiniteBlog.useInfiniteQuery({},{getNextPageParam: (lastPage) =>{ lastPage.nextCursor}});
 

    return <InfiniteBlog blog = {blogs?.data?.pages.flatMap((page) => page.blogs)}  
    isError={blogs.isError}
    isLoading={blogs.isLoading}
    hasMore={blogs.hasNextPage}
    fetchNewBlog={blogs.fetchNextPage}
    />

   
    
}
  


const AuthShowcase: React.FC = () => {

    const { data: session } = useSession();
  console.log(session?.user ,"DAta")
   
  
    return (
      <div className="flex flex-col items-center justify-center gap-4">
        <p className="text-center text-2xl text-yellow">
          {session && <span>Logged in as {session.user?.email}</span>}
          
        </p>
        <button
          className="display-block text-center"
          onClick={session ? () => void signOut() : () => void signIn()}
        >
          {session ? "Sign out" : "Log in "}
        </button>
      </div>
    );
  };
  export default Home;