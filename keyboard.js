let typecontent = "";
function changeColor(element, delay) {
    element.style.backgroundColor = 'cyan';
    setTimeout(function() {
        element.style.backgroundColor = 'red';
    }, delay);
}
document.addEventListener('keydown', function(event) {
    if (event.key == " ") {
        changeColor(document.getElementById('Space'), 300);
    } else {
        changeColor(document.getElementById(event.key), 300);
    }
});
document.addEventListener('mousemove', function(event) {
    var x = event.clientX;
    var y = event.clientY;
    let pos = document.getElementById('pos');
    pos.textContent = "x:" + x + " y:" + y;
});
document.addEventListener('mousedown', function(event){
    if(event.which === 1){
        changeColor(document.getElementById('ml'), 300);
    }
    else if (event.which === 2){
        changeColor(document.getElementById('ms'), 200);
    }
    else if (event.which === 3){
        changeColor(document.getElementById('mr'), 200);
    }
});