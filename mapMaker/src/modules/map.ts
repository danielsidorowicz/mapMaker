import { currentlySelectedCanvas, clearSelected } from "./data";
import { MapMakerCanvas } from "./interfaces";
import MouseHold from "./mouseHold";

export default class Map {
    constructor() {
        const mapMaker = <HTMLDivElement>document.querySelector("#mapMaker")
        let m = 0
        for (let i = 0; i < 40; i++) {
            for (let j = 0; j < 42; j++) {
                const canvas = <MapMakerCanvas>document.createElement("canvas")
                canvas.width = 16;
                canvas.height = 16;
                canvas.id = "canvasID"
                canvas.setAttribute('position', m.toString())
                this.canvasClick(canvas)

                mapMaker.append(canvas)
                m += 1
            }
        }

        new MouseHold(mapMaker)
    }

    private canvasClick(canvasElement: MapMakerCanvas) {
        canvasElement.addEventListener("click", function (e) {
            if (e.ctrlKey || e.metaKey) {

            } else {
                clearSelected()
            }
            let canvas = e.target as MapMakerCanvas

            canvas.style.borderColor = "lightskyblue"
            canvas.style.backgroundColor = "gray"

            if (currentlySelectedCanvas.includes(canvas)) {
                const index = currentlySelectedCanvas.indexOf(canvas);
                currentlySelectedCanvas.splice(index, 1);

                canvas.style.borderColor = ""
                canvas.style.backgroundColor = ""
            } else {
                currentlySelectedCanvas.push(canvas)
            }


            console.log(currentlySelectedCanvas);

        })
    }
}