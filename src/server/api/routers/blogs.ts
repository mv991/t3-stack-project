import redis from "~/utils/redis";
import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";




export const userRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ email: z.string(),password: z.string()}))
    .mutation(async ({ input: {email,password}, ctx }) => {
      const user =  await ctx.prisma.user.create({data : { email,password}})
      return user;
    }),
  })
  export const blogRouter = createTRPCRouter({
    create: protectedProcedure
      .input(z.object({ title: z.string(),content: z.string()}))
      .mutation(async ({ input: {title,content}, ctx }) => {
        const blog =  await ctx.prisma.blog.create({data : {title,content,userId:ctx.session.user.id}})
        return blog;
      }),
      infiniteBlog: publicProcedure.input(z.object({limit: z.number().optional(), cursor: z.object
        ({id: z.string(),createdAt: z.date()}).nullish(),
        
      })).query(async({ ctx, input }) => {
        const { limit=10, cursor } = input; 
        const UserId = ctx.session?.user.id
        const blogs = await ctx.prisma.blog?.findMany({
          take: limit+1,
          cursor: cursor? {createdAt_id : cursor} : undefined,
          orderBy:{id:"desc"},
          select: {
            id: true,
            title:true,
            content:true,
            createdAt:true,
            userId: UserId==null?false:true
          }
        })
        let nextCursor: typeof cursor | undefined;
        if (blogs.length > limit) {
          const nextItem = blogs.pop();
          if (nextItem != null) {
            nextCursor = { id: nextItem.id, createdAt: nextItem.createdAt };
          }
        }
          return { blogs: blogs.map((blog) => {
            return {
              id: blog?.id,
              content: blog?.content,
              createdAt: blog?.createdAt,
              title: blog?.title,
              userId: blog?.userId,
          
            }}),
           nextCursor}
           
      }),
      
  EditBlog: protectedProcedure
  .input(z.object({ title: z.string(),content: z.string(),data:z.string()}))
   .mutation( async({ ctx, input }) => {
        const { data,title,content } = input;
        const blog = await ctx.prisma.blog.update({
          where: {
            id:data,
          },
          data : {
            title:title,
            content:content
          },
        
        });
        await redis.set(data,content)
        return blog
      }),
      getBlog: publicProcedure
      .input(z.object({ data: z.string(),userId:z.string().optional()}))
      .query( async ({input:{data,userId},ctx} ) => {
      const result = await  redis.get(data);
 
    if(result!=null) { 
      console.log("from redis") 
     return result
    }
     
    
            console.log("Now goint to the database")
            const singleBlog = await ctx.prisma.blog.findFirst({
              where : {
                userId:userId,
                id:data
              }
        })
        await redis.set(data,(singleBlog?.content))
        return singleBlog
      })
  
        
    
  
    });

  
    
 
  