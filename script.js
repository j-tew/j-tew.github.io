const myGitHub = "https://github.com/j-tew"
// Generating the output of the command
const renderOutput = (cmd) => {
  if (cmd === 'clear') {
    Shell.clear();
    return
  }
  let outputText = Shell[cmd]();
  let outputDiv = document.createElement('div');
  outputDiv.setAttribute('id', 'output');
  outputDiv.innerHTML = outputText;
  document.body.append(outputDiv);
};

// Add new line for the terminal
const mkTerminal = () => {
  let newTermHTML = `
    <span id="prompt"><span class="cyan">~</span><span class="green">❯</span></span>
    <span><textarea id="command" rows="1" cols="22" maxlength="22" autofocus></textarea></span>
  `;
  let newTermDiv = document.createElement('div');
  newTermDiv.setAttribute('name', 'terminal');
  newTermDiv.innerHTML = newTermHTML;
  document.body.append(newTermDiv);
};

// New terminal on load
onload = () => {
  mkTerminal();
};

// Shell commands
const Shell = {
  invalid: () => {
    return `<p>Command not found.<br>Run 'help' to see the available commands</p>`
  },
  help: () => {
    return `
      <p>Available commands:</p>
      <ul style="list-style-type: none">
        <li>help -> print this dialog</li>
        <li>about -> print a short intro</li>
        <li>projects -> print a few of my projects</li>
        <li>dotfiles -> get my configs</li>
        <li>calc -> open a calculator</li>
        <li>clear -> clear the terminal</li>
    `
  },
  about: () => {
    return `
    <p>
      My name is Justin Tew, and I'm a Marine Corps veteran and a software developer.
      I am primarily proficient in Python, but can learn anything quickly. Some other areas I have gained experience in include
      JavaScript, Linux, scripting, DevOps, SQL, and networking. I'm getting familiar with Go and Docker. Other areas I intend to explore
      include C, Kubernetes, and whatever else captures my interest and inspires me to learn.
    </p>`
  },
  projects: () => {
    return `
      <p>Some of the projects on <a href="${myGitHub}" target="_blank">my GitHub</a> include:</p>
      <ul style="list-style-type: none">
        <li>-> <a href="${myGitHub}/warlord" target="_blank">A spin on the 1984 MSDOS game "Drug Wars" (*WIP* CLI written in Go)</a></li>
        <li>-> <a href="${myGitHub}/ptlog" target="_blank">An htmx web app that just puts form input into a table (my first htmx project)</a></li>
        <li>-> <a href="${myGitHub}/genpass" target="_blank">A simple password generator (my first Go project)</a></li>
        <li>-> <a href="${myGitHub}/Hangman" target="_blank">Hangman game (my first Python project)</a></li>
        <li>-> <a href="${myGitHub}/crazy8_site" target="_blank">Static site for a local bar using Django</a></li>
        <li>-> <a href="${myGitHub}/curses-typing-test" target="_blank">Typing Test CLI using NCurses</a></li>
        <li>-> <a href="${myGitHub}/iss_location" target="_blank">ISS Location Flask web app that uses APIs</a></li>
        <li>-> <a href="/js-simple-calc">A simple JQuery calculator(my first Javascript project)</a></li>
      </ul>`
  },
  clear: () => {
    document.body.innerHTML = '';
  },
  calc: () => {
    window.location.assign('/js-simple-calc')
    return ``
  },
  dotfiles: () => {
    return `
    <p>You can find my dotfiles <a href="${myGitHub}/dotfiles" target="_blank">here</a>.</p>
    <p>I prefer a terminal based workflow, so my configurations include:</p>
    <ul style="list-style-type: none">
      <li>-> alacritty teminal</li>
      <li>-> zsh</li>
      <li>-> tmux</li>
      <li>-> lf (a CLI file manager written in Go)</li>
      <li>-> neovim (with Lazy plugin manager for LSP, completion, and fuzzy finder)</li>
    </ul>`
  }
};
// List of shell commands
const validCmds = Object.keys(Shell);

// Keep command line focused when clicking anywhere
document.body.addEventListener('mouseup', () => {
  let cmdInput = document.getElementById('command');
  cmdInput.focus();
});

// On pressing Enter, don't go to new line, check command and output, if valid
document.body.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    let cmdInput = document.getElementById('command');
    let cmd = cmdInput.value;
    if (cmd === "invalid" || !(validCmds.includes(cmd))) {
      renderOutput("invalid");
    } else {
      renderOutput(cmd);
    }
  // Disable the text area after command is entered
  cmdInput.setAttribute('readonly', 'readonly');
  // Remove ID
  cmdInput.removeAttribute('id');
  // Create a new terminal line with the same ID and select/focus it
  mkTerminal();
  cmdInput = document.getElementById('command');
  cmdInput.focus();
  }
});


