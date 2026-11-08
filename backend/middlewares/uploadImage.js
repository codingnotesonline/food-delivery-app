import multer from "multer";

const diskStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "uploads/food");
  },
  filename: (req, file, callback) => {
    callback(null, `${Date.now()}_${req.body.name}_${file.originalname}`);
  },
});

const upload = multer({ storage: diskStorage }).single("image");

export { upload };