$(document).ready(function () {
    const checked_amenities = {};
    $("li input[type=checkbox]").change(function () {
        if (this.checked) {
            checked_amenities[this.dataset.name] = this.dataset.id;
        } else {
            delete checked_amenities[this.dataset.name];
        }
        $(".amenities h4").text(Object.keys(checked_amenities).sort().join(", "));
    });

    // get status of API
    $.getJSON("http://0.0.0.0:5001/api/v1/status/", (response) => {
        if (response.status === "OK") {
            $("div#api_status").addClass("available");
        } else {
            $("div#api_status").removeClass("available");
        }
    });

    // Fetch places

    $.post({
		url: `http://0.0.0.0:5001/api/v1/places_search/`,
		data: JSON.stringify({}),
		headers: {
			"Content-Type": "application/json",
		},
		success: (data) => {
			data.forEach((place) =>
				$("section.places").append(
					`<article>
			<div class="title_box">
			<h2>${place.name}</h2>
			<div class="price_by_night">$${place.price_by_night}</div>
			</div>
			<div class="information">
			<div class="max_guest">${place.max_guest} Guest${
						place.max_guest !== 1 ? "s" : ""
					}</div>
			<div class="number_rooms">${place.number_rooms} Bedroom${
						place.number_rooms !== 1 ? "s" : ""
					}</div>
			<div class="number_bathrooms">${place.number_bathrooms} Bathroom${
						place.number_bathrooms !== 1 ? "s" : ""
					}</div>
			</div> 
			<div class="description">
			${place.description}
			</div>
				</article>`
				)
			);
		},
		dataType: "json",
	});
    

    $("button").click(function () {
        // Gather the list of checked amenities
        const checkedAmenitiesList = Object.values(checked_amenities);

        // Make a POST request to places_search with the list of checked amenities
        $.post({
            url: "http://0.0.0.0:5001/api/v1/places_search/",
            data: JSON.stringify({ amenities: checkedAmenitiesList }),
            headers: {
                "Content-Type": "application/json",
            },
            success: (data) => {
                // Clear existing articles
                $("section.places").empty();
                // Append new articles based on the response data
                data.forEach((place) =>
                    $("section.places").append(
                        `<article>
                            <div class="title_box">
                                <h2>${place.name}</h2>
                                <div class="price_by_night">$${place.price_by_night}</div>
                            </div>
                            <div class="information">
                                <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? "s" : ""}</div>
                                <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? "s" : ""}</div>
                                <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? "s" : ""}</div>
                            </div> 
                            <div class="description">
                                ${place.description}
                            </div>
                        </article>`
                    )
                );
            },
            dataType: "json",
        });
    });
});