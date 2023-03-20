/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */
var valor = document.getElementById('valor')
var boton = document.getElementById('boton')
var contenedor = document.getElementById('contenedor')

boton.addEventListener('click',function(evento){
    evento.preventDefault();
    contenedor.innerHTML = ""
    fetch('https://openlibrary.org/search/authors.json?q='+valor.value)
    .then((response)=>response.json())
    .then((restJson)=>{
        for(var i = 0; i < restJson.docs.length; i++){
            var registro = restJson.docs[i]           
            var nombres = "";
            for(var a = 1; a < (registro.alternate_names.length - 1); a++){
                var nombre = registro.alternate_names[a]
                nombres += nombre +" | "
            }
            if(nombres.length > 0){
                if(registro.death_date == undefined){
                     registro.death_date = "Sin registro"
                }
            contenedor.innerHTML += 
            "<tr>"+
            "<td>"+ nombres +"</td>"+
            "<td>"+ registro.birth_date + "</td>"+
            "<td>"+ registro.death_date + "</td>"+
            "<td><a href='https://openlibrary.org/authors/"+ registro.key + "'>"+registro.key+"</a></td>"+
            "</tr>"
            }
        }
    });
})