let dataLine = document.getElementById("dataLine");

getData();
async function getData() {
  const response = await fetch("database");
  const data = await response.text();
  console.log(data);

  dataLine.textContent = data
}
