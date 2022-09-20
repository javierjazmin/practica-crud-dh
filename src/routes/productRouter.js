const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const path = require("path");

const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../../public/img'))
    },
    filename: function (req, file, cb) {
      const newFileName = Date.now() + '-' + path.extname(file.originalname)
      cb(null, newFileName)
    }
  });
  
  const upload = multer({ storage: storage })

router.get("/list", productController.list);
router.get("/detail/:id", productController.detail);
router.get("/create", productController.create);
router.post("/create", upload.single("agregarImagen"), productController.store);
router.get("/edit/:id", productController.edit);
router.put("/edit/:id", upload.single("agregarImagen"), productController.update);
router.delete("/delete/:id", productController.delete);

    



module.exports = router