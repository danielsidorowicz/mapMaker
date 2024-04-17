import { currentlySelectedCanvas, clearSelected } from "./data";
import { MapMakerCanvas } from "./interfaces";

export default class Map {
    constructor() {
        const mapMaker = <HTMLElement>document.querySelector("#mapMaker")
        let m = 0
        for (let i = 0; i < 48; i++) {
            for (let j = 0; j < 48; j++) {
                const canvas = <MapMakerCanvas>document.createElement("canvas")
                canvas.width = 16;
                canvas.height = 16;
                canvas.setAttribute('position', m.toString())
                this.canvasClick(canvas)

                mapMaker.append(canvas)
                m += 1
            }
        }
    }

    canvasClick(canvasElement: MapMakerCanvas) {
        canvasElement.addEventListener("click", function (e) {
            if (e.ctrlKey || e.metaKey) {

            } else {
                clearSelected()
            }
            let canvas = e.target as MapMakerCanvas

            canvas.style.backgroundColor = "gray"

            if (currentlySelectedCanvas.includes(canvas)) {
                const index = currentlySelectedCanvas.indexOf(canvas);
                currentlySelectedCanvas.splice(index, 1);

                canvas.style.backgroundColor = ""
            } else {
                currentlySelectedCanvas.push(canvas)
            }


            console.log(currentlySelectedCanvas);

        })
    }
}