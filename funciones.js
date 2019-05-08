import { obtenerUsuarioActual, obtenerLista } from './datos.js'
import { opcionesMenu, formatearFecha, sexos, estadosCiviles } from './comunes.js'

export const crearMenu = () => {
  const estaLogueado = obtenerUsuarioActual()
  opcionesMenu.forEach(opcion => {
    if ((estaLogueado && opcion.logueado) || (!estaLogueado && !opcion.logueado)) {
      const a = document.createElement('a')
      const linkText = document.createTextNode(opcion.texto)
      a.appendChild(linkText)
      a.title = opcion.texto
      a.href = opcion.pagina
      if (document.location.pathname === opcion.pagina)
        a.className = 'active'
      if (opcion.texto === 'Logout')
        a.className = 'float-right'
      const div = document.getElementById('menu')
      div.appendChild(a)
    }
  })
}

export const cargarSelect = (desplegable, lista) => {
  const sel = document.getElementById(desplegable)
  for (let i = 0; i < lista.length; i++) {
    const opt = document.createElement('option')
    opt.appendChild(document.createTextNode(lista[i]))
    opt.value = i
    sel.appendChild(opt)
  }
}

export const generarTabla = () => {
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
    Object.keys(objeto).forEach(propiedad => {

      let valor = '', centrado = ''

      // obtener el valor de la propiedad
      // de acuerdo al nombre del campo, le asignamos el valor que corresponda
      switch (propiedad) {
        case 'creado':
        case 'modificado':
          centrado = 'centrado'
          valor = objeto[propiedad]
          break
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
    // existen fisicamente en vez de generarse dinamicamente con una funcion
    // data-nombre es un nuevo atributo que dsps se toma en funciones
    html.push(`
    <td class="no-border">
      <i class="fa fa-trash" data-nombre="${objeto.nombre}"></i>
    </td>
    `)
    html.push(`
    <td class="no-border">
      <i class="fa fa-edit" data-nombre="${objeto.nombre}"></i>
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