var geocoder, infowindow;

function toCsv() {
    var csv = "";
    $("tr.history-row").each(function () {
        csv += $(this).children().not(".hr-map").map(function () {
            return $(this).html()
        }).get().join();
        csv += '\n';
    });
    var blob = new Blob([csv]);
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "GuardianAngelHistory.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function buildMap() {
    geocoder = new google.maps.Geocoder;
    infowindow = new google.maps.InfoWindow;
}

function modalListener(event) {
    var latLong = event.target.name.split(' ');
    var pos = {lat: parseFloat(latLong[0]), lng: parseFloat(latLong[1])};
    var $inner = $('<div style="width: 100%; height: 100%"></div>').appendTo('#hmap');
    $inner.addClass('temp-map');

    function geoCallback(results, status) {
        $('#modal').modal('open');
        var map = new google.maps.Map($inner[0], {
            zoom: 10,
            center: pos
        });
        var marker = new google.maps.Marker({
            position: pos,
            map: map
        });

        // add geolocation if found
        if (status === 'OK' && results[0]) {
            marker.setPosition(pos);
            map.setCenter(pos);
            infowindow.setContent(results[0].formatted_address);
            infowindow.open(map, marker);
        }
    }
    geocoder.geocode({'location': pos}, geoCallback);
}

function setup() {
    $("#dl-button").click(toCsv);
    $(".hr-mapclick").click(modalListener);
    $('#modal').modal({
        complete: function() {
            $('.temp-map').remove();
        }
    });
    $.getScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyAmfNdzvBzM5eUew6Y3C1b5lfyljjSKFuE&callback=buildMap");
}

$(setup);
