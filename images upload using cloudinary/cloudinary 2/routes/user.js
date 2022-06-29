const router = require("express").Router();
const cloudinary = require('../utils/cloudinary')
const upload = require('../utils/multer')
const User = require("../model/user");
const multer = require("multer");

router.post('/', upload.single('image'), async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path)

        //create instance of user
        let user = new User({
            name: req.body.name,               //name we are providing in our body..
            avatar: result.secure_url,         //sercure_url we are getting from cloudinary.. and setting it to avatar
            cloudinary_id: result.public_id    //public_id we are getting from cloudinary.. and setting it to cloudinary_id
        });
        //save user
        await user.save();
        res.json(user)
    } catch (err) {
        console.log(err)
    }
});

router.get("/", async (req, res) => {
    try {
        let user = await User.find();   //it will be an array because we are not specifying any id...
        res.json(user);
    } catch (err) {
        console.log(err)
    }
});

router.delete("/:id", async (req, res) => {
    try {
        //find user by id
        let user = await User.findById(req.params.id)
        //delete image from cloudinary
        //destroy takes cloudinary (public_id) but we have saved it as cloudinary_id in our database..
        await cloudinary.uploader.destroy(user.cloudinary_id)
        //we are removing image from cloudinary
        await user.remove()
        res.json(user)
    } catch (err) {
        console.log(err)
    }
})

router.put("/:id", upload.single("image"), async (req, res) => {
    try {
        let user = await User.findById(req.params.id)
        await cloudinary.uploader.destroy(user.cloudinary_id)
        const result = await cloudinary.uploader.upload(req.file.path)
        const data = {
            name: req.body.name || user.name,
            avatar: result.secure_url || user.avatar,
            cloudinary_id: result.public_id || user.cloudinary_id
        };
        user = await User.findByIdAndUpdate(req.params.id, data, { new: true })
        res.json(user)
    } catch (err) {
        console.log(err)
    }
})
module.exports = router;