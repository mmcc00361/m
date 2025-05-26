function authorize() {
  const input = document.getElementById("pw").value;
  const hash = input.split('').map(c => c.charCodeAt(0) + 1).join('-');
  if (hash === "51-55-49-49") {
    document.getElementById('auth').style.display = 'none';
    document.getElementById('page').style.display = 'flex';
    const generalBtn = [...document.querySelectorAll('.tab-btn')].find(btn => btn.textContent.includes("일반검색"));
    if (generalBtn) {
      switchTab('generalTab', generalBtn);
    }
  } else {
    alert("비밀번호가 틀렸습니다.");
  }
}