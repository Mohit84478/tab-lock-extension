chrome.storage.local.get(['locked'], (result) => {
  if (result.locked) {
    // Create overlay div
    let overlay = document.createElement('div');

    // Styling for overlay
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'; // Semi-transparent black background
    overlay.style.zIndex = '9999';
    overlay.style.display = 'flex';
    overlay.style.flexDirection = 'column';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.color = 'white';

    // HTML content for overlay
    overlay.innerHTML = `
      <div>
        <h1 style="color: white; cursor: context-menu;">Enter Password  t<b id="togglePassword" >o</b> unlock</h1>
        <input type="password" id="passwordInput" placeholder="Enter password" style="font-size: 20px; padding: 10px; border-radius: 40px;">
        <button id="submitPassword" style="font-size: 20px; padding: 10px; margin-top: 10px;">Submit</button>

        <div id="dis" style="display: none;">
          <h1 style="color: white; cursor: context-menu;">Set Password</h1>
          <input type="password" id="password" style="font-size: 20px; padding: 10px;">
          <button id="lock" style="font-size: 20px; padding: 10px; margin-top: 10px;">Submit</button>
        </div>
      </div>
    `;

    // Append overlay to body
    document.body.appendChild(overlay);

    // Get references t
    const togglePassword = document.getElementById('togglePassword');
    const secondDiv = document.getElementById('dis');

    // Add click event listener to togglePassword
    togglePassword.addEventListener('click', function() {
      // Toggle visibility of secondDiv
      if (secondDiv.style.display === 'none' || secondDiv.style.display === '') {
        secondDiv.style.display = 'block';
      } else {
        secondDiv.style.display = 'none';
      }
    });

    // Event listener for setting password
    document.getElementById('lock').addEventListener('click', () => {
      const password = document.getElementById('password').value;
      chrome.storage.local.set({ password: password }, () => {
        alert('Password set');
      });
    });

    // Event listener for submitting password
    document.getElementById('submitPassword').addEventListener('click', () => {
      let password = document.getElementById('passwordInput').value;
      chrome.runtime.sendMessage({ type: 'checkPassword', password: password }, (response) => {
        if (response.success) {
          document.body.removeChild(overlay); // Remove overlay on successful password
        } else {
          alert('Incorrect password');
        }
      });
    });
  }
});
