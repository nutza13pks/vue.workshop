const express = require("express");
const router = express.Router();
const product = require("./models/product");
const Sequelize = require("sequelize");
const formidable = require("formidable");
const constants = require("./constant");
const path = require("path");
const fs = require("fs-extra");

// Upload Image
uploadImage = async (files, doc) => {
  if (files.image != null) {
    var fileExtention = files.image.name.split(".")[1];
    doc.image = `${doc.id}.${fileExtention}`;
    var newpath = path.resolve(__dirname + "/uploaded/images/") + "/" + doc.image;
    console.log(newpath)

    if (fs.exists(newpath)) {
      await fs.remove(newpath);
    }
    await fs.moveSync(files.image.path, newpath);

    // Update database
    let result = product.update(
      { image: doc.image },
      { where: { id: doc.id } }
    );
    return result;
  }
};

router.get("/product", async (req, res) => {
  let result = await product.findAll({ order: Sequelize.literal("id DESC") })
  res.json(result);
});

router.post("/product", (req, res)=>{
  try{
    const form = new formidable.IncomingForm();
    form.parse(req, async (error, fields, files)=>{
     let result = await product.create(fields);
     result = await uploadImage(files, result);
     res.json({
         result: constants.kResultOk,
         message: JSON.stringify(result)
       });
    })
 } catch (error) {
     res.json({ result: constants.kResultNok, message: JSON.stringify(error) });
 }
});

router.put("/product", async (req, res)=>{
  try {
      var form = new formidable.IncomingForm();
      form.parse(req, async (err, fields, files) => {
        let result = await product.update(fields, { where: { id: fields.id } });          
        result = await uploadImage(files, fields);
        res.json({
          result: constants.kResultOk,
          message: JSON.stringify(result)
        });
      });
    } catch (err) {
      res.json({ result: constants.kResultNok, message: JSON.stringify(err) });
    }
});

router.delete("/product/id/:id", async (req, res)=>{
  try{
    const {id} = req.params
    let result = await product.findOne({where: {id}})
    await fs.remove(__dirname + "/uploaded/images/" + result.image)
    result = await product.destroy({ where: { id: id } });
    res.json({ result: constants.kResultOk, message: JSON.stringify(result) });
  }catch(err){
    res.json({ result: constants.kResultNok, message: JSON.stringify(err) });
  }
});

module.exports = router;
