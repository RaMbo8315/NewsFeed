$(document).ready(function () {

    $.getJSON("/newPodcast", function (data) {
        for (var i = 0; i < data.length; i++) {
            $("#podcast").prepend(`<div class='card mb-4' id="pod-card" data-id="${data[i]._id}">`);
            if (data[i].img) {
                $("#pod-card").append(`<img class="card-img-top" src="${data[i].img}">`);
            }
            $("#pod-card").append(`<div class="card-body" id="pod-body">`);
            $("#pod-body").append(`<audio controls><source src="${data[i].listen}"/></audio>`);
            $("#pod-body").append(`<h2 class="card-title">${data[i].title}</h2>`);
            $("#pod-body").append(`<p class="card-text">${data[i].text}</p>`);
            $("#pod-body").append(` <a href="${data[i].readMore}" class="btn btn-primary" target="blank">Read more</a>`);
            $("#pod-body").append(` <button class="btn btn-primary" id="viewComment" data-title="${data[i].title}" data-id="${data[i]._id}">View Comments</button>`);
            $("#pod-body").append(` <button class="btn btn-primary" id="comment" data-title="${data[i].title}" data-id="${data[i]._id}">Leave Comment</button>`);
            $("#pod-body").append(`</div>`);
            $("#pod-card").append(`<div class="card-footer text-muted">Posted on: ${new Date(data[i].createdAt).toLocaleString()}</div>`);
            $("#podcast").append(`</div>`);
        }
    });

    $.ajax({
            method: "GET",
            url: "/notes"
        })
        .then(function (data) {
            for (var i = 0; i < data.length; i++) {
                $("#note-list").prepend(`<div class='card my-4 view-card' id="${data[i]._id}">`);
                $(`#${data[i]._id}`).append(`<div class='card-body' id='view-body'>`);
                $("#view-body").append(`<h5 class='card-title'>Comment by <span style="font-size: 120%">${data[i].title}</span> on:</h5>`);
                $("#view-body").append(`<h6 class="card-title">${data[i].podTitle}</h6>`);
                $("#view-body").append(`<hr>`);
                $("#view-body").append(`<p class='card-text'>${data[i].body}</p>`);
                $("#view-body").append(`<p class='card-text text-secondary'>${new Date(data[i].createdAt).toLocaleString()}</p>`);
                $("#view-body").append(`<button href="#" class="btn btn-danger" data-id="${data[i]._id}" id="delete-note">Delete</button>`);
                $("#view-body").append(`</div>`);
                $(`#${data[i]._id}`).append(`</div>`);
            }
        })

    $(document).on("click", "#comment", function () {
        $("#note-list").empty();
        $("#comment-card").empty()
        $('html, body').animate({
            scrollTop: 0
        }, 800);
        var thisTitle = $(this).attr("data-title");
        var thisId = $(this).attr("data-id")
        console.log($(this).attr("data-title"))
        $("#comment-card").append(`<div class="card my-4" id="form-card">`);
        $("#form-card").append(`<h5 class="card-header">Comment on "${thisTitle}"</h5>`);
        $("#form-card").append(`<div class="card-body" id="form-body">`);
        $("#form-body").append(`<form id="comment-form" data-id="${thisId}" data-title="${thisTitle}">`);
        $("#comment-form").append(`<div class="form-group" id="group1">`);
        $("#group1").append(`<label for="input">Name</label>`);
        $("#group1").append(`<input type="name" class="form-control" id="input">`);
        $("#group1").append(`</div>`);
        $("#comment-form").append(`<div class="form-group" id="group2">`);
        $("#group2").append(`<label for="textarea">What you have to say</label>`);
        $("#group2").append(`<textarea class="form-control" id="textarea" rows="6"></textarea>`);
        $("#group2").append(`</div>`);
        $("#comment-form").append(`<button type="submit" class="btn btn-primary">Leave comment</button>`);
        $("#comment-form").append(`</form>`);
        $("#form-body").append(`</div>`);
        $("#form-card").append(`</div>`);

        $.ajax({
                method: "GET",
                url: "/notes/" + thisId
            })
            .then(function (data) {
                for (var i = 0; i < data.length; i++) {
                    $("#note-list").prepend(`<div class='card my-4' id="${data[i]._id}">`);
                    $(`#${data[i]._id}`).append(`<div class='card-body' id='view-body'>`);
                    $("#view-body").append(`<h5 class='card-title'>Comment by <span style="font-size: 120%">${data[i].title}</span> on:</h5>`);
                    $("#view-body").append(`<h6 class="card-title">${data[i].podTitle}</h6>`);
                    $("#view-body").append(`<hr>`);
                    $("#view-body").append(`<p class='card-text'>${data[i].body}</p>`);
                    $("#view-body").append(`<p class='card-text text-secondary'>${new Date(data[i].createdAt).toLocaleString()}</p>`);
                    $("#view-body").append(`<button href="#" class="btn btn-danger" data-id="${data[i]._id}" id="delete-note">Delete</button>`);
                    $("#view-body").append(`</div>`);
                    $(`#${data[i]._id}`).append(`</div>`);
                }
            })
    })

    $(document).on("click", "#delete-note", function () {
        var thisId = $(this).attr("data-id");
        $(`#${thisId}`).remove();
        console.log(thisId)
        $.ajax({
                method: "DELETE",
                url: "/notes/" + thisId
            })
            .then(function (data) {

            })
    })

    $(document).on("click", "#viewComment", function () {
        $("#comment-card").empty()
        $("#note-list").empty();
        $('html, body').animate({
            scrollTop: 0
        }, 800);
        var thisTitle = $(this).attr("data-title");
        var thisId = $(this).attr("data-id");
        console.log(thisId)
        $.ajax({
                method: "GET",
                url: "/notes/" + thisId
            })
            .then(function (data) {
                for (var i = 0; i < data.length; i++) {
                    $("#note-list").prepend(`<div class='card my-4' id="${data[i]._id}">`);
                    $(`#${data[i]._id}`).append(`<div class='card-body' id='view-body'>`);
                    $("#view-body").append(`<h5 class='card-title'>Comment by <span style="font-size: 120%">${data[i].title}</span> on:</h5>`);
                    $("#view-body").append(`<h6 class="card-title">${data[i].podTitle}</h6>`);
                    $("#view-body").append(`<hr>`);
                    $("#view-body").append(`<p class='card-text'>${data[i].body}</p>`);
                    $("#view-body").append(`<p class='card-text text-secondary'>${new Date(data[i].createdAt).toLocaleString()}</p>`);
                    $("#view-body").append(`<button href="#" class="btn btn-danger" data-id="${data[i]._id}" id="delete-note">Delete</button>`);
                    $("#view-body").append(`</div>`);
                    $(`#${data[i]._id}`).append(`</div>`);
                }
            })
    })

    $(document).on("submit", "#comment-form", function () {
        event.preventDefault();
        console.log($(this).attr("data-id"))
        var thisId = $(this).attr("data-id");
        var thisTitle = $(this).attr("data-title");
        console.log($(this).attr("data-title"))
        $.ajax({
                method: "POST",
                url: "/notes/" + thisId,
                data: {
                    podTitle: thisTitle,
                    title: $("#input").val(),
                    body: $("#textarea").val(),
                    podcast: thisId
                }
            })
            .then(function (data) {
                console.log(data);
            });
        $("#comment-card").empty();
        $("#input").val("");
        $("#textarea").val("");
        $.ajax({
                method: "GET",
                url: "/notes/" + thisId
            })
            .then(function (data) {
                for (var i = 0; i < data.length; i++) {
                    $("#note-list").prepend(`<div class='card my-4' id="${data[i]._id}">`);
                    $(`#${data[i]._id}`).append(`<div class='card-body' id='view-body'>`);
                    $("#view-body").append(`<h5 class='card-title'>Comment by <span style="font-size: 120%">${data[i].title}</span> on:</h5>`);
                    $("#view-body").append(`<h6 class="card-title">${data[i].podTitle}</h6>`);
                    $("#view-body").append(`<hr>`);
                    $("#view-body").append(`<p class='card-text'>${data[i].body}</p>`);
                    $("#view-body").append(`<p class='card-text text-secondary'>${new Date(data[i].createdAt).toLocaleString()}</p>`);
                    $("#view-body").append(`<button href="#" class="btn btn-danger" data-id="${data[i]._id}" id="delete-note">Delete</button>`);
                    $("#view-body").append(`</div>`);
                    $(`#${data[i]._id}`).append(`</div>`);
                }
            })
    });


})