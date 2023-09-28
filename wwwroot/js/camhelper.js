export async function init(videoElementRef, dotnetObjectRef) {
    //console.log("Init");

    try {

        var stream = await navigator.mediaDevices.getUserMedia(
         {
            audio: false,
            video: { facingMode: 'environment' }
         });
        onSuccess(stream, videoElementRef);
        dotnetObjectRef.invokeMethodAsync("OnSuccess");
    }
    catch (e) {
        onFailure(e, dotnetObjectRef);
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

export function getBase64Img(video, canvas) {

    let context = canvas.getContext('2d');
    canvas.setAttribute('width', video.videoWidth);
    canvas.setAttribute('height', video.videoHeight);
    context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
    let data = canvas.toDataURL('image/png');
    return data;
}

