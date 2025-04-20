import React from 'react'
import { useNavigate } from 'react-router-dom'

const AblumItem = ({image,name,desc,id}) => {

  // Sử dụng hook useNavigate để điều hướng giữa các trang
  const navigate = useNavigate()

  return (
    /**
         * Một thẻ div đại diện cho một album.
         * Khi người dùng click vào album, điều hướng tới trang chi tiết album bằng URL `/album/{id}`.
     */
    <div onClick={()=>navigate(`/album/${id}`)} className='min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]'>
        <img className='rounded' src={image} alt="" />
        <p className='font-bold mt-2 mb-1'>{name}</p>
        <p className='text-slate-200 text-sm'>{desc}</p>
    </div>
  )
}

export default AblumItem