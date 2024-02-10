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
});