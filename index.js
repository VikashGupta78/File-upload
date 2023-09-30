const express = require("express");
const app = express();
//const cookieParser = require("cookie-parser");
const fileupload = require("express-fileupload");

require("dotenv").config();
const PORT = process.env.PORT || 5000;

//app.use(cookieParser());
app.use(express.json());
app.use(fileupload());

const uploadRoute = require("./routes/fleUploadRoutes");
app.use("/api/v1", uploadRoute);

app.listen(PORT, () => {
    console.log(`Server is running succesfully at ${PORT}`);
})

const dbConnect = require("./config/databasse");
dbConnect();

const cloudinary = require("./config/cloudaniry");
cloudinary.cloudinaryConnect();

app.get("/", (req, res) => {
    res.send(`<h1>This is File upload Homepage biro.</h1>`)
})