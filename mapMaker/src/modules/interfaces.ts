interface MapMakerCanvas extends HTMLCanvasElement {
    position: string
    imageData: ImageData
}

interface historyInt {
    action: string,
    canvasSelected: MapMakerCanvas[],
    canvasBoard: MapMakerCanvas[],
}

interface jsonSave {
    id: number,
    url: string
}

export type { MapMakerCanvas, historyInt, jsonSave }