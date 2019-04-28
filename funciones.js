const opcionesMenu = [
  {
    pagina: '/',
    texto: 'Inicio'
  },
  {
    pagina: '/contactos.html',
    texto: 'Contactos'
  },
  {
    pagina: '/listado.html',
    texto: 'Listado'
  },
  {
    pagina: '/login.html',
    texto: 'Login'
  },
  {
    pagina: '/registro.html',
    texto: 'Registrarme'
  }
]

const crearMenu = () => {
  opcionesMenu.map(opcion => {
    const a = document.createElement('a')
    const linkText = document.createTextNode(opcion.texto)
    a.appendChild(linkText)
    a.title = opcion.texto
    a.href = opcion.pagina
    if (document.location.pathname === opcion.pagina)
      a.className = 'active'
    const div = document.getElementById('menu')
    div.appendChild(a)
  })
}

const cargarSelect = (desplegable, lista) => {
  const sel = document.getElementById(desplegable)
  for (let i = 0; i < lista.length; i++) {
    const opt = document.createElement('option')
    opt.appendChild(document.createTextNode(lista[i]))
    opt.value = i
    sel.appendChild(opt)
  }
}

const xgenerarTabla = () => {
  // Tomar elemento tbody
  const miTabla = document.getElementById('cuerpo')

  // recorrer lista de contactos (contactos.js)
  contactos.map(contacto => {

    // crear un renglón (tr)
    const renglon = document.createElement('tr')

    // por cada campo que existe en un contacto, hacer:
    for (campo in contacto) {

      // crear una celda (td)
      const celda = document.createElement('td')

      // crear un nodo tipo texto con el contenido del campo (Pablo, Hombre, etc.)
      const data = document.createTextNode(contacto[campo])

      // agregar el nodo de texto creado a la celda (td)
      celda.appendChild(data)

      // agregar la celda (td) al renglon (tr)
      renglon.appendChild(celda)
    }
    // agregar el renglon (tr con todas sus celdas creadas) la tabla (tbody) 
    miTabla.appendChild(renglon)
  })
}

const generarOtraTabla = () => {
  // tomar elemanto body de la tabla que tiene id cuerpo
  const miTabla = document.getElementById('cuerpo')

  // tomar la lista de contactos 
  const lista = obtenerLista()

  // crear lista vacía para insertar los tr y los td
  let html = []

  // recorrer la lista de contactos
  lista.map(objeto => {
    // insertar el tr 
    html.push('<tr>')

    // recorrer las propiedades del objeto
    // usamos Object.keys para convertir las propiedades en una lista (array)
    Object.keys(objeto).map(propiedad => {

      let valor = '', centrado = ''

      // obtener el valor de la propiedad
      // de acuerdo al nombre del campo, le asignamos el valor que corresponda
      switch (propiedad) {
        case 'fechaNacimiento':
          valor = formatearFecha(objeto[propiedad])
          centrado = 'centrado'
          break
        case 'estadoCivil':
          // para estado civil sacamos el valor de la matriz estadosCiviles
          valor = estadosCiviles[objeto[propiedad]]
          break
        case 'sexo':
          // para sexo sacamos el valor de la matriz sexos
          valor = sexos[objeto[propiedad]]
          break
        default:
          // para todos los demás asignamos el valor que viene de la base de datos
          valor = objeto[propiedad]
      }

      // insertar el valor de la propiedad dentro de los tags td
      html.push(`<td class="${centrado}">${valor}</td>`)

    })

    html.push(`
    <td class="no-border">
      <i 
        class="fa fa-trash" 
        onClick="borrarRegistro('${objeto.nombre}')"
        >
      </i>
    </td>
    `)
    html.push(`
    <td class="no-border">
      <i 
        class="fa fa-edit" 
        onClick="editarRegistro('${objeto.nombre}')"
        >
      </i>
    </td>
    `)

    // cerramos el rengón con </tr>
    html.push('</tr>')

  })

  // contertir lista en string
  const contenidoHTML = html.join('')

  // insertar el contenido html generado en el tbody de la tabla
  miTabla.innerHTML = contenidoHTML

}

const guardarContacto = contacto => {
  const lista = JSON.parse(localStorage.getItem(db)) || []

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

  localStorage.setItem(db, JSON.stringify(lista))
  location.href = 'listado.html'
}

const borrarRegistro = (nombre) => {
  const lista = obtenerLista()
  const resultado = lista.filter(item => item.nombre !== nombre)
  localStorage.setItem(db, JSON.stringify(resultado))
  location.href = 'listado.html'
}

const editarRegistro = (valorNombre) => {
  const lista = obtenerLista()
  const contacto = lista.find(contacto => contacto.nombre === valorNombre)
  for (campo in contacto) {
    document.getElementsByName(campo)[0].value = contacto[campo]
  }
  document.getElementsByClassName("tabla")[0].style.display = "none"
  document.getElementById("formulario").style.display = "block"
}

const obtenerLista = () => JSON.parse(localStorage.getItem(db)) || []

crearMenu()