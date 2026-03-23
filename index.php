<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BODMAS Rush</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container">
    <header class="topbar">
  <h1>BODMAS Rush</h1>
  <div class="stats">
    <span>Level: <strong id="level">1</strong></span>
    <span>Score: <strong id="score">0</strong></span>
    <span>Lives: <strong id="lives">3</strong></span>
  </div>
</header>

<div class="progress-container">
  <div id="progressBar"></div>
</div>

    <section id="homeScreen" class="screen active">
      <h2>Learn BODMAS the fun way</h2>
      <p>Click the operation that should be solved first.</p>
      <button id="startBtn">Start Game</button>
      <button id="rulesBtn">Learn Rules</button>
    </section>

    <section id="rulesScreen" class="screen">
      <h2>BODMAS Rules</h2>
      <ul>
        <li><strong>B</strong> - Brackets first</li>
        <li><strong>O</strong> - Orders / powers</li>
        <li><strong>D</strong> and <strong>M</strong> - Division and Multiplication from left to right</li>
        <li><strong>A</strong> and <strong>S</strong> - Addition and Subtraction from left to right</li>
      </ul>
      <button id="backBtn">Back</button>
    </section>

    <section id="gameScreen" class="screen">
      <div class="question-box">
        <p class="instruction">Select the next correct operation:</p>
        <div id="expressionArea" class="expression-area"></div>
        <p id="message" class="message"></p>
        <div class="game-actions">
          <button id="hintBtn">Hint</button>
          <button id="nextBtn" disabled>Next Level</button>
        </div>
      </div>
    </section>

    <section id="resultScreen" class="screen">
      <h2>🎉GAME OVER🎉</h2>
      <p>Great job! You practiced BODMAS step-by-step.</p>
      <p>Your score: <strong id="finalScore">0</strong></p>
      <input type="text" id="playerName" placeholder="Enter your name">
      <div class="game-actions">
        <button id="saveBtn">Save Score</button>
        <button id="restartBtn">Play Again</button>
      </div>
      <p id="saveMessage"></p>
    </section>
  </div>

  <script src="script.js"></script>
</body>
</html>