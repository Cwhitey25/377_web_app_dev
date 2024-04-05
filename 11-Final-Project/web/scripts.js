
function playAnimation() {
    $(".chip").addClass("animated"); 
    $(".backcard").addClass("animated"); 
}

function showNotification() {
    $('.notification-content').css("visibility", "visible");
}

function hideNotification() {
    $('.notification-container').css('backdrop-filter', 'none');
    $('.notification-content').css("visibility", "hidden");
}
