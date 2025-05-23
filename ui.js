let generalData = [], discountData = [], agencyData = [];
function highlight(text, keyword) {
  if (!keyword) return text;
  return String(text).replace(new RegExp(keyword, "gi"), match => `<mark>${match}</mark>`);
}
function renderTable(data, keyword, headId, bodyId, noResultId) {
  const thead = document.getElementById(headId);
  const tbody = document.getElementById(bodyId);
  const noResults = document.getElementById(noResultId);
  const filtered = data.filter(row =>
    !keyword || Object.values(row).some(v =>
      String(v || "").toLowerCase().includes(keyword.toLowerCase())
    )
  );
  thead.innerHTML = "";
  tbody.innerHTML = "";
  if (keyword && filtered.length === 0) {
    noResults.style.display = "block";
    return;
  } else {
    noResults.style.display = "none";
  }
  if (!filtered.length) return;
  const headers = Object.keys(filtered[0]);
  thead.innerHTML = "<tr>" + headers.map(h => `<th>${h}</th>`).join("") + "</tr>";
  let greenStartIndex = -1;
  let greenEndIndex = -1;
  if (headId === "discountHead") {
    const lowerHeaders = headers.map(h => h.toLowerCase());
    greenStartIndex = lowerHeaders.findIndex(h => h.includes("일반왕복"));
    greenEndIndex = lowerHeaders.findIndex(h => h.includes("크리편도"));
  }
  filtered.forEach(row => {
    const tr = document.createElement("tr");
    headers.forEach((h, i) => {
      const td = document.createElement("td");
      td.innerHTML = highlight(row[h], keyword);
      if (headId === "discountHead" && i >= greenStartIndex && i <= greenEndIndex) {
        td.style.backgroundColor = "#ccffcc";
      }
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
}
function searchGeneral() {
  renderTable(generalData, document.getElementById("generalSearch").value.trim(), "generalHead", "generalBody", "generalTabNoResults");
}
function searchDiscount() {
  renderTable(discountData, document.getElementById("discountSearch").value.trim(), "discountHead", "discountBody", "discountTabNoResults");
}
function searchAgency() {
  renderTable(agencyData, document.getElementById("agencySearch").value.trim(), "agencyHead", "agencyBody", "agencyTabNoResults");
}
function switchTab(tabId, el) {
  document.querySelectorAll(".tab-content").forEach(tab => tab.style.display = "none");
  document.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active"));
  document.getElementById(tabId).style.display = "block";
  el.classList.add("active");
}
window.onload = () => {
  Promise.all([
    fetch("일반검색.json").then(res => res.json()).then(data => generalData = data),
    fetch("할인명검색.json").then(res => res.json()).then(data => discountData = data),
    fetch("여행사검색.json").then(res => res.json()).then(data => agencyData = data)
  ]).then(() => {
    searchGeneral();
    searchDiscount();
    searchAgency();
  });
};
