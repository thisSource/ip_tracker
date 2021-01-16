const yourIp = document.getElementById("yourIp")
const button = document.getElementById("win")
const lookPp = document.getElementById("lookPp")
let ip;
let mymap;
let marker;
button.addEventListener("click", () => {

    fetch("/api")
    .then(response => response.json())
    .then(data => ip = data)
    .then(ip => yourIp.textContent =`your ip addess: ${ip[0].ip.ip}`
    ,console.log(ip[1].lookUp)
    ,lookPp.textContent = `You are in ${ip[1].lookUp.city}`)
    ,console.log(ip[1].lookUp.ll[0])
    ,console.log(ip[1].lookUp.ll[1])
    ,
     mymap = L.map('mapid').setView([ip[1].lookUp.ll[0], ip[1].lookUp.ll[1]], 13);
    marker = L.marker([ip[1].lookUp.ll[0], ip[1].lookUp.ll[1]]).addTo(mymap);
    
    
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoibXV0ZTgiLCJhIjoiY2trMDFmdDVqMGN0ajJvbjJqZWF1a3NtYyJ9.I-mWYJTfQPt5Lbt7TYnzzg'
    }).addTo(mymap);

})

button.click()


  