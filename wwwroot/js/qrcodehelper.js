/// <reference path="html5-qrcode.min.js" />

import "./js/html5-qrcode.min.js"

const html5QrCode = new Html5Qrcode("reader");
const qrCodeSuccessCallback = (decodedText, decodedResult) => {
    /* handle success */
};
const config = { fps: 10, qrbox: { width: 250, height: 250 } };


export async function init(videoElement, dotnetObjectRef) {
    try {
        html5QrCode.start({ facingMode: "environment" }, config, qrCodeSuccessCallback);
        //onSuccess(stream, videoElementRef);
        dotnetObjectRef.invokeMethodAsync("OnSuccess");
    }
    catch (e) {
        onFailure(e, dotnetObjectRef)
    }
}
function onSuccess(stream, videoElementRef) {

    //videoElementRef.srcObject = stream;
    //videoElementRef.play();
}

function onFailure(exception, dotnetObjectRef) {
  //  console.log("Exception occurred", exception);
    dotnetObjectRef.invokeMethodAsync("onFailure", "Hata");
}
