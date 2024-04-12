let currentlySelectedCanvas: HTMLCanvasElement[] = []

function clearSelected(): void {
    currentlySelectedCanvas = []
}

export { currentlySelectedCanvas, clearSelected }