$(function() {
    $("#gamesDropdownTrigger").dropdown({
        inDuration: 300,
        outDuration: 225,
        constrainWidth: false, // Does not change width of dropdown to that of the activator
        hover: true, // Activate on hover
        gutter: 20, // Spacing from edge
        belowOrigin: true, // Displays dropdown below the button
        alignment: "left", // Displays dropdown with edge aligned to the left of button
        stopPropagation: false // Stops event propagation
    });
    $("#genresDropdownTrigger").dropdown({
        inDuration: 300,
        outDuration: 225,
        constrainWidth: true, // Does not change width of dropdown to that of the activator
        hover: true, // Activate on hover
        gutter: 0, // Spacing from edge
        belowOrigin: false, // Displays dropdown below the button
        alignment: "left", // Displays dropdown with edge aligned to the left of button
        stopPropagation: false // Stops event propagation
    });
    $("#platformsDropdownTrigger").dropdown({
        inDuration: 300,
        isScrollable: true,
        outDuration: 225,
        constrainWidth: false, // Does not change width of dropdown to that of the activator
        hover: true, // Activate on hover
        gutter: 0, // Spacing from edge
        belowOrigin: false, // Displays dropdown below the button
        alignment: "left", // Displays dropdown with edge aligned to the left of button
        stopPropagation: false // Stops event propagation
    });
});
