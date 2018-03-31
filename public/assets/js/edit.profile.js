function ajax(options) {
    return new Promise(function(resolve, reject) {
        $.ajax(options).done(resolve).fail(reject);
    });
}

$(function() {
    $(".tabs").tabs();


    $(".edit-profile-form").submit(function(e) {
        e.preventDefault();

        var email = $("#email").val() || "";
        var password = $("#password").val() || "";
        var avatar = $("#avatar").prop("files")[0] || null;


        console.log(email);
        console.log(password);
        console.log(avatar);

        if (!email && !password && !avatar) {
            return;
        }

        var json = {
            email: email,
            password: password,
            avatar: avatar
        };

        ajax({
            url: "/api/users/profile/edit",
            type: "POST",
            data: json
        }).then(function(response) {
            console.log("success");
            console.log(response);
        }).catch(function(err) {
            console.log(err);
        });

    });

});
