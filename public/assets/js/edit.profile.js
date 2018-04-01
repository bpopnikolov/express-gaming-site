function ajax(options) {
    return new Promise(function(resolve, reject) {
        $.ajax(options).done(resolve).fail(reject);
    });
}

$(function() {
    $(".tabs").tabs();


    $(".edit-profile-form").submit(function(e) {
        e.preventDefault();

        var avatar = $("#avatar").prop("files")[0] || null;

        var allowedExtensions = /(jpg|jpeg|png|gif)$/i;

        if (!allowedExtensions.exec(avatar.type)) {
            alert("FILE TYPE ERROR");
            return;
        }

        var formData = new FormData(e.target);

        ajax({
            url: "/api/users/profile/edit",
            type: "POST",
            data: formData,
            cache: false,
            contentType: false,
            processData: false
        }).then(function(response) {
            console.log(response);
            $(".avatar img").attr("src", response.avatar);
            $(".profile-image").attr("src", response.avatar);
        }).catch(function(err) {
            console.log(err);
        });

    });

});
