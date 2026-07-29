window.updateProgress = function(percentage){

    document.getElementById("progressFill").style.width = percentage + "%";

    document.getElementById("flagReveal").style.width = percentage + "%";

    document.getElementById("progressText").innerHTML = percentage + "%";

}