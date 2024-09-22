const msgValue  = document.querySelector(".msgValue");
const btnSend = document.querySelector(".btnSend");

if (navigator.serviceWorker) {
    navigator.serviceWorker.register("sw.js");
}

const mensajes = [];


function createMsgHTML (msg, clase){
    const msgHTML = `<p class='${clase}''>${msg}</p>`;
    return msgHTML;
}



const messagesStyle = () => {
    document.querySelector(".msgContainer").style.paddingTop = "10px";
    document.querySelector(".msgContainer").style.borderRadius = "border-radius: 15px 15px 0px 0px";
    document.querySelector(".msgContainer").style.border = "2px solid #fff";
    document.querySelector(".msgContainer").style.borderRigth = "none";
    document.querySelector(".msgContainer").scrollTo({
        top: document.querySelector(".msgContainer").scrollHeight,
        behavior: 'instant' // Desplazamiento suave
    });
    const firstMsg = document.querySelector(".mensajes").firstElementChild;

    observer.observe(firstMsg);
}

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            console.log("Estamos viendo el objeto");
        } else {
            const msgContainer = document.querySelector(".msgContainer");
            if(msgContainer.scrollHeight > msgContainer.clientHeight) {
                msgContainer.style.overflowY = "scroll";
            }else {
                msgContainer.style.overflowY = "hidden";
            }
        }
    });
});



function mensaje() {
    const msg = msgValue.value;
    mensajes.push(msg);
    navigator.serviceWorker.ready.then(res => {
        if (msg.length > 0) {
            res.active.postMessage(mensajes);
            document.querySelector(".mensajes").innerHTML += createMsgHTML(msg, "my-msg");
            msgValue.value = "";
            messagesStyle();
        }
    });
}

btnSend.addEventListener('click', mensaje);
msgValue.addEventListener('keydown', e=> {
    if(e.key == 'Enter') {
        mensaje();
    }
})


navigator.serviceWorker.addEventListener("message", e => {
    navigator.serviceWorker.ready.then(res => {
        document.querySelector(".mensajes").innerHTML += createMsgHTML(e.data, "others-msg");
        messagesStyle();
})})

 