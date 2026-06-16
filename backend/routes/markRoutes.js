const express = require("express");

const router = express.Router();

const {
    createMark,
    getMarks,
    deleteMark,
} = require("../controllers/markController");

router.post("/", createMark);

router.get("/", getMarks);

router.delete("/:id", deleteMark);

module.exports = router;