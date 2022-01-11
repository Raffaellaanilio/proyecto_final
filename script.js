const mostrarProductos = document.querySelector("#catalogo");
const llenarCarrito = document.querySelector(".moduloCarrito")
const mostrarFormulario = document.querySelector(".modal-content")
const total = document.querySelector("#SumarProductosCarrito")
let i;

// Creación de clase y constructor 
class Producto {
  constructor(id, nombre, categoria, precio, unidad, imagen, info){
    this.id = Number(id);
    this.nombre = nombre;
    this.categoria = categoria;
    this.precio = Number(precio);
    this.unidad = unidad;
    this.imagen = imagen;
    this.info = info;
  }
}

//Creación de array vacío, al cual se le irán añadiendo los elementos nuevos con new Producto

let productos = [];

// Se envian al array productos una serie de elementos nuevos de la clase Producto
productos.push(new Producto (1,'Hallulla', 'Pan', 1000, 'kg', '<img src="./images/hallulla.jpg" alt="Hallulla">', '<img src="./images/info_nutricional_hallulla.png">'));
productos.push(new Producto (2,'Batido', 'Pan', 900, 'kg', '<img src="./images/batido.jpg" alt="Hallulla">', '<img src="./images/info_nutricional_batido.png">'));
productos.push(new Producto (3,'Amasado', 'Pan', 800, 'kg', '<img src="./images/amasado.jpg" alt="Hallulla">', '<img src="./images/info_nutricional_amasado.png">'));
productos.push(new Producto (4,'Empolvado', 'Pastelería', 500, 'unidad', '<img src="./images/empolvado.jpg" alt="Empolvado">', '<img src="./images/info_nutricional_empolvado.png">'));
productos.push(new Producto (5,'Mantecado', 'Pastelería', 300, 'unidad', '<img src="./images/mantecado.jpg" alt="Mantecado">', '<img src="./images/info_nutricional_mantecado.png">'));
productos.push(new Producto (6,'Berlín', 'Pastelería', 700, 'unidad','<img src="./images/berlin.jpg" alt="Berlín">', '<img src="./images/info_nutricional_berlin.png">'));
productos.push(new Producto (7,'Raviol', 'Pastas', 5000, 'bandeja', '<img src="./images/raviol.jpg" alt="Raviol">', '<img src="./images/info_nutricional_raviol.png">'));
productos.push(new Producto (8,'Fetuchini', 'Pastas', 3000, 'bandeja', '<img src="./images/fetuchini.jpg" alt="Fetuchini">', '<img src="./images/info_nutricional_fetuchini.png">'));

//Creación de variable para crear producto, seleccionando un elemento HTML
for (i = 0 ; i < productos.length ; i++){

  mostrarProductos.innerHTML += `
  <div class="col card productos">
    <p>${productos[i].imagen}</p>
    <h3>${productos[i].nombre}</h3>
    <p>$${productos[i].precio}(${productos[i].unidad})</p>
    <div class="justify-content-center">
    <button id="${i}" class="col agregarProducto opcionProducto" name="add" onclick="addCart(${i})"><i class="fas fa-cart-plus fa-1x"></i></button>
    <button id="${i}" class="col pedirInfo opcionProducto"><i class="fas fa-info-circle fa-1x"></i></button>
  </div>
    <div id="${i}" class="info">${productos[i].info}</div>
  </div>
 `
}

//Mostrar información nutricional
$(".pedirInfo").click(function() { 
  $(".info").slideToggle()
});

//Agrandar imagen
$(".info").click(function() { 
  $(".info").animate({
    left:'250px',
    height: '+=50px',
    width: '+=50px'
  })
});

//Agregar productos seleccionados al storage
function guardarProductosSeleccionados(){
  localStorage.setItem('id', JSON.stringify(carrito))
}

//Carrito
let carrito = []; 
function addCart(i){
  
    carrito.push(productos[i])
    console.log(carrito);
    
    llenarCarrito.innerHTML += `
    <div id="${i}" class="card agregado row">
      <div class="col" id="${carrito[carrito.length-1].id}">
      <div style="width:50%" class="col-6">${carrito[carrito.length-1].imagen}</div>
      <div>Producto: ${carrito[carrito.length-1].nombre}</div>
      <div>Precio: ${carrito[carrito.length-1].precio} CLP (${carrito[carrito.length-1].unidad})</div>
      <button id="${i}" class="agregarProducto" name="add" onclick="addCart(${i})"><i class="fas fa-plus"></i></i></button>
      </div>
    </div>
    `    ;
    
    guardarProductosSeleccionados();
}

 //Eliminar producto carrito , al tercer click funciona 

 function eliminarProducto(i){
   // $(`#${i}`).remove();  // Se me eliminan otros botones, por eso lo comenté. 
    carrito.pop(i)
    localStorage.clear(i)
    console.log(carrito)
}

// Ventana de que producto se agregó satisfactoriamente

  $(".agregarProducto").click(function(){
    guardarProductosSeleccionados();
    $("#alertaCarrito").slideToggle();
    $(".contador").show();
    $("#alertaCarrito").html(`El producto
    <strong>${carrito[carrito.length-1].nombre}</strong> ha sido agregado al carrito.
   `)
 $("#alertaCarrito").delay(2500).fadeOut(400); 
    }) ;

  // Mostrar productos del contador del carrito
$("body").click(function () { 
  $(".contador").html(
    `(${carrito.length})`)
});


//Vaciar todo el carrito

function vaciarCarrito(){
  localStorage.clear()
  carrito = []
  $(".agregado").remove();
}


function finalizarCompra(){
  mostrarFormulario.innerHTML += `
  <div class="modal-header">
    <h4 class="modal-title">Información de la compra</h4>
    <button type="button" class="close" data-dismiss="modal">&times;</button>
  </div>
  
  <div class="modal-body">
    Productos comprados: ${carrito.length}<br>
  </div>

  <div class="modal-header">
  <h4 class="modal-title">Información de envío</h4>
  <button type="button" class="close" data-dismiss="modal">&times;</button>
</div>

<div class="modal-body">

      <div class="card">Region:
      <select id="desplegarRegiones">
      </select>
      </div>
      <br>

      <div class="card">Comuna:
      <select id="desplegarComunas">
      </select>
      </div>
      <br>

        <div class="form-group">
        <label for="usr">Dirección: </label>
        <input type="text" class="form-control" id="direccion">
        </div>

       <div class="form-group">
        <label for="usr">Teléfono: </label>
        <input type="text" class="form-control" id="telefono">
        </div>

       <div class="form-group">
        <label for="usr">Correo electrónico: </label>
        <input type="text" class="form-control" id="correo">
        </div>
  </div>
  
  <div class="modal-footer">
    <button type="button" onclick="vaciarCarrito()" class="btn btn-info aceptarCompra" data-dismiss="modal">Aceptar</button>
  </div>
 `
}

//AJAX GET API
     let url="https://apis.digital.gob.cl/dpa/regiones"
     let url2="https://apis.digital.gob.cl/dpa/comunas"

    $.get(url, (response, status) => {
      let contadorAPI = 0;
        if(status === "success"){
          $("#finalizarCompra").ready(function(event) { 
            finalizarCompra()
            for (let index = 0; index < 16; index++) {
            
              $("#desplegarRegiones").append(
              `
              <option>
              ${contadorAPI+1}
              ${response[contadorAPI].nombre}
              </option>
              `);
              contadorAPI++
            }
          });
        }
      }
    );


    $.get(url2, (response, status) => {
      let contadorAPI = 0;
        if(status === "success"){
          $("#finalizarCompra").append(function(event) { 
            finalizarCompra()
            for (let index = 0; index < 346; index++) {
              $("#desplegarComunas").append(
                `
                <option>
                ${contadorAPI+1}
                ${response[contadorAPI].nombre}
                </option>
                `);
                contadorAPI++
            }
          });
        }
      }
    );


     
  //Función sumar productos del carrito // REVISAR ******
    function sumarProductosCarrito(){
      //recorremos el array del carrito
        return carrito.reduce((total,precio) =>{
      //de cada elemento obtenemos su precio
        const miPrecio = productos.filter((precioProductos)=>{
          return precioProductos.id === parseInt(precio);
        });
        // Los sumamos al total
        return total + miPrecio[0].precio;
        }, 0).toFixed(2);
    } 

      
/*  //setear en local storage

const removeLocalStorage = (element) =>{

  //Eliminar producto carrito
  let item = element;
 
  carrito = JSON.parse(localStorage.getItem('id'));
 
  carrito = carrito.filter((e) => {
      if('id' in e && e.id != element.parentElement.id){
          return true;
      }else{
          console.log("Se ha quitado con exito el producto");
          return false;
      }

  });
  
  localStorage.setItem('id', JSON.stringify(carrito))
 }  */


  // API SHORTCUT
  /*     const URLApi =  'https://';
      const infoAenviar = {mail: 'juan@gmail.com', contrasena : '1234'};
      $("body").prepend("<button id='btn'>Enviar info a la API</button>");

      //Crear el evento y luego el asincronismo

      $("#btn").click(function () { 
        $.post(URLApi, infoAenviar,
          function (infoAenviar, status) {
            if(status === "success"){
              $("body").prepend("<button id='btn'>Enviar info a la API shortcut</button>");
            }else{
              console.log("error")
            }
          },
        );
      }); */


// AJAX POST
  /*   $(document).ready(function () {
      //Aqui se pega la URL del JSON que se quiere consumir; 
      const URLApi =  'https://';
      const infoAenviar = {mail: 'juan@gmail.com', contrasena : '1234'};
      $("body").prepend("<button id='btn'>Enviar info a la API</button>");

      //creamos el asincronismo para consurmir o enviar info a la API

      $("#btn").click(function () { 
      $.ajax({
        method: "POST",
        url: URLApi,
        data: infoAenviar,
        //dataType: "dataType",
        success: function (response) {
    
        }
      });
        
      });
    });  */


//Crear lista con todos los productos ((no recomendado para grandes cantidades de datos REFLOW)
    /* productos.forEach(item =>{
      console.log(item)
      const li = document.createElement('li')
      li.textContent = JSON.stringify(item.nombre)
      listaCarrito.appendChild(li)
    }) */

//Crear lista dinamica (no recomendado para grandes cantidades de datos REFLOW)
  /*   productos.forEach(item =>{
      listaCarrito.innerHTML += `<li>${JSON.stringify(item.nombre)}</li>`
    })
 */

/* const fragment1 = document.createDocumentFragment() //manera 1 de crear un fragmento, guarda estructura

  const fragment2 = new DocumentFragment() //manera 2 de crear un fragmento, guarda estructura

  productos.forEach(item => {
    const li = document.createElement('li')
    li.textContent = JSON.stringify(item.nombre)
    fragment1.appendChild(li)
  })

  listaCarrito.appendChild(fragment1) // se pushea la información al fragmento */


// crear elementos dom dinamicamente dentro de un fragment

      /* const fragment = document.createDocumentFragment()
      productos.forEach (item => {
        const li = document.createElement('li')
        li.classList.add('list')
        const b = document.createElement('b')
        b.textContent = 'Nombre: '
        const span = document.createElement('span')
        span.classList.add('text-danger')
        span.textContent = JSON.stringify(item.nombre)
        li.appendChild(b)
        li.appendChild(span)
        fragment.appendChild(li)
      })

        listaCarrito.appendChild(fragment) */




//btn.addEventListener("click", funcionBTN());

//function functionBTN(){
//  alert(`hola soy un botón`)
//}

//segunda opcion
  //btn.onclick = () => {alert("Soy un evento en funcion flecha")} // aqui hay que decirle al html onclick="funcionclic()" para que funcione


/* input.addEventListener(click, mandarAlCarrito);




function mandarAlCarrito(){
  let contador = 0;
  const agregarCarrito = document.querySelector(".carrito");
  
} */

/* //Creación de función flecha para que el usuario pueda ver la lista de productos disponibles
const verProductos = (productos) => {
  let listaproductos = '';
  for (const producto of productos) {
    listaproductos += `Id=${producto.id}\nProducto = ${producto.nombre}\nCategoría: ${producto.categoria}\nPrecio: $${producto.precio}\n\n`
  }
  return listaproductos;
}
 */


//Creación de función flecha para que el usuario comprar los productos
    /* const comprar = () => {
      const seleccionUsuario = prompt(`Digite el Id del producto que desea comprar:\n\n ${verProductos(productos)}`);
      const productoSeleccionado = productos.find(producto => producto.id == seleccionUsuario);
      if (productoSeleccionado) {
        carrito.push(productoSeleccionado);
        alert(`Agregaste ${productoSeleccionado.nombre} al carrito, por un total de $${productoSeleccionado.precio}`)
      } else {
        alert('Producto no encontrado');
      }
      return resultadoComprar = productoSeleccionado;
      }; */

//Creación de función flecha para que el usuario pueda ver su carrito2
    /* const mostrarCarrito = () => {
      const productosCarrito = verProductos(carrito);
      if (productosCarrito){
          alert(productosCarrito);
      }else {
        alert("No hay productos para mostrar")
      }
      
      }; */


//Ordenar aparición de objetos por precio de menor a mayor
      /* productos.sort((a, b) => {
        return a.precio + b.precio
      }); */
 

//Creación de un ciclo do while para que el usuario pueda ver el menú de opciones y hacer acciones hasta que ingrese la opción para salir del ciclo
      /* let opcion;
      do {
        opcion = Number(prompt(`Bienvenid@, ingrese una opción para continuar:
        1- Ver productos
        2-Agregar productos al carrito
        3-Ver carrito
        4-Salir
        `));

        switch(opcion){
          case 1:
            const listaRecibida = verProductos(productos);
            alert(listaRecibida);
            break;

          case 2:
            comprar();
            break;

          case 3:
            mostrarCarrito()
            break; 
          
          case 4:
            alert("Gracias por su visita");
            break;

          default:
            alert("Ingrese alguna opción del 1 al 4")
            break;
        }
      } while ( opcion !== 4); */


