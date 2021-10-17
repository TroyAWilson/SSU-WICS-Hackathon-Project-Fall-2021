url = "https://services3.arcgis.com/T4QMspbfLg3qTGWY/arcgis/rest/services/CY_WildlandFire_Perimeters_ToDate/FeatureServer/0/query?where=1%3D1&outFields=irwin_FireDiscoveryDateTime,irwin_FireOutDateTime,irwin_InitialLatitude,irwin_InitialLongitude&outSR=4326&f=json"

shelter_url = "/api/shelters"

var active_fires = [];
var shelter_list = [];
var holdData = [];

function buildShelter(json){
    return {
        coords:{lat:json.lat, lng:json.lon},
        name: json.name,
        address: json.address,
        phone: json.phonenumber,
        capacity: json.capacity
    }
}

function addFire(map,coords){
    const m = new google.maps.Marker({
        position:coords,
        map:map,
        icon: "/static/images/fire2.svg"
    });
}

function addMarker(map,shelter){
    const image = {
        url: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
        // This marker is 20 pixels wide by 32 pixels high.
        size: new google.maps.Size(20, 32),
        // The origin for this image is (0, 0).
        origin: new google.maps.Point(0, 0),
        // The anchor for this image is the base of the flagpole at (0, 32).
        anchor: new google.maps.Point(0, 32),
    };

    const m = new google.maps.Marker({
        position:shelter.coords,
        map:map,
        icon:image
    });

    const infowindow = new google.maps.InfoWindow({
        content: `<h3>${shelter.name}</h3> <p>Address: ${shelter.address}</p> <p>Phone: <a href="tel:${shelter.phone}">${shelter.phone}</a></p> <p>Capacity: ${shelter.capacity}</p>`,
    });
    
    m.addListener("click", function(){
        infowindow.open({
            anchor:m,
            map:map,
            shouldFocus: false
        });
    });
}


function addAllMakers(map,arr){
    i = 0;
    while(i < arr.length){
        addMarker(map,arr[i]);
        i++;
    }
}

function addAllFire(map,arr){
    i = 0;
    while(i < arr.length){
        addFire(map,arr[i]);
        i++;
    }
}

async function initMap() {
    let active_fires = []

    // The map
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 8,
        center: { lat: 38.3409, lng: -122.6731 },
    });

    await $.ajax(shelter_url, {
        success: function (data) {
            data.forEach(function(element){
                holdData.push(element)
            })
        }
    });

    await $.ajax(url,
        {
            success: function (data) {// success callback function
                data.features.forEach((fire)=>{
                    if (!fire.attributes.irwin_FireOutDateTime){
                        if (fire.attributes.irwin_InitialLatitude){
                            if (fire.attributes.irwin_InitialLongitude){
                                active_fires.push({lat: fire.attributes.irwin_InitialLatitude, lng:fire.attributes.irwin_InitialLongitude})
                            }
                        }
                    }
                })
        }
    });

    holdData.forEach( function(shelter){
        shelter_list.push(buildShelter(shelter));
    })

    //adds all shelter markers onto the map
    addAllMakers(map,shelter_list);
    //adds all fire markerse onto the map
    addAllFire(map,active_fires);
}
