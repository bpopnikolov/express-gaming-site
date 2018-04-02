/* globals httpClient */
$(function() {
    $(".tabs").tabs();

    var $profileForm = $(".edit-profile-form");

    $.validator.addMethod("fileFormat", function(value, element) {
        var avatar = $(element).prop("files")[0] || null;

        var allowedExtensions = /(jpg|jpeg|png|gif)$/i;
        if (avatar) {
            if (!allowedExtensions.exec(avatar.type)) {
                return false;
            }
        }
        return true;
    }, "Unsupported file format");

    $profileForm.validate({
        rules: {
            email: {
                required: true
            },
            password: {
                required: false,
                minlength: 5
            },
            avatar: {
                fileFormat: true
            }
        },

        //For custom messages
        messages: {
            email: {
                required: "Enter a email"
            },
            password: {
                minlength: $.validator.format("Enter at least {0} characters")
            }
        },
        errorElement: "div",
        errorPlacement: function(error, element) {
            var placement = $(element).data("error");
            if (placement) {
                $(placement).append(error);
            } else {
                if ($(element).attr("type") === "file") {
                    $(error).insertAfter(".file-path.validate");
                } else {
                    error.insertAfter(element);
                }
            }
        },
        submitHandler: function(v) {
            var formData = new FormData(v.currentForm);

            httpClient.ajax({
                url: "/api/users/profile/edit",
                type: "POST",
                data: formData,
                cache: false,
                contentType: false,
                processData: false
            }).then(function(response) {
                console.log(response);
                $("form")[0].reset();
                M.updateTextFields();
                M.toast({
                    html: "Profile was updated"
                });
                $(".avatar img").attr("src", response.avatar);
                $(".profile-image").attr("src", response.avatar);
            }).catch(function(err) {
                console.log(err);
                M.toast({
                    html: "Profile wasn't updated"
                });
            });
        }
    });

    // $profileForm.submit(function(e) {
    //     e.preventDefault();

    //     var avatar = $("#avatar").prop("files")[0] || null;

    //     var allowedExtensions = /(jpg|jpeg|png|gif)$/i;
    //     if (avatar) {
    //         if (!allowedExtensions.exec(avatar.type)) {
    //             alert("FILE TYPE ERROR");
    //             return;
    //         }
    //     }
    //     var formData = new FormData(e.target);

    //     httpClient.ajax({
    //         url: "/api/users/profile/edit",
    //         type: "POST",
    //         data: formData,
    //         cache: false,
    //         contentType: false,
    //         processData: false
    //     }).then(function(response) {
    //         console.log(response);
    //         $("form")[0].reset();
    //         M.updateTextFields();
    //         M.toast({
    //             html: "Profile was updated"
    //         });
    //         $(".avatar img").attr("src", response.avatar);
    //         $(".profile-image").attr("src", response.avatar);
    //     }).catch(function(err) {
    //         console.log(err);
    //     });
    // });

});
