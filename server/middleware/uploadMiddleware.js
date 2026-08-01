const multer = require("multer");
const path = require("path");

// Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    const uniqueName =
      "receipt-" + Date.now() + path.extname(file.originalname);

    cb(null, uniqueName);
  },
});

// File Filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|pdf/;

  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );

  const mimetype = allowedTypes.test(file.mimetype);

  if (extname || mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Only JPG, PNG and PDF files are allowed"));
  }
};

// Upload Middleware
const upload = multer({
  storage,
  fileFilter,
});

module.exports = upload;