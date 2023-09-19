export async function init(videoElementRef, dotnetObjectRef) {
    //console.log("Init");
    var getMedia = navigator.mediaDevices.getUserMedia
        || navigator.getUserMedia
        || navigator.webkitGetUserMedia
        || navigator.mozGetUserMedia
        || navigator.msGetUserMedia;
    console.log("Exception occurred", getMedia);
    if (!getMedia) {
        onFailure(getMedia, dotnetObjectRef)
    }

    try {
        var stream = await navigator.mediaDevices.getUserMedia(
            {
                audio:false,
                //video: true
                video: {
                    width: {
                        min: 1280,
                        ideal: 1920,
                        max: 2560,
                    },
                    height: {
                        min: 720,
                        ideal: 1080,
                        max: 1440
                    },
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
