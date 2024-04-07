
function playAnimation() {
    $(".chip").addClass("animated"); 
    $(".backcard").addClass("animated"); 
}

function showNotification() {
    $('.notification-container').css("visibility", "visible");
}

function hideNotification() {
    $('.notification-container').css('backdrop-filter', 'none');
    $('.notification-content').css("visibility", "hidden");

    $.ajax({
        type: 'POST',
        url: 'update-bonus.php', 
        success: function(response) {
            console.log(response);
        },
        error: function(xhr, status, error) {
            console.error(xhr.responseText);
        }
    });

    setTimeout(function() {
        location.reload();
    }, 500);
}