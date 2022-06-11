function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Закрываем раскрывающийся список, если пользователь щелкает за его пределами
window.onclick = function (event) {
    if (!event.target.matches('.header-contact__btn')) {
        var dropdowns = document.getElementsByClassName("header-contact__item");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}