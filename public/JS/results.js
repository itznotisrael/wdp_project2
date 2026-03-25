const storedResult = localStorage.getItem("quizResult");
const primaryResult = document.getElementById("primaryResult");
const secondaryResult = document.getElementById("secondaryResult");
const animeCards = document.getElementById("animeCards");

async function fetchCharacterByName(name) {
  try {
    const res = await fetch(`https://api.jikan.moe/v4/characters?q=${name}&limit=1`);
    const data = await res.json();
    return data.data[0]; // first match
  } catch (err) {
    console.error("Fetch error:", err);
    return null;
  }
}

if (!storedResult) {
    primaryResult.innerHTML = "<p>No result found. Please take the quiz first.</p>";
} else {
    const data = JSON.parse(storedResult);
    const result = data.result;
    const primaryProfile = data.primaryProfile;
    const secondaryProfile = data.secondaryProfile;

    primaryResult.innerHTML = `
    <div class="result-card">
      <h2 class = "slide-in-elliptic-right-bck profile_style"> Primary: <i>${primaryProfile.title}</i></h2>
      <h4 class = "text-focus-in">${primaryProfile.description}</h4>
      <p class = "text-focus-in1"><strong>Traits:</strong> <i>${primaryProfile.traits.join(", ")}</i> &nbsp; <strong>Score:</strong> <i>${result.primaryScore}</i></p>
    </div>
    `;

    if (secondaryProfile) {
    secondaryResult.innerHTML = `
        <div class="result-card">
          <h2 class = "slide-in-elliptic-left-bck profile_style">Secondary: <i>${secondaryProfile.title}</i></h2>
          <h4 class = "text-focus-in3">${secondaryProfile.description}</h4>
          <p class = "text-focus-in4"><strong>Traits:</strong> <i>${secondaryProfile.traits.join(", ")}</i> &nbsp; <strong>Score:</strong> <i>${result.secondaryScore}</i></p>
        </div>
    `;
    }

    const animeExamples = {
    strategist: [
        { name: "Light Yagami", anime: "Death Note" },
        { name: "L Lawliet", anime: "Death Note" },
        { name: "Shikamaru Nara", anime: "Naruto" }

    ],
    riskTaker: [
        { name: "Inosuke Hashibira", anime: "Demon Slayer" },
        { name: "Naruto Uzumaki", anime: "Naruto" },
        { name: "Katsuki Bakugo", anime: "My Hero Academia" }
    ],
    protector: [
        { name: "Hinata Hyuga", anime: "Naruto" },    
        { name: "All Might", anime: "My Hero Academia" },
        { name: "Tanjiro Kamado", anime: "Demon Slayer" }
    ],
    idealist: [
        { name: "Edward Elric", anime: "Fullmetal Alchemist" },
        { name: "Izuku Midoriya", anime: "My Hero Academia" },
        { name: "Gon Freecss", anime: "Hunter x Hunter" }
    ],
    balanced: [
        { name: "Spike Spiegel", anime: "Cowboy Bebop" },
        { name: "Kakashi Hatake", anime: "Naruto" },
        { name: "Gojo Satoru", anime: "Jujutsu Kaisen" }
    ]
    };

const selectedCharacters = animeExamples[result.primaryArchetype] || [];

(async () => {
  const charactersWithImages = await Promise.all(
    selectedCharacters.map(async (char) => {
      const apiData = await fetchCharacterByName(char.name);
      return {
        ...char,
        image: apiData?.images?.jpg?.image_url || ""
      };
    })
  );

  animeCards.innerHTML = `
    <h2 class = "tracking-in-expand profile_style">Character Match</h2>

    <div class="character-grid">
      ${charactersWithImages.map(char => `
        <div class="anime-card puff-in-top">
          <img src="${char.image}" alt="${char.name}">
          <h3>${char.name}</h3>
          <p>${char.anime}</p>
        </div>
      `).join("")}
    </div>
  `;
    /* SECONDARY FUNCTIONS: EXPERIMENTAL(FAILED DUE TO RANGE LIMIT IN JIKAN API) */
    /*function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    if (secondaryProfile) {
        const secondaryCharactersWithImages = [];

        for (const char of secondaryCharacters) {
        const apiData = await fetchCharacterByName(char.name);

        secondaryCharactersWithImages.push({
            ...char,
            image: apiData?.images?.jpg?.image_url || "https://via.placeholder.com/150"
        });

        await delay(400); // prevents rate limit
        }

    animeCards.innerHTML += `
        <h2 class="text-focus-in2">Your Dual Nature</h2>

        <div class="character-grid">
        ${secondaryCharactersWithImages.map(char => `
            <div class="anime-card">
            <img src="${char.image}" alt="${char.name}">
            <h3>${char.name}</h3>
            <p>${char.anime}</p>
            </div>
        `).join("")}
        </div>
    `;
    }*/

})();
}