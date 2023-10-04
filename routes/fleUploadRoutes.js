const express = require("express");
const router = express.Router();

const {localFileUpload, imageUpload, videoUpload} = require("../controllers/filecontroller");

router.post("/localfileupload", localFileUpload);
router.post("/imageUpload", imageUpload);
router.post("/videoUpload", videoUpload);


module.exports = router;