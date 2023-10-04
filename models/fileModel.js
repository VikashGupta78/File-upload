const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
require("dotenv").config();

const fileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageUrl:{
        type: String
    },
    tags:{
        type: String
    },
    email: {
        type: String
    }
});

fileSchema.post("save", async function(doc){
    try{
        console.log("DOC KYA H: ", doc);

        //shift this configiration under config folder
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user:process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        });

        let info = await transporter.sendMail({
            from: `creator - Vikash`,
            to: doc.email,
            subject: `New file uploaded on cloudinary`,
            body: `<h2>Hello Jee</h2> <p>File uploaded View here: <a href= "${doc.imageUrl}">${doc.imageUrl}</a> </p>`
        });
        console.log("INFO: ", info);
    } catch(err){
        console.log(err);
    }
}) 

const File = mongoose.model("File", fileSchema)
module.exports = File;