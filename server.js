const express = require("express");
const nunjucks = require("nunjucks");
const path = require("path");

const app = express();
const PORT = 3000;

// Configure Nunjucks
nunjucks.configure("views", {
  autoescape: true,
  express: app,
  noCache: true
});

// Set view engine
app.set("view engine", "njk");

// Serve static files (CSS, JS, images)
app.use(express.static(path.join(__dirname, "public")));

// Route for homepage
app.get("/", (req, res) => {
  res.render("index"); // renders index.njk
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});