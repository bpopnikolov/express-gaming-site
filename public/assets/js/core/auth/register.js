
$(function() {

    var $registerForm = $("#registerForm");

    $registerForm.validate({
        rules: {
            first_name: {
                required: true
            },
            last_name: {
                required: true
            },
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
            first_name: {
                required: "Enter a firstanme"
            },
            last_name: {
                required: "Enter a lastname"
            },
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
