import { addSong, listSong, removeSong } from '../controllers/songController.js';
import express from 'express'
import upload from "../middleware/multer.js";

// Tạo một Router mới cho quản lý bài hát
const songRouter = express.Router();

/**
 * POST /add
 * - Chức năng: Thêm bài hát mới vào hệ thống.
 * - Sử dụng middleware `multer` để xử lý file tải lên (ảnh và audio).
 * - Route này gọi hàm `addSong` từ controller để xử lý logic thêm bài hát.
 */
songRouter.post('/add',upload.fields([{name:'image',maxCount:1}, {name:'audio',maxCount:1}]), addSong);
/**
 * GET /list
 * - Chức năng: Lấy danh sách bài hát từ hệ thống.
 * - Route này gọi hàm `listSong` từ controller để trả về danh sách bài hát.
 */
songRouter.get('/list',listSong);
/**
 * POST /remove
 * - Chức năng: Xóa một bài hát khỏi hệ thống.
 * - Route này gọi hàm `removeSong` từ controller để xử lý logic xóa bài hát.
 */
songRouter.post('/remove', removeSong);

export default songRouter;