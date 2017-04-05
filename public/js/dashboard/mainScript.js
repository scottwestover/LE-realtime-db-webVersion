/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function dropdownFunction() {
    document.getElementById("myDropdown").classList.toggle("showM");
}
// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropbtnM')) {
        var dropdowns = document.getElementsByClassName("dropdown-contentM");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('showM')) {
            openDropdown.classList.remove('showM');
            }
        }
    }
}

function showMessagingMenu() {
    $('#chatSideMenu').hide();
    $('#messagingSideMenu').show();
    $('body').css('background-color', '#383c40');
}

function showChatMenu() {
    $('#messagingSideMenu').hide();
    $('#chatSideMenu').show();
    $('body').css('background-color', '#2a3f54');
}