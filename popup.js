document.getElementById('setPassword').addEventListener('click', () => {
  const password = document.getElementById('password').value;
  chrome.storage.local.set({ password: password });
  alert('Password set');
});

document.getElementById('lock').addEventListener('click', () => {
  chrome.runtime.sendMessage({ type: 'lockBrowser' });
  alert('Browser locked');
});
