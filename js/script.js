const container = document.querySelector(".container");
const qrCodeBtn = document.querySelector("#qr-form button");

const qrCodeInput = document.querySelector("#qr-form input");
const qrCodeImg = document.querySelector("#qr-code img");

const downloadBtn = document.querySelector("#download-button");


//Gerar QR Code
function generateQrCode() {
    const qrCodeInputValue = qrCodeInput.value;

    if (!qrCodeInputValue) return;

    qrCodeBtn.innerText = "Gerando código...";
    
    qrCodeImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${qrCodeInputValue}`;
    
    qrCodeImg.addEventListener("load", ()=> {
        container.classList.add("active");
        qrCodeBtn.innerText = "Código criado!";
    });
}

qrCodeBtn.addEventListener("click", () => {
    generateQrCode();
});

qrCodeInput.addEventListener("keydown", (e) => {
    if(e.code === "Enter") {
        generateQrCode();
    }
});

//Limpar QR Code
qrCodeInput.addEventListener("keyup", () => {
    if(!qrCodeInput.value) {
        container.classList.remove("active");
        qrCodeBtn.innerText = "Gerar QR Code";
    }
});

// Dowload do QR Code
downloadBtn.addEventListener("click", () => {
    if (!qrCodeImg.src) return;

    const xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = function () {
        saveAs(xhr.response, 'qrcode.png');
    };
    xhr.open('GET', qrCodeImg.src);
    xhr.send();
});