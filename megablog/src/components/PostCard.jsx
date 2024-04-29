import React from 'react'
import appwriteService from '../appwrite/config.js'
import {Link} from 'react-router-dom'

function PostCard({$id , title ,featuredImage}) {
  return (
    <div>
      <Link to={`/post${$id}`} >
        <div className='w-full bg-gray-100 rounded-xl px-4'>
            <div className='w-full justify-cente r mb-4'>
               <img src={appwriteService.getFilePreview(featuredImage)} alt={title} className='rounded-xl' />

            </div>
            <h2 className='text-xl font-bold'>{title}</h2>
        </div>
      </Link>
    </div>
  )
}

export default PostCard
