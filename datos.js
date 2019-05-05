import { usuarioActual, contactos, usuarios, fechaActual } from './comunes.js'

export const guardarContacto = contacto => {
    contacto.usuario = obtenerUsuarioActual().usuario
    const lista = JSON.parse(localStorage.getItem(contactos)) || []
    if (lista.find(registro => registro.nombre === contacto.nombre)) {
        // modificar
        contacto.modificado = fechaActual()
        lista.map(registro => {
            if (registro.nombre === contacto.nombre) {
                for (const campo in contacto) {
                    registro[campo] = contacto[campo]
                }
            }
        })
    } else {
        // agregar    
        contacto.creado = fechaActual()
        contacto.modificado = fechaActual()
        lista.push(contacto)
    }

    localStorage.setItem(contactos, JSON.stringify(lista))
    location.href = 'listado.html'
}

export const borrarRegistro = (valor) => {
    const nombre = valor.target.dataset.nombre
    const lista = obtenerLista()
    const resultado = lista.filter(item => item.nombre !== nombre)
    localStorage.setItem(contactos, JSON.stringify(resultado))
    location.href = 'listado.html'
}

export const editarRegistro = (valor) => {
    const nombre = valor.target.dataset.nombre
    const lista = obtenerLista()
    const contacto = lista.find(contacto => contacto.nombre === nombre)
    for (const campo in contacto) {
        if (document.getElementsByName(campo)[0])
            document.getElementsByName(campo)[0].value = contacto[campo]
    }
    document.getElementsByClassName("tabla")[0].style.display = "none"
    document.getElementById("formulario").style.display = "block"
}

export const obtenerLista = () => JSON.parse(localStorage.getItem(contactos)) || []

export const guardarUsuario = usuario => {
    const lista = JSON.parse(localStorage.getItem(usuarios)) || []

    // agregar    
    lista.push(usuario)

    localStorage.setItem(usuarios, JSON.stringify(lista))
    location.href = 'login.html'
}

export const loguearse = usuario => {
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

export const obtenerUsuarioActual = () => {
    return JSON.parse(localStorage.getItem(usuarioActual))
}

export const logout = () => {
    localStorage.removeItem(usuarioActual)
    location.href = '/'
}
