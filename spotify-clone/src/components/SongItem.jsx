import React, { useContext } from 'react'
import { PlayerContext } from '../context/PlayerContext'

const SongItem = ({name,image,desc,id}) => {

  // Sử dụng useContext để lấy hàm playWithId từ PlayerContext
  const {playWithId} = useContext(PlayerContext)

  return (
    /**
     * Một thẻ div đại diện cho một bài hát.
     * Khi người dùng click vào bài hát, hàm playWithId sẽ được gọi để phát bài hát dựa trên ID.
     */
    <div onClick={()=>playWithId(id)} className='min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]'>
        <img className='rounded' src={image} alt="" />
        <p className='font-bold mt-2 mb-1'>{name}</p>
        <p className='text-slate-200 text-sm'>{desc}</p>
    </div>
  )
}

export default SongItem