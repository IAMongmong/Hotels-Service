import express from 'express';
import multer from 'multer';
import { hotelController } from '../controllers/hotelController.js';

const upload = multer({ dest: 'uploads/' });  // specify a temporary folder to store the uploaded files
const router = express.Router();

router.get('/', hotelController.getFilteredHotels);
router.get('/:id', hotelController.getHotelById);
router.post('/upload', upload.single('file'), hotelController.createHotel); // 同時處理 JSON 和 CSV 上傳
router.put('/:id', hotelController.updateHotel);
router.delete('/:id', hotelController.deleteHotel);

export default router;
