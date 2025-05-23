function checkPassword() {
  const input = document.getElementById('pw').value;
  if (input === "2600") {
    document.getElementById('auth').remove();
    loadPage();
  } else {
    document.getElementById('error').innerText = "비밀번호가 틀렸습니다.";
  }
}
function loadPage() {
  fetch("ui.html")
    .then(res => res.text())
    .then(html => {
      document.getElementById('container').innerHTML = html;
      const script = document.createElement("script");
      script.src = "ui.js";
      document.body.appendChild(script);
    });
}
