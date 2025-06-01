const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/'); // Folderi ku do te ruhen fotot
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // emer vecante per fotot
  }
});

// Filtro vetem imazhet fotot
const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|webp/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Lejohen vetëm fotot (JPEG, JPG, PNG, WEBP)'), false);
  }
};

const upload = multer({ 
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // limiti 5 mb
});

module.exports = upload;