function buildMap() {
    var e = $('#map');
    var latLongHrTime = e.attr('name').split(' ');
    var pos = {lat: parseFloat(latLongHrTime[0]), lng: parseFloat(latLongHrTime[1])};
    var hr = latLongHrTime[2];
    var time = new Date(latLongHrTime[3]);

    geocoder = new google.maps.Geocoder;
    infowindow = new google.maps.InfoWindow;
    var map = new google.maps.Map(e[0], {
        zoom: 14,
        center: pos
    });

    var marker = new google.maps.Marker({
        position: pos,
        map: map
    });

    $(window).resize(function() {
        google.maps.event.trigger(map, "resize");
    });

    geocoder.geocode({'location': pos}, function(results, status){
        if (status === 'OK' && results[0]) {
            var $img = $('<div class="valign-wrapper"></div>');
            $img.html('<i class="material-icons center-align">my_location</i><span class="center-align">' +
                results[0].formatted_address + '&nbsp</span>' +
                '<i class="material-icons materialize-red-text center-align">favorite</i>' +
                '<span class="materialize-red-text center-align">' + hr + ' bpm</span>');
            infowindow.setContent($img[0]);
            infowindow.open(map, marker);
            $('#map-address').text(results[0].formatted_address)
        } else {
            $('#map-address').text('an unknown location')
        }
    });
    var $curTime = $("a.brand-logo.center");
    var text = $curTime.html() + " ";
    text += time.toLocaleString();
    console.log(text);
    $curTime.html(text);
}

$($.getScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyAmfNdzvBzM5eUew6Y3C1b5lfyljjSKFuE&callback=buildMap"));