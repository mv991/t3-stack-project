import React from 'react'
import { api } from '~/utils/api';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { isString } from 'util';

function description() {
  const router = useRouter();
  const k = JSON.parse(JSON.stringify(router.query))
 let  data = k.id
  const [content, setContent] = useState('');
  if(typeof data!="string"){data = JSON.stringify(data)}
  const description = api.blog.getBlog.useQuery({data})
  console.log(data)
  console.log(description.data)
 
  return (
     <div> {description.data?.content?description.data?.content:description.data}</div>
   )
}

export default description