/* Vienna Sightseeing Beispiel */

// Stephansdom Objekt
let stephansdom = {
    lat: 48.208493,
    lng: 16.373118,
    title: "Stephansdom"
};

// Karte initialisieren
var map = L.map('map').fitWorld();

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

map.locate({setView: true, maxZoom: 16});

//Geolocation

map.on('locationfound', function (evt) {
    let radius = Math.round(evt.accuracy);

    L.marker(evt.latlng).addTo(map)
        .bindPopup(`You are within ${radius} meters from this point`).openPopup();

    L.circle(evt.latlng, radius).addTo(map);
}
);

map.on('locationerror', function (evt) {
    alert(evt.message);
});

// Hintergrundlayer
let layerControl = L.control.layers({
    "BasemapAT Grau": L.tileLayer.provider("BasemapAT.grau").addTo(map),
    "BasemapAT Standard": L.tileLayer.provider("BasemapAT.basemap"),
    "BasemapAT High-DPI": L.tileLayer.provider("BasemapAT.highdpi"),
    "BasemapAT Gelände": L.tileLayer.provider("BasemapAT.terrain"),
    "BasemapAT Oberfläche": L.tileLayer.provider("BasemapAT.surface"),
    "BasemapAT Orthofoto": L.tileLayer.provider("BasemapAT.orthofoto"),
    "BasemapAT Beschriftung": L.tileLayer.provider("BasemapAT.overlay")
}).addTo(map);

// Marker Stephansdom
L.marker([
    stephansdom.lat, stephansdom.lng
]).addTo(map).bindPopup(stephansdom.title).openPopup();

// Maßstab
L.control.scale({
    imperial: false,
}).addTo(map);