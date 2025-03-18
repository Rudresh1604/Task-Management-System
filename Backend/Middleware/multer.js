const multer = require("multer");
const { storage } = require("../Config/cloudinary");

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (
      [
        "text/csv",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ].includes(file.mimetype)
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only CSV or Excel files are allowed"), false);
    }
  },
});

module.exports = upload;
