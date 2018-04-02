console.log("it works");

$(function() {

    var $loginForm = $("#loginForm");

    $loginForm.validate({
        rules: {
            email: {
                required: true
            },
            password: {
                required: true,
                minlength: 5
            }
        },

        //For custom messages
        messages: {
            email: {
                required: "Enter a email"
            },
            password: {
                required: "Enter a password"
            }
        },
        errorElement: "div",
        errorPlacement: function(error, element) {
            var placement = $(element).data("error");
            if (placement) {
                $(placement).append(error);
            } else {
                error.insertAfter(element);
            }
        }
    });
});
