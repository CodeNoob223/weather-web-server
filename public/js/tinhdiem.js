console.log("Client side javascript is loaded!");

const formDiem = document.getElementById("tinhdiem-form");
const ketQua = document.getElementById("ketQuaDiem");

formDiem.addEventListener("submit", (e) => {
  e.preventDefault();
  
  const diemCSLTC = parseFloat(document.getElementById("csltc").value) * 3;
  const diemCNDPT = parseFloat(document.getElementById("cndpt").value) * 3;
  const diemDS = parseFloat(document.getElementById("ds").value) * 2;
  const diemKTMT = parseFloat(document.getElementById("ktmt").value) * 2;
  const diemKTCT = parseFloat(document.getElementById("ktct").value) * 2;
  const diemPLDC = parseFloat(document.getElementById("pldc").value) * 2;
  const diemTA2 = parseFloat(document.getElementById("ta2").value) * 3;
  const diemTRR = parseFloat(document.getElementById("trr").value) * 2;

  const tong = (diemCSLTC + diemCNDPT + diemDS + diemKTMT + diemKTCT + diemPLDC + diemTA2 + diemTRR) / 19;
  ketQua.textContent = "Kết quả = " + tong.toString();
});