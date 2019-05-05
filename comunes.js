export const sexos = ['', 'Hombre', 'Mujer']
export const estadosCiviles = ['', 'Soltero', 'Casado', 'Separado', 'Divorciado', 'Viudo']
export const meses = [
  {
    mes: '01',
    nombre: 'Enero'
  },
  {
    mes: '02',
    nombre: 'Febrero'
  },
  {
    mes: '03',
    nombre: 'Marzo'
  },
  {
    mes: '04',
    nombre: 'Abril'
  },
  {
    mes: '05',
    nombre: 'Mayo'
  },
  {
    mes: '06',
    nombre: 'Junio'
  },
  {
    mes: '07',
    nombre: 'Julio'
  },
  {
    mes: '08',
    nombre: 'Agosto'
  },
  {
    mes: '09',
    nombre: 'Septiembre'
  },
  {
    mes: '10',
    nombre: 'Octubre'
  },
  {
    mes: '11',
    nombre: 'Noviembre'
  },
  {
    mes: '12',
    nombre: 'Diciembre'
  }
]
export const opcionesMenu = [
  {
    pagina: '/',
    texto: 'Inicio',
    logueado: true
  },
  {
    pagina: '/contactos.html',
    texto: 'Contactos',
    logueado: true
  },
  {
    pagina: '/listado.html',
    texto: 'Listado',
    logueado: true
  },
  {
    pagina: '/login.html',
    texto: 'Login',
    logueado: false
  },
  {
    pagina: '/registro.html',
    texto: 'Registrarme',
    logueado: false
  },
  {
    pagina: '/logout.html',
    texto: 'Logout',
    logueado: true
  }
]
export const contactos = 'contactos'
export const usuarios = 'usuarios'
export const usuarioActual = 'usuarioActual'

export const formatearFecha = (fecha) => { // 2019-01-23
  const lista = fecha.split('-')
           //   23                                         01 = Enero       Ene               2019 
  return `${lista[2]}-${meses.find(item => item.mes === lista[1]).nombre.substring(0, 3)}-${lista[0]}`
}