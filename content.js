chrome.storage.local.get(['locked'], (result) => {
  if (result.locked) {
    let overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    overlay.style.zIndex = '9999';
    overlay.style.display = 'flex';
    overlay.style.flexDirection = 'column';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.color = 'white';
    overlay.innerHTML = `
      <div>
        <h1>Enter Password to Unlock</h1>
        <input type="password" id="passwordInput" style="font-size: 20px; padding: 10px;">
        <button id="submitPassword" style="font-size: 20px; padding: 10px; margin-top: 10px;">Submit</button>
      </div>
    `;

    document.body.appendChild(overlay);

    document.getElementById('submitPassword').addEventListener('click', () => {
      let password = document.getElementById('passwordInput').value;
      chrome.runtime.sendMessage({ type: 'checkPassword', password: password }, (response) => {
        if (response.success) {
          document.body.removeChild(overlay);
        } else {
          alert('Incorrect password');
        }
      });
    });
  }
});