$(function() {
    $("#gamesDropdownTrigger").dropdown({
        inDuration: 300,
        outDuration: 225,
        constrainWidth: true, // Does not change width of dropdown to that of the activator
        coverTrigger: false,
        closeOnClick: true,
        hover: false, // Activate on hover
        alignment: "left" // Displays dropdown with edge aligned to the left of button
    });
});
