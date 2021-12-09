/* eslint-disable prettier/prettier */
import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

const uploadFolder = path.resolve(__dirname, '..', '..', 'uploads');
//exportando o obj que vai conter a config do multer, que é a biblioteca que vai lhe dar com upload

export default {
  directory: uploadFolder,
  storage: multer.diskStorage({
    destination: uploadFolder,
      filename(request, file, callback) {
        const fileHash = crypto.randomBytes(10).toString('hex');

        const filename = `${fileHash}-${file.originalname}`;

        callback(null, filename);
    },
  }),
};
