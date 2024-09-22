

// self.addEventListener("activate", e=> {
//     console.log("El service worker esta activo");
// });

// self.addEventListener("error", e=> console.log(e));

// self.addEventListener("fetch", e=>{
//     console.log( "sfsddsadas" + e.data)
// });

// const añadirMensajes = msj => {
//     console.log(msj);
// }

self.addEventListener("message", e=>{
    self.clients.matchAll().then(clients => {
            console.log("Client id 0: " + clients[0].id);
            console.log("Client id 1: " + clients[1].id);
            console.log("Source id: " + e.source.id);
            if(clients[1].id !== e.source.id) {
                clients[1].postMessage(e.data[e.data.length - 1]);
            } else {
                clients[0].postMessage(e.data[e.data.length - 1]);
            }
    });
});
