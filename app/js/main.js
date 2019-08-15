(function () {
    function nombrar(nombre) {
        return nombre
    }
    function saludar(nombre) {
        console.log(nombre, ', un saludo');
    }
    saludar(nombrar('juan andres'))
})()