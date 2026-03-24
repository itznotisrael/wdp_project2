const quizQuestions = [
    {
      id: 1,
      question: "When facing conflict, what is your instinct?",
      answers: [
        { text: "Avoid it and wait for a better moment", scores: { balanced: 1, protector: 1 } },
        { text: "Confront it head-on", scores: { riskTaker: 2 } },
        { text: "Outsmart the situation", scores: { strategist: 2 } },
        { text: "Stay calm and analyze first", scores: { strategist: 1, balanced: 1 } }
      ]
    },
    {
      id: 2,
      question: "What motivates you the most?",
      answers: [
        { text: "Freedom", scores: { riskTaker: 1, idealist: 1 } },
        { text: "Power", scores: { riskTaker: 2 } },
        { text: "Justice", scores: { idealist: 2 } },
        { text: "Connection with others", scores: { protector: 2 } }
      ]
    },
    {
      id: 3,
      question: "How do you approach failure?",
      answers: [
        { text: "Reflect quietly and improve internally", scores: { balanced: 1, strategist: 1 } },
        { text: "Train harder and push limits", scores: { riskTaker: 2 } },
        { text: "Change tactics and try a new method", scores: { strategist: 2 } },
        { text: "Rely on others for support", scores: { protector: 2 } }
      ]
    },
    {
      id: 4,
      question: "What role do you naturally take in a group?",
      answers: [
        { text: "Leader", scores: { riskTaker: 1, idealist: 1 } },
        { text: "Lone wolf", scores: { strategist: 1, balanced: 1 } },
        { text: "Strategist", scores: { strategist: 2 } },
        { text: "Supporter", scores: { protector: 2 } }
      ]
    },
    {
      id: 5,
      question: "What is your greatest strength?",
      answers: [
        { text: "Discipline", scores: { balanced: 1, strategist: 1 } },
        { text: "Intelligence", scores: { strategist: 2 } },
        { text: "Charisma", scores: { idealist: 1, riskTaker: 1 } },
        { text: "Determination", scores: { riskTaker: 1, protector: 1 } }
      ]
    },
    {
      id: 6,
      question: "What scares you the most?",
      answers: [
        { text: "Losing control", scores: { strategist: 1, balanced: 1 } },
        { text: "Being powerless", scores: { riskTaker: 1, idealist: 1 } },
        { text: "Being misunderstood", scores: { idealist: 2 } },
        { text: "Being alone", scores: { protector: 2 } }
      ]
    }
  ];
  
  function createEmptyScores() {
    return {
      strategist: 0,
      riskTaker: 0,
      protector: 0,
      idealist: 0,
      balanced: 0
    };
  }
  
  function calculateArchetypeResults(userAnswers) {
    const totals = createEmptyScores();
  
    userAnswers.forEach((answerIndex, questionIndex) => {
      const question = quizQuestions[questionIndex];
      if (!question) return;
  
      const selectedAnswer = question.answers[answerIndex];
      if (!selectedAnswer) return;
  
      for (const archetype in selectedAnswer.scores) {
        totals[archetype] += selectedAnswer.scores[archetype];
      }
    });
  
    const sortedResults = Object.entries(totals).sort((a, b) => b[1] - a[1]);
  
    return {
      totals,
      primaryArchetype: sortedResults[0]?.[0] || null,
      primaryScore: sortedResults[0]?.[1] || 0,
      secondaryArchetype: sortedResults[1]?.[0] || null,
      secondaryScore: sortedResults[1]?.[1] || 0
    };
  }
  
  const archetypeProfiles = {
    strategist: {
      title: "The Strategist",
      description: "You rely on logic, planning, and calculated decision-making.",
      traits: ["analytical", "calm", "tactical"]
    },
    riskTaker: {
      title: "The Risk-Taker",
      description: "You act fast, trust instinct, and move toward challenge without hesitation.",
      traits: ["bold", "confident", "driven"]
    },
    protector: {
      title: "The Protector",
      description: "You prioritize people, loyalty, and emotional responsibility in your decisions.",
      traits: ["loyal", "supportive", "dependable"]
    },
    idealist: {
      title: "The Idealist",
      description: "You are guided by values, meaning, and what you believe is right.",
      traits: ["principled", "visionary", "hopeful"]
    },
    balanced: {
      title: "The Balanced Thinker",
      description: "You mix analysis, patience, and adaptability depending on the situation.",
      traits: ["measured", "adaptable", "steady"]
    }
  };
  
  module.exports = {
    quizQuestions,
    archetypeProfiles,
    calculateArchetypeResults
  };