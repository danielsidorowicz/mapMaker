import { currentlySelectedCanvas, clearSelected, undoRedoFunction, history, undoRedoMap } from "./data";
import { MapMakerCanvas, historyInt } from "./interfaces"



export default class ContextMenu {
    constructor() {
        document.getElementById("undoButton")?.addEventListener("click", this.undoButtonFunction)
        document.getElementById("redoButton")?.addEventListener("click", this.redoButtonFunction)
        document.getElementById("copyButton")?.addEventListener("click", this.copyButtonFunction)
        document.getElementById("pasteButton")?.addEventListener("click", this.pasteButtonFunction)
        document.getElementById("cutButton")?.addEventListener("click", this.cutButtonFunction)
        document.getElementById("delButton")?.addEventListener("click", this.delButtonFunction)
        document.getElementById("saveButton")?.addEventListener("click", this.saveButtonFunction)
        document.getElementById("loadButton")?.addEventListener('click', this.clickLoadButton)

        document.getElementById('inputFile')?.addEventListener('change', this.loadButtonFunction)
    }

    undoButtonFunction = () => {
        undoRedoMap(-1)
    }

    redoButtonFunction = () => {
        undoRedoMap(1)
    }

    copyButtonFunction = () => {

    }

    pasteButtonFunction = () => {

    }

    cutButtonFunction = () => {

    }

    public delButtonFunction = () => {
        let mapMakerChildren = document.getElementById("mapMaker")?.children
        let board: MapMakerCanvas[] = []

        for (let i = 0; i < mapMakerChildren?.length!; i++) {
            let canvas = mapMakerChildren![i] as MapMakerCanvas
            board.push(canvas)
        }

        let historyAction: historyInt = {
            action: "board",
            canvasSelected: currentlySelectedCanvas,
            canvasBoard: board
        }

        undoRedoFunction(historyAction)

        for (let i = 0; i < currentlySelectedCanvas.length; i++) {
            const context = currentlySelectedCanvas[i].getContext('2d');
            context!.clearRect(0, 0, currentlySelectedCanvas[i].width, currentlySelectedCanvas[i].height);
        }
        clearSelected()

    }

    public saveButtonFunction = () => {
        let allCanvases = document.getElementById("mapMaker")!.children

        let jsonToSave: { id: number, url: string }[] = []

        for (let i = 0; i < allCanvases!.length; i++) {
            let canvas = allCanvases[i] as MapMakerCanvas

            const dataURL = canvas.toDataURL('image/png');

            let objectToSave = {
                id: i,
                url: dataURL
            }

            jsonToSave.push(objectToSave)
        }

        let jsonStringify = JSON.stringify(jsonToSave, null, 2)
        let jsonDataUrl = `data:application/json;charset=utf-8,${encodeURIComponent(jsonStringify)}`

        const save = document.createElement('a')
        save.href = jsonDataUrl
        save.download = "mapMakerSave"

        save.click();
    }

    public clickLoadButton = () => {
        const inputFile = document.getElementById('inputFile') as HTMLInputElement
        inputFile.click()
    }

    public loadButtonFunction = (e: Event) => {

        const eventTarget = e.target as HTMLInputElement
        const file = eventTarget.files?.[0]
        // console.log(file);

        const reader = new FileReader();
        if (file) {
            reader.readAsText(file);
            reader.onload = function (e) {
                if (e.target) {
                    const contents = e.target.result as string

                    const jsonData = JSON.parse(contents)
                    console.log(jsonData)

                    let mapMakerChildren = document.getElementById("mapMaker")?.children

                    for (let i = 0; i < mapMakerChildren?.length!; i++) {
                        let canvas = mapMakerChildren![i] as MapMakerCanvas
                        let context = canvas.getContext("2d")

                        const img = new Image()
                        img.src = jsonData[i].url

                        img.onload = function () {
                            if (context) {
                                context.clearRect(0, 0, canvas.width, canvas.height)
                                context.drawImage(img, 0, 0)
                            }
                        };
                    }
                }
            };
        }
    }
}