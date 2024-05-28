import { currentlySelectedCanvas, clearSelected, undoRedoFunction } from "./data";
import { MapMakerCanvas, historyInt } from "./interfaces";
import MouseHold from "./mouseHold";

function hideContextMenu() {
    let contextMenuOwn = document.getElementById("contextMenu") as HTMLDivElement

    contextMenuOwn.style.display = "none"

    document.body.removeEventListener("click", hideContextMenu)
}

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

        mapMaker.addEventListener("contextmenu", this.contextMenuUp)

        // let historyAction: historyInt = {
        //     action: "original",
        //     canvasBoard: [],
        //     canvasSelected: []
        // }

        // undoRedoFunction(historyAction)
    }

    private canvasClick(canvasElement: MapMakerCanvas) {
        canvasElement.addEventListener("click", function (e) {
            let historyAction: historyInt = {
                action: "select",
                canvasSelected: currentlySelectedCanvas,
                canvasBoard: []
            }

            undoRedoFunction(historyAction)


            if (!(e.ctrlKey || e.metaKey)) {

                clearSelected()
            }

            let canvas = e.target as MapMakerCanvas

            if (currentlySelectedCanvas.includes(canvas)) {
                const index = currentlySelectedCanvas.indexOf(canvas);
                currentlySelectedCanvas.splice(index, 1);

                canvas.style.borderColor = ""
                canvas.style.backgroundColor = ""

            } else {
                canvas.style.borderColor = "lightskyblue"
                canvas.style.backgroundColor = "gray"
                currentlySelectedCanvas.push(canvas)

            }



            // console.log(currentlySelectedCanvas);

        })
    }

    private contextMenuUp(e: MouseEvent) {
        e.preventDefault()

        let contextMenuOwn = document.getElementById("contextMenu") as HTMLDivElement

        contextMenuOwn.style.display = "flex"
        contextMenuOwn.style.left = `${e.clientX}px`
        contextMenuOwn.style.top = `${e.clientY}px`

        document.body.addEventListener("click", hideContextMenu)

    }
}