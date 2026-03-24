const storedResult = localStorage.getItem("quizResult");
const primaryResult = document.getElementById("primaryResult");
const secondaryResult = document.getElementById("secondaryResult");
const animeCards = document.getElementById("animeCards");

if (!storedResult) {
    primaryResult.innerHTML = "<p>No result found. Please take the quiz first.</p>";
} else {
    const data = JSON.parse(storedResult);
    const result = data.result;
    const primaryProfile = data.primaryProfile;
    const secondaryProfile = data.secondaryProfile;

    primaryResult.innerHTML = `
    <div class="result-card">
        <h2 class = "slide-in-elliptic-right-bck">${primaryProfile.title}</h2>
        <p class = "text-focus-in">${primaryProfile.description}</p>
        <p class = "text-focus-in1"><strong>Traits:</strong> ${primaryProfile.traits.join(", ")}</p>
        <p class = "text-focus-in2"><strong>Score:</strong> ${result.primaryScore}</p>
    </div>
    `;

    if (secondaryProfile) {
    secondaryResult.innerHTML = `
        <div class="result-card">
        <h2 class = "slide-in-elliptic-left-bck">Secondary: ${secondaryProfile.title}</h2>
        <p class = "text-focus-in3">${secondaryProfile.description}</p>
        <p class = "text-focus-in4"><strong>Traits:</strong> ${secondaryProfile.traits.join(", ")}</p>
        <p class = "text-focus-in5"><strong>Score:</strong> ${result.secondaryScore}</p>
        </div>
    `;
    }

    const animeExamples = {
    strategist: [
        { name: "L", anime: "Death Note" },
        { name: "Levi Ackerman", anime: "Attack on Titan" }
    ],
    riskTaker: [
        { name: "Naruto Uzumaki", anime: "Naruto" },
        { name: "Katsuki Bakugo", anime: "My Hero Academia" }
    ],
    protector: [
        { name: "Tanjiro Kamado", anime: "Demon Slayer" },
        { name: "All Might", anime: "My Hero Academia" }
    ],
    idealist: [
        { name: "Izuku Midoriya", anime: "My Hero Academia" },
        { name: "Gon Freecss", anime: "Hunter x Hunter" }
    ],
    balanced: [
        { name: "Kakashi Hatake", anime: "Naruto" },
        { name: "Gojo Satoru", anime: "Jujutsu Kaisen" }
    ]
    };

    const selectedCharacters = animeExamples[result.primaryArchetype] || [];

    animeCards.innerHTML = `
    <h2>Anime Characters That Match You</h2>
    ${selectedCharacters.map(character => `
        <div class="anime-card">
            <h3>${character.name}</h3>
            <p>${character.anime}</p>
        </div>
    `).join("")}
    `;
}