import { MapMakerCanvas, historyInt } from "./interfaces";

let currentlySelectedCanvas: MapMakerCanvas[] = []
let history: historyInt[] = []
let historyCounter: number = 0

function undoRedoFunction(object: historyInt): void {
    if (object.action == "original") {
        let mapMakerChildren = document.getElementById("mapMaker")?.children;
        let board: MapMakerCanvas[] = [];

        for (let i = 0; i < mapMakerChildren?.length!; i++) {
            let canvas = mapMakerChildren![i] as MapMakerCanvas;
            let context = canvas.getContext("2d");

            // Ensure the canvas context is captured
            if (context) {
                context.clearRect(0, 0, canvas.width, canvas.height);
            }

            board.push(canvas);
        }

        clearSelected();

        let historyObj: historyInt = {
            action: "original",
            canvasSelected: currentlySelectedCanvas,
            canvasBoard: board
        };

        history.push(historyObj);
    } else if (object.action == "board" || object.action == "select") {
        let board: { canvas: MapMakerCanvas, imageData: ImageData }[] = [];

        // Capture the current state of each canvas
        for (let i = 0; i < object.canvasBoard.length; i++) {
            let canvas = object.canvasBoard[i] as MapMakerCanvas;
            let context = canvas.getContext("2d");
            let imageData = context?.getImageData(0, 0, canvas.width, canvas.height);

            if (imageData) {
                board.push({ canvas, imageData });
            }
        }

        let historyObj: historyInt = {
            action: object.action,
            canvasSelected: object.canvasSelected,
            // @ts-ignore
            canvasBoard: board
        };

        history.push(historyObj);
    }

    history.splice(historyCounter + 1, history.length - historyCounter);
    historyCounter = history.length;
}

function clearSelected(): void {
    for (let i = 0; i < currentlySelectedCanvas.length; i++) {
        currentlySelectedCanvas[i].style.borderColor = ""
        currentlySelectedCanvas[i].style.backgroundColor = ""
    }

    currentlySelectedCanvas = []
}

function undoRedoMap(value: number) {
    if (historyCounter + value != -1 && historyCounter + value != history.length) {
        historyCounter = historyCounter + value;
    }

    console.log(historyCounter);

    let goBack = history[historyCounter] as historyInt;

    if (goBack.action == "board") {
        let mapMakerChildren = document.getElementById("mapMaker")?.children;

        for (let i = 0; i < mapMakerChildren?.length!; i++) {
            let canvasMap = mapMakerChildren![i] as MapMakerCanvas;
            let contextMap = canvasMap.getContext("2d");

            let historyMapData = goBack.canvasBoard[i].imageData;

            if (contextMap && historyMapData) {
                // Clear the current canvas
                contextMap.clearRect(0, 0, canvasMap.width, canvasMap.height);

                // Restore the saved state from the history imageData
                contextMap.putImageData(historyMapData, 0, 0);
            } else {
                console.error("Context or ImageData is null for canvas:", i);
            }
        }

        clearSelected();

        // if (value == -1) {
        for (let i = 0; i < goBack.canvasSelected.length; i++) {
            goBack.canvasSelected[i].style.borderColor = "lightskyblue";
            goBack.canvasSelected[i].style.backgroundColor = "gray";
            currentlySelectedCanvas.push(goBack.canvasSelected[i]);
        }
        // }
    } else if (goBack.action == "select") {
        clearSelected();

        for (let i = 0; i < goBack.canvasSelected.length; i++) {
            goBack.canvasSelected[i].style.borderColor = "lightskyblue";
            goBack.canvasSelected[i].style.backgroundColor = "gray";
            currentlySelectedCanvas.push(goBack.canvasSelected[i]);
        }
    }

}


export { currentlySelectedCanvas, clearSelected, undoRedoFunction, history, historyCounter, undoRedoMap }