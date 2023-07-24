

const fields = [
    'cross', 
    'circle', 
    'circle',
     null,
    'cross', 
    'circle',
    'cross',
     null, 
    'circle'
  ];

  function init(){
    rendern()

  }
  
  function rendern() {
    const container = document.getElementById('container');
    const table = document.createElement('table');
    let cellIndex = 0;
  
    for (let i = 0; i < 3; i++) {
      const row = document.createElement('tr');
      for (let j = 0; j < 3; j++) {
        const cell = document.createElement('td');
        const fieldValue = fields[cellIndex++];
        
        if (fieldValue === 'cross') {
          cell.innerHTML = generateAnimatedXSVG();
        } else if (fieldValue === 'circle') {
          cell.innerHTML = generateAnimatedCircleSVG();
        }
        
        row.appendChild(cell);
      }
      table.appendChild(row);
    }
  
    container.innerHTML = '';
    container.appendChild(table);
  }


  function generateAnimatedCircleSVG() {
    const color = "#FFD700";
    const width = 40;
    const height = 40;
    const svgCode = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <circle cx="${width / 2}" cy="${height / 2}" r="15" fill="transparent" stroke="${color}" stroke-width="5" 
        stroke-dasharray="0 ${2 * Math.PI * 15}">
        <animate attributeName="stroke-dasharray" begin="0s" dur=".4s" repeatCount="1" from="0 ${2 * Math.PI * 15}" to="${2 * Math.PI * 15} 0" fill="freeze" />
      </circle>
    </svg>
`;

  return svgCode;

  }  


  function generateAnimatedXSVG() {

    const color = "#87CEEB";
    const width = 30;
    const height = 30;
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
  

