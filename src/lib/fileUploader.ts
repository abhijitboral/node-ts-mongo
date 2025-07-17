import multer from 'multer';
import path from 'path';
import { RequestHandler } from 'express';
import { allowedFileTypes, allowedFileExtensions } from '../config/allowedFiles';

class FileUploader {
    public static uploadFile(fieldName: string, folderName: string): RequestHandler {
        const storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, path.join(__dirname, `../uploads/${folderName}`));
            },
            filename: (req, file, cb) => {
                cb(null, Date.now() + path.extname(file.originalname));
            },
        });
        return multer({ storage, fileFilter: FileUploader.imageFilter }).single(fieldName);
    }
    public static imageFilter(req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) {
        const allowedMimeTypes = Object.values(allowedFileTypes);
        const allowedExtensions = Object.values(allowedFileExtensions);
        const fileExt = path.extname(file.originalname).toLowerCase();
        const isValidExt = allowedExtensions.includes(fileExt as allowedFileExtensions);
        const isValidMime = allowedMimeTypes.includes(file.mimetype as allowedFileTypes);
        if (isValidExt && isValidMime) cb(null, true);
        else cb(new Error('Only image files are allowed'));
    }
}
export default FileUploader;