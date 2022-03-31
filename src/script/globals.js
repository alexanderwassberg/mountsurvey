function menuToggle() {
    const menu = document.getElementById('menu')
    const menuClose = document.getElementById('close')
    const menuItems = document.querySelectorAll('li')
    menu.classList.add('active')

    menuItems.forEach((item) => {
        item.addEventListener('click', function(){
            menu.classList.remove('active')
            document.getElementById('result').classList.add('hide')
        })
    })

    menuClose.addEventListener('click', function(){
        menu.classList.remove('active')
    })
}