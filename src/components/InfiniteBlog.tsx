 
import React from 'react';
import Link from 'next/link';
import {  useSession } from "next-auth/react";
// import { LoadingSpinner } from "./LoadingSpinner";
import InfiniteScroll from "react-infinite-scroll-component";
type Blog = {
  id: string;
  content: string;
  createdAt: Date;
  title:string;
  userId:string
 
};
type InfiniteBlogProps =  {
 blog?:Blog[]
 isLoading: boolean;
 isError: boolean;
 hasMore: boolean | undefined;
 fetchNewBlog:()=>Promise<unknown>
 
}
export function InfiniteBlog({
  blog,
  
  fetchNewBlog,
  hasMore = false,
}: InfiniteBlogProps) {
  const {data:session} = useSession()
  if (blog == null || blog.length === 0) {
    return (
      <h2 className="my-20 text-center text-2xl text-gray-500">No Blogs Yet</h2>
    );
  }
  
 

 
  return (
    <ul>
       <InfiniteScroll 
        dataLength={10}
        next={fetchNewBlog}
        hasMore={hasMore}
        loader={"Loading"}
      >
        {   blog.map((b,index)=> {
              return <div><div className= "text-left text-2xl text-yellow px-5" key = {index}>
            <h4  className='pt-6 text-blue'><Link href={`/description/${b.id}`}>{b.title}</Link></h4>
            </div>
           {session && session?.user.id==b.userId?<Link href={ `/Edit/${b.id}`}><button  className='px-5'>Edit</button></Link>:""}
           
            </div>
            })
        }
        
        </InfiniteScroll>
        
    </ul>
  )
}

