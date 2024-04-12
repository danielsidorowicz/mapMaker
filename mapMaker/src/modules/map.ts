import { currentlySelectedCanvas, clearSelected } from "./data";

export default class Map {
    constructor() {
        const mapMaker = <HTMLElement>document.querySelector("#mapMaker")
        let m = 0
        for (let i = 0; i < 48; i++) {
            for (let j = 0; j < 48; j++) {
                const canvas = <HTMLCanvasElement>document.createElement("canvas")
                canvas.width = 16;
                canvas.height = 16;
                canvas.setAttribute('position', m.toString())
                this.canvasClick(canvas)

                mapMaker.append(canvas)
                m += 1
            }
        }
    }

    canvasClick(canvasElement: HTMLCanvasElement) {
        canvasElement.addEventListener("click", function (e) {
            clearSelected()

            console.log(e.target);

            currentlySelectedCanvas.push(e.target as HTMLCanvasElement)
            console.log(currentlySelectedCanvas);

        })
    }
}