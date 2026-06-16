const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const studentRoutes = require("./routes/studentRoutes");
const markRoutes = require("./routes/markRoutes");

app.use("/api/students", studentRoutes);
app.use("/api/marks", markRoutes);

app.use("/api/students", studentRoutes);

app.listen(5000, () => {
    console.log("Server started on port 5000");
});