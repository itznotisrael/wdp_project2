const form = document.getElementById("quizForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Collect answers
    const formData = new FormData(form);
    const answers = [];

    for (let [key, value] of formData.entries()) {
      answers.push(value);
    }

    try {
      const response = await fetch("/api/submit-quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ answers })
      });

      const data = await response.json();

      // Store in localStorage
      localStorage.setItem("quizResult", JSON.stringify(data));

      // Redirect to results page
      window.location.href = "/results";

    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
});