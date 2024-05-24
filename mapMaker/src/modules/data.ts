import { MapMakerCanvas } from "./interfaces";

let currentlySelectedCanvas: MapMakerCanvas[] = []

function clearSelected(): void {
    for (let i = 0; i < currentlySelectedCanvas.length; i++) {
        currentlySelectedCanvas[i].style.borderColor = ""
        currentlySelectedCanvas[i].style.backgroundColor = ""
    }

    currentlySelectedCanvas = []
}

export { currentlySelectedCanvas, clearSelected }