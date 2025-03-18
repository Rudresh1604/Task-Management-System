require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Cloudinary Storage for CSV files
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "csv-uploads", // Folder in Cloudinary
    resource_type: "raw", // Store raw files (CSV, XLSX)
    format: async (req, file) => file.mimetype.split("/")[1], // Keep original format
  },
});

module.exports = { cloudinary, storage };
