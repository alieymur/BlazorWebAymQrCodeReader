/// <reference path="html5-qrcode.min.js" />

import "./js/html5-qrcode.min.js"
export async function init(videoElementRef, dotnetObjectRef) {
    try {
        var stream = await navigator.mediaDevices.getUserMedia(
            {
                audio:false,
                //video: true
                facingMode: 'environment'
                }
            });
        onSuccess(stream, videoElementRef);
        dotnetObjectRef.invokeMethodAsync("OnSuccess");
    }
    catch (e) {
        onFailure(e, dotnetObjectRef)
    }
}
function onSuccess(stream, videoElementRef) {

    videoElementRef.srcObject = stream;
    videoElementRef.play();
}

function onFailure(exception, dotnetObjectRef) {
  //  console.log("Exception occurred", exception);
    dotnetObjectRef.invokeMethodAsync("onFailure", exception.message);
}
