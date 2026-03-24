const express = require("express");
const nunjucks = require("nunjucks");
const path = require("path");
const Datastore = require("@seald-io/nedb");

const app = express();
const PORT = 3000;

// database
const db = new Datastore({
  filename: "quizResults.db",
  autoload: true
});

// import quiz logic
const {
  quizQuestions,
  archetypeProfiles,
  calculateArchetypeResults
} = require("./public/archetypeQuiz");

// Configure Nunjucks
nunjucks.configure("views", {
  autoescape: true,
  express: app,
  noCache: true
});

// Set view engine
app.set("view engine", "njk");

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Route for homepage
app.get("/", (req, res) => {
  res.render("index");
});

// Route for quiz page
app.get("/quiz", (req, res) => {
  res.render("form", { questions: quizQuestions });
});

// Route for results page
app.get("/results", (req, res) => {
  res.render("results");
});

// API route for quiz submission
app.post("/api/submit-quiz", (req, res) => {
  const userAnswers = req.body.answers;

  if (!Array.isArray(userAnswers)) {
    return res.status(400).json({ error: "Answers must be an array." });
  }

  const result = calculateArchetypeResults(userAnswers);

  db.insert(
    {
      answers: userAnswers,
      result: result,
      createdAt: new Date()
    },
    (err, newDoc) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Database error." });
      }

      res.json({
        result: result,
        primaryProfile: archetypeProfiles[result.primaryArchetype],
        secondaryProfile: archetypeProfiles[result.secondaryArchetype]
      });
    }
  );
});

// Optional route to see saved quiz entries
app.get("/api/results", (req, res) => {
  db.find({}, (err, docs) => {
    if (err) {
      return res.status(500).json({ error: "Could not fetch saved results." });
    }

    res.json(docs);
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});