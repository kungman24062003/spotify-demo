import { v2 as cloudinary } from 'cloudinary'
import songModel from '../models/songModel.js';

/**
 * Hàm thêm bài hát mới vào cơ sở dữ liệu
 * - Upload tệp âm thanh và hình ảnh lên Cloudinary.
 * - Tạo dữ liệu bài hát mới và lưu vào cơ sở dữ liệu.
 */
const addSong = async (req,res) => {
    
    try {
        const { name, desc, album } = req.body;
        const audioFile = req.files.audio[0];
        const imageFile = req.files.image[0];
        const audioUpload = await cloudinary.uploader.upload(audioFile.path, {resource_type:"video"});
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type:"image"});
        // Tính toán thời lượng bài hát
        const duration = `${Math.floor(audioUpload.duration/60)}:${Math.floor(audioUpload.duration%60)}`

        // Dữ liệu bài hát mới
        const songData = {
            name,
            desc,
            album,
            image: imageUpload.secure_url,
            file: audioUpload.secure_url,
            duration
        }

        // Tạo bài hát mới và lưu vào cơ sở dữ liệu
        const song = songModel(songData);
        await song.save();

        res.json({success: true, message:"Song Added"})

    } catch (error) {
        res.json({success: false});
    }
}

/**
 * Hàm lấy danh sách tất cả các bài hát
 * - Truy vấn cơ sở dữ liệu để lấy tất cả bài hát.
 */
const listSong = async (req,res) => {
    try{

        // Lấy tất cả bài hát từ cơ sở dữ liệu
        const allSongs = await songModel.find({});
        // phản hồi thành công
        res.json({success:true, songs: allSongs});

    } catch (error) {
        // phản hồi thất bại
        res.json({success: false});

    }
}

/**
 * Hàm xóa một bài hát
 * - Xóa bài hát dựa trên ID được gửi trong yêu cầu.
 */
const removeSong = async (req,res) => {
    
    try{

        // Xóa bài hát theo ID
        await songModel.findByIdAndDelete(req.body.id);
        res.json({success: true, message: "Song removed"});

    } catch (errror) {
        
        res.json({success: false});

    }
}

export {addSong, listSong, removeSong}