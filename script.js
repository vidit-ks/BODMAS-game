const progressBar = document.getElementById("progressBar");
const homeScreen = document.getElementById("homeScreen");
const rulesScreen = document.getElementById("rulesScreen");
const gameScreen = document.getElementById("gameScreen");
const resultScreen = document.getElementById("resultScreen");

const startBtn = document.getElementById("startBtn");
const rulesBtn = document.getElementById("rulesBtn");
const backBtn = document.getElementById("backBtn");
const nextBtn = document.getElementById("nextBtn");
const hintBtn = document.getElementById("hintBtn");
const restartBtn = document.getElementById("restartBtn");
const saveBtn = document.getElementById("saveBtn");

const expressionArea = document.getElementById("expressionArea");
const message = document.getElementById("message");

const scoreEl = document.getElementById("score");
const livesEl = document.getElementById("lives");
const levelEl = document.getElementById("level");
const finalScoreEl = document.getElementById("finalScore");
const saveMessage = document.getElementById("saveMessage");

let score = 0;
let lives = 3;
let level = 1;
let currentTokens = [];
let gameFinished = false;

rulesBtn.addEventListener("click", () => showScreen(rulesScreen));
backBtn.addEventListener("click", () => showScreen(homeScreen));
startBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", resetGame);
nextBtn.addEventListener("click", nextLevel);
hintBtn.addEventListener("click", showHint);
saveBtn.addEventListener("click", saveScore);

function showScreen(screen) {
  [homeScreen, rulesScreen, gameScreen, resultScreen].forEach(s =>
    s.classList.remove("active")
  );
  screen.classList.add("active");
}

function updateStats() {
  progressBar.style.width = `${Math.min(level * 10, 100)}%`;
  scoreEl.textContent = score;
  livesEl.textContent = lives;
  levelEl.textContent = level;
}

function startGame() {
  score = 0;
  lives = 3;
  level = 1;
  gameFinished = false;
  updateStats();
  showScreen(gameScreen);
  loadLevel();
}

function resetGame() {
  score = 0;
  lives = 3;
  level = 1;
  gameFinished = false;
  updateStats();
  showScreen(homeScreen);
}

function nextLevel() {
  level++;
  updateStats();
  loadLevel();
}

function loadLevel() {
  nextBtn.disabled = true;
  message.textContent = `Level ${level}: Solve using BODMAS`;
  currentTokens = generateQuestion(level);
  renderExpression();
}

function generateQuestion(level) {
  if (level <= 2) {
    return makeSimpleAddSub();
  } else if (level <= 4) {
    return makeMulDiv();
  } else if (level <= 6) {
    return makeMixedNoBrackets();
  } else if (level <= 8) {
    return makeWithBrackets();
  } else if (level <= 10) {
    return makeLongExpression();
  } else {
    const generators = [
      makeMixedNoBrackets,
      makeWithBrackets,
      makeLongExpression,
      makeBracketMixedExpression,
      makeDoubleMulDivExpression
    ];
    const pick = generators[randInt(0, generators.length - 1)];
    return pick();
  }
}


function makeLongExpression() {
  const type = randInt(1, 3);

  if (type === 1) {
    const a = randInt(1, 9);
    const b = randInt(2, 9);
    const c = randInt(2, 9);
    const d = randInt(1, 9);
    return [String(a), "+", String(b), "×", String(c), "-", String(d)];
  }

  if (type === 2) {
    const b = randInt(2, 9);
    const c = randInt(2, 9);
    const mul = b * c;
    const a = randInt(1, 9);
    return [String(a), "-", String(b), "×", String(c), "+", String(randInt(1, 9))];
  }

  const b = randInt(2, 9);
  const result = randInt(2, 6);
  const a = b * result;
  const d = randInt(1, 9);
  const e = randInt(1, 9);
  return [String(a), "÷", String(b), "+", String(d), "-", String(e)];
}

function makeBracketMixedExpression() {
  const type = randInt(1, 3);

  if (type === 1) {
    const a = randInt(1, 9);
    const b = randInt(1, 9);
    const c = randInt(2, 6);
    const d = randInt(1, 9);
    return ["(", String(a), "+", String(b), ")", "×", String(c), "-", String(d)];
  }

  if (type === 2) {
    const a = randInt(2, 9);
    const b = randInt(1, 9);
    const c = randInt(1, 9);
    const d = randInt(1, 9);
    return [String(a), "+", "(", String(b), "×", String(c), ")", "-", String(d)];
  }

  const b = randInt(2, 9);
  const result = randInt(2, 6);
  const a = b * result;
  const d = randInt(1, 9);
  const e = randInt(1, 9);
  return ["(", String(a), "÷", String(b), ")", "+", String(d), "-", String(e)];
}

function makeDoubleMulDivExpression() {
  const type = randInt(1, 3);

  if (type === 1) {
    const a = randInt(2, 6);
    const b = randInt(2, 6);
    const c = randInt(2, 6);
    return [String(a), "×", String(b), "+", String(c), "×", String(randInt(2, 5))];
  }

  if (type === 2) {
    const b = randInt(2, 6);
    const result1 = randInt(2, 6);
    const a = b * result1;

    const d = randInt(2, 6);
    const result2 = randInt(2, 6);
    const c = d * result2;

    return [String(a), "÷", String(b), "+", String(c), "÷", String(d)];
  }

  const a = randInt(2, 6);
  const b = randInt(2, 6);
  const d = randInt(2, 6);
  const e = randInt(2, 6);
  return [String(a), "×", String(b), "-", String(d), "×", String(e)];
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function makeSimpleAddSub() {
  const a = randInt(1, 9);
  const b = randInt(1, 9);
  const c = randInt(1, 9);
  const op1 = Math.random() < 0.5 ? "+" : "-";
  const op2 = Math.random() < 0.5 ? "+" : "-";
  return [String(a), op1, String(b), op2, String(c)];
}

function makeMulDiv() {
  const useDiv = Math.random() < 0.5;
  if (useDiv) {
    const b = randInt(2, 9);
    const result = randInt(2, 9);
    const a = b * result;
    const c = randInt(1, 9);
    const op2 = Math.random() < 0.5 ? "+" : "-";
    return [String(a), "÷", String(b), op2, String(c)];
  } else {
    const a = randInt(2, 9);
    const b = randInt(2, 9);
    const c = randInt(1, 9);
    const op2 = Math.random() < 0.5 ? "+" : "-";
    return [String(a), "×", String(b), op2, String(c)];
  }
}

function makeMixedNoBrackets() {
  const firstType = randInt(1, 3);

  if (firstType === 1) {
    const a = randInt(1, 9);
    const b = randInt(2, 9);
    const c = randInt(2, 9);
    const d = randInt(1, 9);
    return [String(a), "+", String(b), "×", String(c), "-", String(d)];
  }

  if (firstType === 2) {
    const b = randInt(2, 9);
    const result = randInt(2, 9);
    const a = b * result;
    const d = randInt(1, 9);
    return [String(a), "÷", String(b), "+", String(d)];
  }

  const a = randInt(2, 9);
  const b = randInt(2, 9);
  const c = randInt(2, 9);
  return [String(a), "×", String(b), "+", String(c)];
}

function makeWithBrackets() {
  const type = randInt(1, 3);

  if (type === 1) {
    const a = randInt(1, 9);
    const b = randInt(1, 9);
    const c = randInt(2, 6);
    return ["(", String(a), "+", String(b), ")", "×", String(c)];
  }

  if (type === 2) {
    const a = randInt(2, 9);
    const b = randInt(1, 9);
    const c = randInt(1, 9);
    return [String(a), "+", "(", String(b), "×", String(c), ")"];
  }

  const b = randInt(2, 9);
  const result = randInt(2, 6);
  const a = b * result;
  const d = randInt(1, 9);
  return ["(", String(a), "÷", String(b), ")", "+", String(d)];
}

function renderExpression() {
  expressionArea.innerHTML = "";

  const validGroups = getClickableGroups(currentTokens);

  currentTokens.forEach((token, i) => {
    const span = document.createElement("span");
    span.classList.add("part");

    if (token === "(" || token === ")") {
      span.style.color = "#7c3aed";
    } else if (["×", "÷"].includes(token)) {
      span.style.color = "#dc2626";
    } else if (["+", "-"].includes(token)) {
      span.style.color = "#2563eb";
    }

    span.textContent = token;

    const group = validGroups.find(g => g.indices.includes(i));
    if (group) {
      span.classList.add("clickable");
      span.dataset.start = group.start;
      span.dataset.end = group.end;
    }

    expressionArea.appendChild(span);
  });

  document.querySelectorAll(".clickable").forEach(el => {
    el.addEventListener("click", () => {
      const start = parseInt(el.dataset.start);
      const end = parseInt(el.dataset.end);
      handleChoice(start, end);
    });
  });

  if (currentTokens.length === 1) {
    message.textContent = `Level complete! Final answer = ${currentTokens[0]}`;
    score += 10;
    updateStats();
    nextBtn.disabled = false;
  }
}

function getClickableGroups(tokens) {
  const groups = [];
  const correct = getNextCorrectOperation(tokens);

  if (!correct) return groups;

  const candidates = getAllOperationGroups(tokens);

  for (const group of candidates) {
    groups.push(group);
  }

  return groups.map(g => ({
    ...g,
    isCorrect: g.start === correct.start && g.end === correct.end
  }));
}

function getAllOperationGroups(tokens) {
  const groups = [];

  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i] === "(") {
      const closeIndex = findMatchingBracket(tokens, i);
      if (closeIndex !== -1) {
        const inner = tokens.slice(i + 1, closeIndex);

        if (inner.length === 3 && isNumber(inner[0]) && isOperator(inner[1]) && isNumber(inner[2])) {
          groups.push({
            start: i,
            end: closeIndex,
            indices: [i, i + 1, i + 2, i + 3, closeIndex],
            text: tokens.slice(i, closeIndex + 1).join(" ")
          });
        }
      }
    }
  }

  for (let i = 1; i < tokens.length - 1; i++) {
    if (
      isOperator(tokens[i]) &&
      isNumber(tokens[i - 1]) &&
      isNumber(tokens[i + 1]) &&
      !isInsideUnsolvedBrackets(tokens, i)
    ) {
      groups.push({
        start: i - 1,
        end: i + 1,
        indices: [i - 1, i, i + 1],
        text: `${tokens[i - 1]} ${tokens[i]} ${tokens[i + 1]}`
      });
    }
  }

  return uniqueGroups(groups);
}

function uniqueGroups(groups) {
  const seen = new Set();
  return groups.filter(g => {
    const key = `${g.start}-${g.end}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function handleChoice(start, end) {
  if (gameFinished) return;

  const correct = getNextCorrectOperation(currentTokens);
  if (!correct) return;

  if (start === correct.start && end === correct.end) {
   highlightCorrect(correct.start, correct.end);

setTimeout(() => {
  const result = solveGroup(currentTokens, correct.start, correct.end);
  currentTokens = result.tokens;
  score += 5;
  message.textContent = `Correct! ${result.explanation}`;
  updateStats();
  renderExpression();
}, 500);
    currentTokens = result.tokens;
    score += 5;
    message.textContent = `Correct! ${result.explanation}`;
    updateStats();
    renderExpression();
  } else {
    lives--;
    updateStats();
    message.textContent = `Not first. ${correct.rule}`;
    flashWrongChoice(start, end);

    if (lives <= 0) {
      endGame();
    }
  }
}

function flashWrongChoice(start, end) {
  const parts = document.querySelectorAll(".part");
  for (let i = start; i <= end; i++) {
    if (parts[i]) {
      parts[i].classList.add("wrong");
      setTimeout(() => parts[i].classList.remove("wrong"), 500);
    }
  }
}

function getNextCorrectOperation(tokens) {
  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i] === "(") {
      const closeIndex = findMatchingBracket(tokens, i);
      if (closeIndex !== -1) {
        const inner = tokens.slice(i + 1, closeIndex);

        if (inner.length === 3 && isNumber(inner[0]) && isOperator(inner[1]) && isNumber(inner[2])) {
          return {
            start: i,
            end: closeIndex,
            rule: "Brackets come first in BODMAS."
          };
        }
      }
    }
  }

  for (let i = 1; i < tokens.length - 1; i++) {
    if (
      ["×", "÷"].includes(tokens[i]) &&
      isNumber(tokens[i - 1]) &&
      isNumber(tokens[i + 1]) &&
      !isInsideUnsolvedBrackets(tokens, i)
    ) {
      return {
        start: i - 1,
        end: i + 1,
        rule: "Multiplication and division come before addition and subtraction."
      };
    }
  }

  for (let i = 1; i < tokens.length - 1; i++) {
    if (
      ["+", "-"].includes(tokens[i]) &&
      isNumber(tokens[i - 1]) &&
      isNumber(tokens[i + 1]) &&
      !isInsideUnsolvedBrackets(tokens, i)
    ) {
      return {
        start: i - 1,
        end: i + 1,
        rule: "After brackets, multiplication, and division, solve addition/subtraction left to right."
      };
    }
  }

  return null;
}

function solveGroup(tokens, start, end) {
  const selected = tokens.slice(start, end + 1);
  let explanation = "";
  let value = 0;

  if (selected[0] === "(" && selected[selected.length - 1] === ")") {
    const a = Number(selected[1]);
    const op = selected[2];
    const b = Number(selected[3]);
    value = calculate(a, op, b);
    explanation = `Solved bracket first: (${a} ${op} ${b}) = ${value}`;
  } else {
    const a = Number(selected[0]);
    const op = selected[1];
    const b = Number(selected[2]);
    value = calculate(a, op, b);
    explanation = `Solved ${a} ${op} ${b} = ${value}`;
  }

  const newTokens = [
    ...tokens.slice(0, start),
    String(value),
    ...tokens.slice(end + 1)
  ];

  return { tokens: newTokens, explanation };
}

function calculate(a, op, b) {
  switch (op) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "×":
      return a * b;
    case "÷":
      return a / b;
    default:
      return 0;
  }
}

function findMatchingBracket(tokens, openIndex) {
  let count = 0;
  for (let i = openIndex; i < tokens.length; i++) {
    if (tokens[i] === "(") count++;
    if (tokens[i] === ")") count--;
    if (count === 0) return i;
  }
  return -1;
}

function isInsideUnsolvedBrackets(tokens, index) {
  let openBefore = -1;
  for (let i = index; i >= 0; i--) {
    if (tokens[i] === "(") {
      openBefore = i;
      break;
    }
    if (tokens[i] === ")") {
      break;
    }
  }

  if (openBefore === -1) return false;

  const closeIndex = findMatchingBracket(tokens, openBefore);
  return closeIndex > index;
}

function isNumber(token) {
  return !isNaN(token);
}

function isOperator(token) {
  return ["+", "-", "×", "÷"].includes(token);
}

function showHint() {
  const correct = getNextCorrectOperation(currentTokens);
  if (!correct) return;
  message.textContent = `Hint: ${correct.rule}`;
}

function endGame() {
  gameFinished = true;
  finalScoreEl.textContent = score;
  showScreen(resultScreen);
}

async function saveScore() {
  const playerName = document.getElementById("playerName").value.trim();

  if (!playerName) {
    saveMessage.textContent = "Please enter your name.";
    return;
  }

  try {
    const response = await fetch("save_score.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: playerName,
        score: score
      })
    });

    const data = await response.json();
    saveMessage.textContent = data.message;
  } catch (error) {
    saveMessage.textContent = "Could not save score.";
  }
}
function highlightCorrect(start, end) {
  const parts = document.querySelectorAll(".part");
  for (let i = start; i <= end; i++) {
    if (parts[i]) {
      parts[i].classList.add("correct");
    }
  }
}