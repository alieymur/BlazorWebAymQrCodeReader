export async function init(videoElementRef, dotnetObjectRef) {
    //console.log("Init");
    //var getMedia = navigator.mediaDevices.getUserMedia
    //    || navigator.getUserMedia
    //    || navigator.webkitGetUserMedia
    //    || navigator.mozGetUserMedia
    //    || navigator.msGetUserMedia;
    //if (!getMedia) {
    //    console.log("Exception occurred", getMedia);
    //    onFailure("Bu cihaz kamera erişimin desteklemiyor", dotnetObjectRef);
    //    return;
    //}

    try {
        var stream = await navigator.mediaDevices.getUserMedia(
            {
                audio:false,
                //video: true
                video: {

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

export function getBase64Img(video) {

    //let canvas = document.createElement("canvas");
    let canvas = document.getElementById("currentFrame");
    let context = canvas.getContext('2d');
    canvas.setAttribute('width', video.videoWidth);
    canvas.setAttribute('height', video.videoHeight);
    context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
    let data = canvas.toDataURL('image/png');

    //canvas.removeAttribute('width');
    //canvas.removeAttribute('height');
    //canvas.remove();
    return data;
}

