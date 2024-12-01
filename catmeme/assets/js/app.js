
document.addEventListener('DOMContentLoaded', function(){

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    const api_key = "live_RdfidHJEXw5qduZ84iKZdpqUoetgbT5DPw8Urb5O75Q25TvHouHvSlAkyIBWC19D";
    let image = new Image();

    document.getElementById('generar').addEventListener('click', getCatImage)
    document.getElementById('actualizar').addEventListener('click', addText)
    async function getCatImage() {
        try{
            const response = await fetch(`https://api.thecatapi.com/v1/images/search?api_key=${api_key}`)
                .then(response => response.json())
                .then(datos => {
                    image.src = datos[0].url;
                    addImage();
                })

        } catch(error) {
            console.log(error);
        }
    }

    function addImage(){
        image.addEventListener('load', () => {
            const relacion_de_aspecto = image.width / image.height;
            const maxWidth = window.innerWidth * 0.8;
            const maxHeight = window.innerHeight * 0.8;

            let canvasWidth, canvasHeigth;

            if (maxWidth / maxHeight < relacion_de_aspecto) {
                canvasWidth = maxWidth;
                canvasHeigth = maxWidth / relacion_de_aspecto;
            } else {
                canvasWidth = maxHeight * relacion_de_aspecto;
                canvasHeigth = maxHeight;
            }
            canvas.width = canvasWidth;
            canvas.height = canvasHeigth;

            ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
            addText();
        });
    }

    function addText(){
        const text = document.getElementById('texto').value;
        const size = document.getElementById('size').value;
        const color = document.getElementById('color').value;

        ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
        
        ctx.fillStyle = color;
        ctx.font = `${size}px Kanit`;
        ctx.textAlign = 'center';
        ctx.fillText(text, canvas.width /2, canvas.height * 0.75)
    }

})