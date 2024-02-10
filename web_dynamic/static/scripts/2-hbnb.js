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
});