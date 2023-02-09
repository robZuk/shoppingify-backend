const path = require("path");
const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/errorMiddleware");
const cors = require("cors");

connectDB();

const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(errorHandler);

app.use(cors());

app.use("/api/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/categories", require("./routes/categoriesRoutes"));
app.use("/api/products", require("./routes/productsRoutes"));
app.use("/api/lists", require("./routes/listsRoutes"));
app.use("/api/upload", require("./routes/uploadRoutes"));

app.listen(port, () => console.log(`Server started on port ${port}`));
