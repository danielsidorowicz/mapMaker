import { currentlySelectedCanvas, clearSelected } from "./data";
import { MapMakerCanvas } from "./interfaces";

export default class Options {
    constructor() {
        const mapOptions = <HTMLElement>document.querySelector("#mapOptions")

        for (let i = 0; i < 32; i++) {
            for (let j = 0; j < 32; j++) {
                const canvas = <HTMLCanvasElement>document.createElement("canvas")
                canvas.width = 16;
                canvas.height = 16;
                this.canvasClick(canvas)

                mapOptions.append(canvas)

                const ctx = canvas.getContext("2d")
                const img = new Image();
                img.src = "./tileset.png";
                img.onload = function () {
                    ctx!.drawImage(img, 16 * j, 16 * i, 16, 16, 0, 0, 16, 16);
                }
            }
        }

    }

    canvasClick(canvasElement: HTMLCanvasElement) {
        canvasElement.addEventListener("click", function (e) {
            for (let i = 0; i < currentlySelectedCanvas.length; i++) {
                let chosenCanvas = e.target as HTMLCanvasElement
                let ctx = currentlySelectedCanvas[i].getContext("2d")
                ctx?.drawImage(chosenCanvas, 0, 0)
            }


            let automat = document.getElementById("automat") as HTMLInputElement



            // DO NAPRAWIENIA
            if (automat.checked) {
                currentlySelectedCanvas.sort((a, b) => +b.getAttribute("position")! - +a.getAttribute("position")!);

                let useInAutomat = currentlySelectedCanvas[0]

                let nextPosition = +useInAutomat.getAttribute("position")! + 1

                let MapMakerCanvases = Array.from(document.querySelectorAll('#canvasID'));
                console.log(MapMakerCanvases);


                let automatCanvas = MapMakerCanvases?.find((canvas) => +canvas.getAttribute("position")! == nextPosition);

                console.log(automatCanvas);


                clearSelected()

                // currentlySelectedCanvas.push(automatCanvas)




            } else {
                clearSelected()
            }
        })
    }
}