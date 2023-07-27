const fields = [
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null
  ];


  const WINNING_COMBINATIONS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical
    [0, 4, 8], [2, 4, 6], // diagonal
];

  let currentPlayer = 'cross';

  function init() {
    render();
}

function render() {
    const contentDiv = document.getElementById('content');

    // Generate table HTML
    let tableHtml = '<table>';
    for (let i = 0; i < 3; i++) {
        tableHtml += '<tr>';
        for (let j = 0; j < 3; j++) {
            const index = i * 3 + j;
            let symbol = '';
            if (fields[index] === 'circle') {
                symbol = generateCircleSVG();
            } else if (fields[index] === 'cross') {
                symbol = generateCrossSVG();
            }
            tableHtml += `<td onclick="handleClick(this, ${index})">${symbol}</td>`;
        }
        tableHtml += '</tr>';
    }
    tableHtml += '</table>';

    // Set table HTML to contentDiv
    contentDiv.innerHTML = tableHtml;
}


function handleClick(cell, index) {
  if (fields[index] === null) {
      fields[index] = currentPlayer;
      cell.innerHTML = currentPlayer === 'circle' ? generateCircleSVG() : generateCrossSVG();
      cell.onclick = null;
      currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle';

      if (isGameFinished()) {
        const winCombination = getWinningCombination();
        if (winCombination) {
          drawWinningLine(winCombination);
        } else {
          showGameFinishedMessage();
        }
    }
  }
}


function isGameFinished() {
  return fields.every((field) => field !== null);
}

function showGameFinishedMessage() {
  document.getElementById('result').innerHTML = 'Das spiel ist vorbei!'
}



function isGameFinished() {
  return fields.every((field) => field !== null) || getWinningCombination() !== null;
}

function getWinningCombination() {
  for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
      const [a, b, c] = WINNING_COMBINATIONS[i];
      if (fields[a] === fields[b] && fields[b] === fields[c] && fields[a] !== null) {
          return WINNING_COMBINATIONS[i];
      } 
  }
  return null
}



function generateCircleSVG() {
  const color = "#FFD700";
  const width = 60;
  const height = 60;
  const svgCode = `
  <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <circle cx="${width / 2}" cy="${height / 2}" r="25" fill="transparent" stroke="${color}" stroke-width="5" 
      stroke-dasharray="0 ${2 * Math.PI * 15}">
      <animate attributeName="stroke-dasharray" begin="0s" dur=".4s" repeatCount="1" from="0 ${2 * Math.PI * 15}" to="${2 * Math.PI * 15} 0" fill="freeze"/>
    </circle>
  </svg>
`;

return svgCode;
}


function generateCrossSVG() {
  const color = "#87CEEB";
  const width = 60;
  const height = 60;
  const svgCode = `
  <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <line x1="0" y1="0" x2="${width}" y2="${height}" stroke="${color}" stroke-width="5">
      <animate attributeName="stroke-dasharray" from="0 ${width}" to="${width} 0" dur=".4s" fill="freeze" />
    </line>
    <line x1="${width}" y1="0" x2="0" y2="${height}" stroke="${color}" stroke-width="5">
      <animate attributeName="stroke-dasharray" from="0 ${width}" to="${width} 0" dur=".4s" fill="freeze" />
    </line>
  </svg>
`;

return svgCode;
}


function drawWinningLine(combination) {
  const lineColor = '#ffffff';
  const lineWidth = 5;

  const startCell = document.querySelectorAll(`td`)[combination[0]];
  const endCell = document.querySelectorAll(`td`)[combination[2]];
  const startRect = startCell.getBoundingClientRect();
  const endRect = endCell.getBoundingClientRect();

  const contentRect = document.getElementById('content').getBoundingClientRect();

  const lineLength = Math.sqrt(
    Math.pow(endRect.left - startRect.left, 2) + Math.pow(endRect.top - startRect.top, 2)
  );
  const lineAngle = Math.atan2(endRect.top - startRect.top, endRect.left - startRect.left);

  const line = document.createElement('div');
  line.style.position = 'absolute';
  line.style.width = `${lineLength}px`;
  line.style.height = `${lineWidth}px`;
  line.style.backgroundColor = lineColor;
  line.style.top = `${startRect.top + startRect.height / 2 - lineWidth / 2 - contentRect.top}px`;
  line.style.left = `${startRect.left + startRect.width / 2 - contentRect.left}px`;
  line.style.transform = `rotate(${lineAngle}rad)`;
  line.style.transformOrigin = `top left`;
  document.getElementById('content').appendChild(line);
}


