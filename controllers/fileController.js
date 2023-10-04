const File = require("../models/fileModel");
const cloudinary = require("cloudinary").v2;


exports.localFileUpload = (req, res) => {
    try{
        //data fetching
        const file = req.files.file;
        console.log("file dekh lo : ", file);

        const path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        console.log("path dekh lo: ", path);

        file.mv(path, (err) => {
            console.log(err);
        });

        res.json({
            success: true, 
            message: "file uploaded to local server."
        })

    } catch(error){
        return res.status(500).json({
            success: false,
            message: "error in uploading to local server.",
            message: error
        })
    }
}

async function uploadToCloudinary(file, folder, quality){
    const options = {folder};
    if(quality){
        options.quality = quality;
    }
    options.resource_type = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

function isFileTypeSupported(fileType, supportedFileType){
    return supportedFileType.includes(fileType);
}

exports.imageUpload = async(req, res) => {
    try{
        //data fetching
        const {name, tags, email} = req.body;
        const file = req.files.imageFile;
        console.log(file);

        //validation
        const fileType = file.name.split('.')[1];
        const supportedFileType = ["jpg", "jpeg", "png"];
        if(!isFileTypeSupported(fileType, supportedFileType)){
            return res.status(400).json({
                success: false,
                message: "Invalid file format"
            })
        }
        console.log(fileType);

        //uploading to cloudinary
        const response = await uploadToCloudinary(file, "demo");
        console.log(response);

        //db me entry storing
        const fileData = await File.create({
            name,
            email,
            tags,
            imageUrl: response.secure_url,
        })
        console.log("Ye lo fileData: ", fileData);

        res.status(200).json({
            success: true,
            imageUrl: response.secure_url,
            message: "File uploaded to cloudinary successfully"
        })
    } catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in file uploading to cloudinary"
        })
    }
}

exports.videoUpload = async(req, res) => {
    try{
        const {name, tags, email} = req.body;
        const file = req.files.videoFile;
        console.log(file);


        const fileType = file.name.split('.')[1].toLowerCase();
        const supportedFileType = ["mp4", "mov"];
        if(!isFileTypeSupported(fileType, supportedFileType)){
            return res.status(400).json({
                success: false,
                message: "Invalid file format"
            })
        }
        console.log(fileType);

        const response = await uploadToCloudinary(file, "demo", 40);
        console.log(response);

        const fileData = await File.create({
            name,
            email,
            tags,
            imageUrl: response.secure_url,
        })
        console.log("Ye lo fileData: ", fileData);

        res.status(200).json({
            success: true,
            imageUrl: response.secure_url,
            message: "video uploaded to cloudinary successfully"
        })
    } catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in uploading video to cloudinary"
        })
    }
}