interface MapMakerCanvas extends HTMLCanvasElement {
    position: string
    imageData: ImageData
}

interface historyInt {
    action: string,
    canvasSelected: MapMakerCanvas[],
    canvasBoard: MapMakerCanvas[],
}

export type { MapMakerCanvas, historyInt }