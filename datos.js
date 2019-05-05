const guardarContacto = contacto => {
    contacto.usuario = obtenerUsuarioActual().usuario

    const lista = JSON.parse(localStorage.getItem(contactos)) || []

    if (lista.find(registro => registro.nombre === contacto.nombre)) {
        // modificar
        lista.map(registro => {
            if (registro.nombre === contacto.nombre) {
                for (campo in contacto) {
                    registro[campo] = contacto[campo]
                }
            }
        })
    } else {
        // agregar    
        lista.push(contacto)
    }

    localStorage.setItem(contactos, JSON.stringify(lista))
    location.href = 'listado.html'
}

const borrarRegistro = (nombre) => {
    const lista = obtenerLista()
    const resultado = lista.filter(item => item.nombre !== nombre)
    localStorage.setItem(contactos, JSON.stringify(resultado))
    location.href = 'listado.html'
}

const editarRegistro = (valorNombre) => {
    const lista = obtenerLista()
    const contacto = lista.find(contacto => contacto.nombre === valorNombre)
    for (campo in contacto) {
        if (document.getElementsByName(campo)[0])
            document.getElementsByName(campo)[0].value = contacto[campo]
    }
    document.getElementsByClassName("tabla")[0].style.display = "none"
    document.getElementById("formulario").style.display = "block"
}

const obtenerLista = () => JSON.parse(localStorage.getItem(contactos)) || []

const guardarUsuario = usuario => {
    const lista = JSON.parse(localStorage.getItem(usuarios)) || []

    // agregar    
    lista.push(usuario)

    localStorage.setItem(usuarios, JSON.stringify(lista))
    location.href = 'login.html'
}

const loguearse = usuario => {
    const lista = JSON.parse(localStorage.getItem(usuarios))
    const user = lista.find(usr => usr.usuario === usuario.usuario && usr.password === usuario.password)
    if (!user) {
        error.innerHTML = 'Usuario o password incorrectas'
        return
    }
    delete user.password
    localStorage.setItem(usuarioActual, JSON.stringify(user))
    location.href = '/'
}

const obtenerUsuarioActual = () => {
    return JSON.parse(localStorage.getItem(usuarioActual))
}
