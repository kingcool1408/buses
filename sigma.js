// Typing animation

const textElement = document.getElementById("typing-text");

if (textElement) {

    const phrases = [
        "Hello.",
        "Welcome.",
        "Greetings."
    ];

    let phraseIndex = 0;
    let characterIndex = 0;
    let deleting = false;

    function playTypingAnimation() {
        const current = phrases[phraseIndex];
        if (deleting) {

            textElement.textContent =
                current.substring(0, characterIndex--);
        } else {

            textElement.textContent =
                current.substring(0, characterIndex++);
        }

        let speed = deleting ? 50 : 100;
        if (!deleting && characterIndex > current.length) {

            deleting = true;
            speed = 1500;
        }

        if (deleting && characterIndex < 0) {
            deleting = false;
            characterIndex = 0;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            speed = 500;

        }

        setTimeout(playTypingAnimation, speed);
    }
    playTypingAnimation();

}

let map;
let marker;

window.initMap = function () {
    const spot = {
        lat: 33.7701,
        lng: -118.1937
    };

    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 14,
        center: spot,
    });

    marker = new google.maps.Marker({
        position: spot,
        map: map
    });
};


function updatePinPosition(lat, lng) {
    const newSpot = {lat, lng };
    console.log(newSpot); 

    marker.setPosition(newSpot);
    map.setCenter(newSpot);
}

// Search

const locations = [

    "Route 1 bus", "Route 2 bus", "Route 4 bus",
     "Route 8 bus", "Route 21 bus", "Route 22 bus",
    "Route 41 bus", "Route 46 bus", "Route 51 bus",
     "Route 61 bus", "Route 71 bus", "Route 91 bus",
    "Route 92 bus", "Route 93 bus", "Route 94 bus",
     "Route 101 bus", "Route 103 bus", "Route 104 bus",
    "Route 111 bus", "Route 112 bus", "Route 121 bus",
     "Route 131 bus", "Route 141 bus", "Route 151 bus",
    "Route 171 bus", "Route 172 bus", "Route 173 bus",
     "Route 174 bus", "Route 175 bus", "Route 181 bus",
    "Route 182 bus", "Route 191 bus", "Route 192 bus",
     "Route 405 bus", "Passport bus", "Passport North bus",
    "LA Metro A Line","Amtrak","Metrolink"

];

const stops = {
    "Route 1 bus": {
        "location": [33.783527, -118.168245]
    },
    "Route 2 bus": {
        "location": [33.770050, -118.193741]
    },
    "Route 4 bus": {
        "location": [33.848179, -118.211014]
    },
    "Route 8 bus": {
        "location": [33.775363, -118.118878]
    },
    "Route 21 bus": {
        "location": [33.8824, 118.1712]
    },
    "Route 22 bus": {
        "location": [33.8312, -118.1679]
    },
}

const input = document.getElementById("search");
const suggestions = document.getElementById("suggestions");

if (input) {
    input.addEventListener("input", () => {
        suggestions.innerHTML = "";
        const value = input.value.toLowerCase();
        if (!value) return;
        locations
            .filter(item =>
                item.toLowerCase().includes(value)
            )
            .forEach(item => {
                const li = document.createElement("li");
                li.textContent = item;
                li.onclick = () => {
                    input.value = item;
                    suggestions.innerHTML = "";
                    find_bus(item);
                };
                suggestions.appendChild(li);
                console.log(li);
            });
    });

}

function find_bus(routeName){
    let lat = 0; 
    let long = 0;
   
    console.log(routeName);
    const data = stops[routeName].location;
    long = data[1]; 
    lat = data[0]; 
    console.log(long, lat);


    updatePinPosition(lat, long);
}

// new google.maps.Marker({
//   position: spot,
//   map: map,
//   label: {
//     text: "B",
//     color: "#ffffff",
//     fontSize: "14px",
//     fontWeight: "bold",
//   },
// });
