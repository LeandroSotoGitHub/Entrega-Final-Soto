function finder(nombre){
  let index = carrito.findIndex(object => {
    return object.nombre === nombre;
  });
  return index
}

function displayNone() {
  // document.getElementById("alertAgregado").style.class = "animate__fadeOutDown"
  document.getElementById("alertAgregado").style.display = "none"
}

function funcCalcularTotalScript(){
  const totalCarrito = document.createElement("div")
  containerCarrito.appendChild(totalCarrito)
  let t = 0
  carrito.forEach(element => {
    t+=element.precioUn*element.cant
  });
  
  totalCarrito.innerHTML = "Total: $"+t
  return totalCarrito
}

function funcVaciarCarrito(){
  carrito = []
  localStorage.clear()
}

class Beer{
  constructor(nombre, precio, alcohol, ibu, descripcion){
      this.nombre = nombre
      this.precio = Number(precio)            // valor del porron
      this.alcohol = Number(alcohol)
      this.ibu = Number(ibu)
      this.descripcion = descripcion
      this.cantidad = 0                       //cantidad que va a ser usado para armar el carrito de compras
  }
  agregar(cant){
      this.cantidad += cant
  }
  dtoMayor(){
      this.precio *= 4       // cada botellon viene por 2 litros, el porron es medio litro, asi que lo multiplico por el equivalente
      this.precio *= 0.85      // 15% de descuento por comprar por botellon
  }
}

const beer0 = new Beer("English Brown",1330,5.5,22,"Elaborada con maltas caramelo, un toque de maltas oscuras y lúpulos ingleses, agradable aroma acaramelado y ligeramente balanceada hacia las maltas, con cuerpo medio y de color rojizo. Puede servirse con carnes rojas, hamburguesa y cerdo.")
const beer1 = new Beer("Blonde Ale",1350,5.5,18,"Es una cerveza de cuerpo ligero, con amargor medio, aroma cítrico, con buena carbonatación pero con espuma poco persistente, fácil de beber y refrescante. Ideal para acompañar picadas, pizzas y frutos de mar.")
const beer2 = new Beer("Irish Stout",1450,4.7,30,"Es una cerveza de color negro intenso, con aromas a maltas tostadas, café. En boca es una cerveza que se caracteriza por su cuerpo medio ligero, agradable al paladar. Ideal para acompañar quesos fuertes o postre.")
const beer3 = new Beer("Märzen",2410,8.1,30,"Cerveza de color cobrizo. Ofrece aromas y sabores complejos dulces y tostados por las maltas especiales utilizadas, y frutales debido a los ésteres generados en la fermentación.")
const beer4 = new Beer("Barley Wine",1400,10.5,50,"Cerveza color ámbar, de aroma maltoso y con toques a fruta madura y frutos secos. Sabor acaramelado equilibrado entre la malta y el lúpulo. Posee un acabado largo, licoroso y con gran personalidad.")
const beer5 = new Beer("IPA",1830,5.9,50,"Es una cerveza elaborada a base de maltas pálidas y un toque de maltas caramelo, con fuerte sabor y aroma a lúpulos americanos, espuma blanca persistente, de cuerpo medio y con gran carácter. Ideal para maridar con quesos fuertes y picante.")
const beer6 = new Beer("Dubbel",1560,7.1,22,"Cerveza de color cobrizo. Ofrece aromas y sabores complejos dulces y tostados por las maltas especiales utilizadas, y frutales debido a los ésteres generados en la fermentación.")
const beer7 = new Beer("Schwarzbier",1480,6.2,23,"La Cerveza más oscura de Alemania, originaria de las regiones de Thuringia, Saxony y Franconia. Los sabores se inclinan más hacia el café y chocolate y menos al caramelo. Sin embargo, no es tostada como una Stout. Aroma a malta bajo a moderado, con un dulzor aromático leve y/o notas de malta torrada. De cuerpo medio-liviano a medio.")
const beer8 = new Beer("Honey",1990,6.5,18,"De color dorado, cuerpo medio, con un intenso aroma y sabor a miel. Se caracteriza por ser muy fresca, agradable, de gusto dulce. Ideal para calmar la sed o acompañar ensaladas, platos de sabores neutros o afrutados.")


let cervezas = [beer0,beer1,beer2,beer3,beer4,beer5,beer6,beer7,beer8]

const ul = document.getElementById("lista")

cervezas.forEach((element,i) => {
    const li = document.createElement("li")
    li.innerHTML = `
      
        <ul class="col">
          <div class="card shadow-sm">
            <img src="./img/cerveza${i}.jpg" alt="" class="bd-placeholder-img card-img-top imgCover" width="100%" height="225">
            <div class="card-body">
              <h3>${element.nombre}</h3>
              <p class="card-text cardD ofHidden">${element.descripcion}</p>
              <div class="d-flex justify-content-between align-items-center">
                <small class="text-muted">Alc.: ${element.alcohol}</small>
                <small class="text-muted">IBU: ${element.ibu}</small>
                <span>$${element.precio}</span>
                <div class="btn-group">
                  <input type="text" class="form-control" placeholder="Cant." size="1px" id="inputCant${i}">
                  <button type="button" class="btn btn-sm btn-outline-secondary" id="btnAgregar${i}">Agregar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
    `
    ul.appendChild(li)
});


let carrito = []
const carritoLS = JSON.parse(localStorage.getItem("carrito"))

if(carritoLS){
    carrito = carritoLS
}
let finded

cervezas.forEach((element,i) => {
    const inputCant = document.getElementById(`inputCant${i}`)
    const btnAgregar = document.getElementById(`btnAgregar${i}`)
    
    btnAgregar.addEventListener("click", () => {
    
      const cantidad = inputCant.value
      
      if(cantidad==="") return

      finded = finder(element.nombre)

      if(finded==-1){
          carrito.push({nombre:element.nombre, cant: cantidad, precioUn:element.precio})        
      }else{
        for (let index = 0; index < cantidad; index++) {
          carrito[finded].cant++}
      }


      const carritoJSON = JSON.stringify(carrito)
      localStorage.setItem("carrito", carritoJSON)


      
      const alertText = document.getElementById("alertAgregado")
      alertText.innerHTML = `Agregaste ${cantidad} ${element.nombre} al carrito.`
      // document.getElementById("alertAgregado").style.class = "animate__fadeInRightBig"
      document.getElementById("alertAgregado").style.display = "block"
      
      setTimeout(displayNone, 4000)
      inputCant.value = ""
      // console.log(carrito)
    })
});


const containerCarrito = document.getElementById("containerCarrito")

const mostrarCarrito = document.getElementById("mostrarCarrito")

mostrarCarrito.addEventListener("click",() =>{

  document.getElementById("panelCarrito").className = "animate__fadeInRightBig"
  document.getElementById("panelCarrito").style.left = "34%"

  const listaCarrito = document.createElement("ul")
  containerCarrito.appendChild(listaCarrito)
  
  carrito.forEach(element => {
    const li = document.createElement("li")
    let subtotal = 0
    subtotal = element.precioUn*element.cant
    li.innerHTML = `${element.cant} x ${element.nombre} $${subtotal}`
    listaCarrito.appendChild(li)
  });


  totalCarrito = funcCalcularTotalScript()
  


  const cerrarCarrito = document.getElementById("close")
  cerrarCarrito.addEventListener("click",() =>{
    document.getElementById("panelCarrito").style.left = "100%"
    // document.getElementById("panelCarrito").className = ""
    listaCarrito.remove()
    totalCarrito.remove()
  })
  const vaciarCarrito = document.getElementById("vaciarCarrito")  

  vaciarCarrito.addEventListener("click",() =>{
  listaCarrito.remove()
  totalCarrito.remove()
  totalCarrito = funcCalcularTotalScript()
  funcVaciarCarrito()
})
})