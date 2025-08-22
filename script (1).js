// Windows 10 Window Logic with Custom Interfaces

let zIndexCounter = 1000;
function openWindow(title) {
  const container = document.getElementById('window-container');

  const win = document.createElement('div');
  win.classList.add('window');

  
  

  const content = getWindowContent(title);

  win.innerHTML = `
    <div class="window-header">
      <span class="window-title">${title}</span>
      <div class="window-controls">
        <button onclick="minimizeWindow(this)" title="Minimize">
          <img src="icons/minus.png" alt="_" width="16" height="16" />
        </button>
        <button onclick="maximizeWindow(this)" title="Maximize">
          <img src="icons/restore-down.png" alt="[]" width="16" height="16" />
        </button>
        <button onclick="closeWindow(this)" title="Close">
          <img src="icons/cross.png" alt="×" width="16" height="16" />
        </button>
      </div>
    </div>
    <div class="window-content">
      ${content}
    </div>
  `;

  container.appendChild(win);
  makeDraggable(win);

  if (title === 'Visual Studio') {
    setTimeout(() => {
      const ta = win.querySelector('.code-editor');
      if (ta) {
        const editor = CodeMirror.fromTextArea(ta, {
        mode: "javascript", 
        theme: "dracula",  
        lineNumbers: true,
        autoCloseBrackets: true,
        matchBrackets: true,
        indentUnit: 2,
        tabSize: 2
     });
        window.cmEditor = editor;
      } else {
        console.error('CodeMirror initialization failed: .code-editor not found');
      }
    }, 100);
  }
}

function getWindowContent(title) {
  switch (title) {
    case 'This PC':
      return `
        <div class="pc-interface">
          <div class="drive"><img src="icons/hard-drive-icon-13.png" width="40" height="40" /><span>Local Disk (C:)</span></div>
          <div class="drive"><img src="icons/Drive.png" width="40" height="40" /><span>Local Disk (D:)</span></div>
          <div class="drive"><img src="icons/Drive.png" width="40" height="40" /><span>Local Disk (E:)</span></div>
          <div class="drive"><img src="icons/Drive.png" width="40" height="40" style = "cursor:pointer;" /><span>Local Disk (F:)</span></div>
        </div>
      `;

    case 'Recycle Bin':
      // Show items in recycle bin, allow restore or permanent delete
      const recycleItems = window.recycleBinItems || [];
      if (recycleItems.length === 0) {
      return `<p>Recycle Bin is empty</p>`;
      }
      return `
      <div class="recycle-bin-list">
        ${recycleItems.map((item, idx) => `
        <div class="recycle-item">
          <span>${item.name}</span>
          <button onclick="restoreRecycleItem(${idx})">Restore</button>
          <button onclick="deleteRecycleItemPermanently(${idx})">Delete Permanently</button>
        </div>
        `).join('')}
      </div>
      `;

    case 'Valorant':
      return `
        <div class="valorant-interface">
          <img class="banner" src="icons/valorant-heroes-grayscale-banner.jpg.webp" />
          <button class="launch-btn">Start Match</button>
          <div class="valorant-description">
            <p><strong>Valorant</strong> is a 5v5 tactical shooter developed by Riot Games. Engage in thrilling matches with agents and abilities.</p>
          </div>
        </div>
      `;

case 'Gameloop':
  return `
  <div class="gameloop-interface">

    <!-- Trending Games (Compact Cards) -->
    <h3 class="trend-heading">🔥 Trending Games</h3>
    <div class="game-list trend-row">
      ${[
        ['PUBG Mobile', 'icons/654c7b8d8d313_com.tencent.ig.png'],
        ['Call of Duty', 'icons/App_Icon_CODM_Global.webp'],
        ['Minecraft', 'icons/21509-256x256x32.png'],
        ['Free Fire', 'icons/ac4e7a4f341e7281b0f6f274f9ec3905.png'],
        ['Brawl Stars', 'icons/unnamed.png']
      ].map(([name, icon]) => `
        <div class="card-trend">
          <img src="${icon}" alt="Game icon for ${name}. Card in Trending Games row." />
          <span>${name}</span>
        </div>
      `).join('')}
    </div>

    <hr class="gameloop-divider" />

    <!-- Editor's Picks (Medium Cards with Buttons) -->
    <h3 class="section-heading">✨ Editor's Picks</h3>
    <div class="editor-grid">
      ${[
        ['Fortnite', 'icons/Fortnite_S1.webp'],
        ['Roblox', 'icons/Roblox_(2025)_(App_Icon).svg.png'],
        ['Among Us', 'icons/images.png'],
        ['FIFA Mobile', 'icons/fifa-icon.png'],
        ['Asphalt 9', 'icons/Alphast9-icon.webp'],
        ['Clash Royale', 'icons/clash-royal-icon.png'],
        ['Subway Surfers', 'icons/subway-surfer-icon.webp'],
        ['Temple Run', 'icons/temple-run.png']
      ].map(([name, icon]) => `
        <div class="card-editor">
          <img src="${icon}" alt="Game icon for ${name}. Card in Editors Picks section with Install button." />
          <span>${name}</span>
          <button class="install-btn">Install</button>
        </div>
      `).join('')}
    </div>

    <hr class="gameloop-divider" />

    <!-- All Games (Big Grid) -->
    <h3 class="section-heading">🕹️ All Games</h3>
    <div class="all-games-grid">
      ${[
        ['PUBG Mobile', 'icons/654c7b8d8d313_com.tencent.ig.png'],
        ['APEX Legend', 'icons/21509-256x256x32.png'],
        ['FIFA 2025', 'icons/fifa-icon.png'],
        ['Garena Free Fire', 'icons/unnamed.png'],
        ['Clash Royal', 'icons/clash-royal-icon.png'],
        ['Subway Surfer', 'icons/subway-surfer-icon.webp'],
        ['Among Us', 'icons/images.png'],
        ['Genshin Impact', 'icons/ac4e7a4f341e7281b0f6f274f9ec3905.png'],
        ['Roblox', 'icons/Roblox_(2025)_(App_Icon).svg.png'],
        ['Temple Run', 'icons/temple-run.png'],
        ['Alphast 9', 'icons/Alphast9-icon.webp'],
        ['PlayStore', 'icons/play-store-icon.png'],
        ['WhatsApp', 'icons/whatsapp.png'],
        ['Granny: Chapter 1', 'icons/granny-icon.png'],
        ['Fifa', 'icons/fifa-icon.png'],
        ['Granny: Chapter 3', 'icons/granny3.webp'],
        ['Avakin Life 2', 'icons/avakin-life.jpg'],
        ['Chatgpt', 'icons/chatgpt-icon.jpg'],
        ['Minecraft', 'icons/MC-icon.webp'],
        ['Brawllhala', 'icons/brawll-icon.jpg'],
        ['Granny: Chapter 2', 'icons/granny2-icon.webp'],
        ['COD Mobile', 'icons/App_Icon_CODM_Global.webp'],
        ['Candy Crush 2', 'icons/candy-crush.png'],
        ['Adobe Photoshop', 'icons/Adobe-photoshop-icon.png'],
        ['8 Ball Pool', 'icons/8ball-icon.webp'],
        ['NFS: No Limit', 'icons/nfs-no-limit.webp'],
        ['Top drive: Car Racing', 'icons/top-drive.webp'],
        ['Shadow Fight', 'icons/shadow-fight.png'],
        ['My Talking Tom', 'icons/talking-tom.png'],
        ['Frag Pro Shooter', 'icons/Frag-pro-shooter.png'],
        ['Brawl Star', 'icons/brawl-star.png'],
        ['Cover Fire: Action Game', 'icons/cover-fire.jpg'],
        ['Hungry Shark', 'icons/hungry-shark.png'],
        ['Mortal Combat', 'icons/Mortal-combat.png'],
        ['Gangstar Vegas: World of Crime', 'icons/gangster-icon.png'],
        ['Marvels Contest', 'icons/marvels.webp'],
        ['Arm Hiest', 'icons/arm-hiest.png'],
        ['Fruit Ninja', 'icons/fruit-ninja.png'],
        ['Grim Valor', 'icons/grim-valor-icon.png'],
        ['Snake.io', 'icons/snake-io-icon.png'],
        ['Standoff 2', 'icons/stand-off-icon.webp'],
        ['War Robot', 'icons/war-robot.png'],
        ['Payback 2', 'icons/payback-2-icon.png'],
        ['The Walking Zombies', 'icons/the-walking-zombie.webp'],
        ['Steam', 'icons/steam-logo-steam-icon-transparent-free-png.webp'],
        ['Super Mario', 'icons/super-mario.jpg']
      ].map(([name, icon], i) => `
        <div class="card-all">
          <img src="${icon}" alt="Generic game icon for ${name} in All Games grid." />
          <span>${name}</span>
        </div>
      `).join('')}
    </div>

  </div>
  `;



    case 'Visual Studio':
      return `
        <div class="vs-window">
          <div class="vs-top-bar">
            <span class="btn" onclick="runCode()">Run</span>
            <span class="btn">Debug</span>
            <span class="btn" onclick="toggleTerminal()">Terminal</span>
            <span class="btn">Extensions</span>
            <span class="btn">⚙️</span>
            <select id="language-selector" onchange="updateLanguageTab(this)">
              <option value="JavaScript" selected>JavaScript</option>
              <option value="C/C++">C/C++</option>
              <option value="Python">Python</option>
              <option value="PHP">PHP</option>
              <option value="Java">Java</option>
              <option value="C#">C#</option>
            </select>
          </div>
          <div class="vs-main">
            <div class="vs-sidebar">
              <img src="icons/script.png" title="Explorer" />
              <img src="icons/search.png" title="Search" />
              <img src="icons/version-control.png" title="Source Control" />
              <img src="icons/puzzle.png" title="Extensions" />
            </div>
            <div class="vs-editor-area">
              <div class="vs-tab" id="vs-tab-label">index.js ✖️</div>
              <textarea class="code-editor">// Write your code here...</textarea>
            </div>
          </div>
          <div class="vs-terminal" id="vs-terminal" style="display: none;">
            <div class="vs-terminal-output" id="terminal-output"></div>
          </div>
          <div class="vs-status-bar">
            <span id="lang-indicator">JavaScript</span>
            <span>Prettier</span>
            <span>Ln 1, Col 1</span>
            <span>UTF-8</span>
            <span>LF</span>
          </div>
        </div>
      `;

      case 'Chrome':
  return `
    <div class="chrome-interface">
      <div class="chrome-topbar">
        <div class="chrome-tabs">
          <div class="tab active">New Tab</div>
          <div class="tab-btn">+</div>
        </div>
        
      </div>
      <div class="chrome-address-bar">
        <img src="icons/arrow_back_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.png" />
        <img src="icons/arrow_forward_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.png" />
        <img src="icons/forward_media.png" />
        <input type="text" value="https://www.google.com" />
        <img src="icons/git-hub.png" />
      </div>
      <div class="chrome-browser-content">
        <iframe src="https://www.google.com" frameborder="0"></iframe>
      </div>
    </div>
  `;


    default:
      return `<p>Welcome to ${title}</p>`;
  }
}

function closeWindow(btn) {
  const win = btn.closest('.window');
  win.remove();
}

function minimizeWindow(btn) {
  const win = btn.closest('.window');
  win.querySelector('.window-content').style.display = 'none';
}

function maximizeWindow(btn) {
  const win = btn.closest('.window');
  win.classList.toggle('maximized');
}

function makeDraggable(win) {
  let isDragging = false, offsetX, offsetY;

  const header = win.querySelector('.window-header');
  
  

  header.onmousedown = e => {
    isDragging = true;
    offsetX = e.clientX - win.offsetLeft;
    offsetY = e.clientY - win.offsetTop;
    win.style.zIndex = zIndexCounter++;
    
  
    
  };
 
  

  document.onmousemove = e => {
    if (isDragging) {
      win.style.left = `${e.clientX - offsetX}px`;
      win.style.top = `${e.clientY - offsetY}px`;
    }
  };

  document.onmouseup = () => isDragging = false;
}





// Terminal Show/Hide
function toggleTerminal(forceOpen = false) {
  const terminal = document.getElementById("vs-terminal");
  if (!terminal) return;
  terminal.style.display = (forceOpen || terminal.style.display === "none" || terminal.style.display === "") ? "block" : "none";
}




// Update tab + status bar based on language selection
function updateLanguageTab(select) {
  const lang = select.value;
  const tabLabel = document.getElementById("vs-tab-label");
  const langStatus = document.getElementById("lang-indicator");
  if (tabLabel) tabLabel.innerText = `index.${getExtension(lang)} ✖️`;
  if (langStatus) langStatus.innerText = lang;
}







// File extension map
function getExtension(lang) {
  switch (lang) {
    case "JavaScript": return "js";
    case "C/C++": return "c";
    case "Python": return "py";
    case "PHP": return "php";
    case "Java": return "java";
    case "C#": return "cs";
    default: return "txt";
  }
}





// Get Judge0 Language ID
function getSelectedLanguageId() {
  const lang = document.getElementById("language-selector")?.value;
  const map = {
    "C/C++": 50,      // C (GCC)
    "Python": 71,     // Python 3
    "PHP": 68,        // PHP
    "Java": 62,       // Java
    "C#": 51,         // C#
    "JavaScript": 63  // JavaScript
  };
  return map[lang] || 63;
}




// Run Code via Judge0 API
async function runCode() {
  const code = window.cmEditor?.getValue?.() || '';
  const language_id = getSelectedLanguageId();

  if (!code) return alert("Please enter some code!");

  // Show terminal
  toggleTerminal(true);

  const outputBox = document.getElementById("terminal-output");
  outputBox.innerText = "Running...";

  try {
    const response = await fetch("https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Key": "fddde7a846msh0057937878064a7p1d4431jsnb4504e55e552",
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com"
      },
      body: JSON.stringify({
        source_code: code,
        language_id: language_id,
      })
    });

    const result = await response.json();

    // Clean output - only exact compiler-style output
    const cleanOutput = result.stdout?.trim();

    outputBox.innerText = cleanOutput || result.stderr || result.compile_output || "Hello" + (result.status?.description || " Execution completed")  + "!" 
  } catch (error) {
    outputBox.innerText = "⚠️ Error: " + error.message;
  }
}

// Start Menu

function toggleStartMenu() {
  const menu = document.getElementById("startMenu");
  menu.style.display = menu.style.display === "flex" ? "none" : "flex";
}