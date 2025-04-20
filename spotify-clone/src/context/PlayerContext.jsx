import { createContext, useEffect, useRef, useState } from "react";
import axios from 'axios';


export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {

    const audioRef = useRef();
    const seekBg = useRef();
    const seekBar = useRef();

    const url = 'http://localhost:4000';

    const [songsData,setSongsData] = useState([]);
    const [albumsData,setAlbumsData] = useState([]);

    const [track,setTrack] = useState(songsData[1]);
    const [playStatus,setPlayStatus] = useState(false);
 
    const [time,setTime] = useState({
        currentTime:{
            second: 0,
            minute: 0
        },
        totalTime:{
            second: 0,
            minute: 0
        }
    })

    /**
     * Phát bài hát hiện tại.
     * Gọi phương thức `play` của thẻ audio và đặt trạng thái phát là true.
     */
    const play = () => {
        audioRef.current.play();
        setPlayStatus(true);
    }

    /**
     * Tạm dừng bài hát hiện tại.
     * Gọi phương thức `pause` của thẻ audio và đặt trạng thái phát là false.
     */
    const pause = () => {
        audioRef.current.pause();
        setPlayStatus(false);
    }

    /**
     * Phát bài hát dựa theo ID.
     * Tìm bài hát trong danh sách songsData và đặt làm bài hát hiện tại.
     * Sau đó phát bài hát đã chọn.
     */
    const playWithId = async (id) => {
        await songsData.map((item)=>{
            if(id === item._id){
                setTrack(item);
            }
        })

        await audioRef.current.play();
        setPlayStatus(true);
    }

    /**
     * Phát bài hát trước đó trong danh sách.
     * Xác định vị trí bài hát hiện tại và phát bài hát liền trước nếu có.
     */
    const previous = async () => {
        songsData.map(async(item,index)=>{
            if(track._id === item._id && index > 0){

                await setTrack(songsData[index-1]);
                await audioRef.current.play();
                setPlayStatus(true);
                
            }
        })
    }

    /**
     * Phát bài hát tiếp theo trong danh sách.
     * Xác định vị trí bài hát hiện tại và phát bài hát liền sau nếu có.
     */
    const next = async () => {
        songsData.map(async(item,index)=>{
            if(track._id === item._id && index < songsData.length){

                await setTrack(songsData[index+1]);
                await audioRef.current.play();
                setPlayStatus(true);
                
            }
        })
    }

    /**
     * Cập nhật vị trí phát hiện tại của bài hát.
     * Tính toán vị trí dựa trên nơi người dùng bấm trên thanh seek bar.
     */
    const seekSong = async (e) => {
        audioRef.current.currentTime = ((e.nativeEvent.offsetX / seekBg.current.offsetWidth)*audioRef.current.duration)
    }

    /**
     * Lấy danh sách bài hát từ API.
     * Cập nhật state songsData và đặt bài hát đầu tiên làm bài hát hiện tại.
     */
    const getSongsData = async () => {

        try {
            
            const response = await axios.get(`${url}/api/song/list`);
            setSongsData(response.data.songs);
            setTrack(response.data.songs[0]);

        } catch (error) {
            console.log(error);
        }

    }

    /**
     * Lấy danh sách album từ API.
     * Cập nhật state albumsData.
     */
    const getAlbumsData = async () => {

        try {
            
            const response = await axios.get(`${url}/api/album/list`);
            setAlbumsData(response.data.albums);

        } catch (error) {
            console.log(error);
        }

    }

    /**
     * Cập nhật thông tin thanh seek bar và thời gian bài hát.
     * Chạy mỗi giây để lấy thời gian hiện tại và thời lượng bài hát.
     */
    useEffect (() => {
        setTimeout(() => {
            audioRef.current.ontimeupdate = () => {
                seekBar.current.style.width = (Math.floor(audioRef.current.currentTime/audioRef.current.duration*100)) + "%";
                setTime({
                    currentTime:{
                        second: Math.floor(audioRef.current.currentTime % 60),
                        minute: Math.floor(audioRef.current.currentTime / 60)
                    },
                    totalTime:{
                        second: Math.floor(audioRef.current.duration % 60),
                        minute: Math.floor(audioRef.current.duration / 60)
                    }
                })
            }
        }, 1000);
    },[audioRef])

    /**
     * Lấy dữ liệu bài hát và album từ API khi component được render lần đầu.
     */
    useEffect(()=>{
        getSongsData();
        getAlbumsData();
    },[])

    const contextValue = {
        audioRef,
        seekBg,
        seekBar,
        track,setTrack,
        playStatus,setPlayStatus,
        time,setTime,
        play,pause,
        playWithId,
        previous,next,
        seekSong,
        songsData,albumsData
    }

    return (
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>
    )

}

export default PlayerContextProvider;