export function photoDetailAnimation() {
    const image = document.querySelector('.image');
      
    if(image != null){
    image.addEventListener('mousemove', function (e) {
        let width = image.offsetWidth;
        let height = image.offsetHeight;
        let mouseX = e.offsetX;
        let mouseY = e.offsetY;

        let bgPosX = (mouseX / width * 100);
        let bgPosY = (mouseY / height * 100);
      
        image.style.backgroundPosition = `${bgPosX}% ${bgPosY}%`;
    });

    image.addEventListener('mouseleave', function () {
        image.style.backgroundPosition = "center";
    });
}
}