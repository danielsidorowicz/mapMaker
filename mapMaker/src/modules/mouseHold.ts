import { clearSelected, currentlySelectedCanvas, undoRedoFunction } from "./data"
import { MapMakerCanvas, historyInt } from "./interfaces"

export default class MouseHold {
    holding: Boolean
    mapDiv: HTMLDivElement
    timeOutForHold: ReturnType<typeof setTimeout>
    divStartPositionX: number
    divStartPositionY: number

    constructor(mapDiv: HTMLDivElement) {
        this.mapDiv = mapDiv
        this.holding = false
        this.timeOutForHold = 0
        this.divStartPositionX = 0
        this.divStartPositionY = 0
        this.mapDiv.addEventListener('mousedown', this.startHoldFunction)
        this.mapDiv.addEventListener('mouseup', this.stopHoldFunction)
        this.mapDiv.addEventListener('mouseleave', this.stopHoldFunction)
    }

    private startHoldFunction = (e: MouseEvent) => {
        if (document.getElementById("contextMenu")?.style.display != "flex") {
            this.holding = true

            this.divStartPositionX = e.pageX
            this.divStartPositionY = e.pageY

            this.timeOutForHold = setTimeout(() => {
                if (this.holding) {
                    this.holdFunction()
                }
            }, 100)
        }
    }

    private stopHoldFunction = (e: MouseEvent) => {
        this.mapDiv.removeEventListener("mousemove", this.mouseMoveFunction)
        clearTimeout(this.timeOutForHold)

        let elements = document.querySelectorAll("#mapMaker *")



        if (document.getElementById("selectBoxDiv")) {
            let selectBox = document.getElementById("selectBoxDiv")
            let selectBoxRectangle = selectBox?.getBoundingClientRect()
            if (this.holding) {
                let historyAction: historyInt = {
                    action: "select",
                    canvasSelected: currentlySelectedCanvas,
                    canvasBoard: []
                }

                undoRedoFunction(historyAction)
                if (e.ctrlKey || e.metaKey) {
                    let checkIfAllInside = true
                    let canvasesToDo: MapMakerCanvas[] = []

                    elements.forEach(canvas => {
                        let canvasRectangle = canvas.getBoundingClientRect()
                        if (!(canvasRectangle.right < selectBoxRectangle!.left || canvasRectangle.left > selectBoxRectangle!.right || canvasRectangle.bottom < selectBoxRectangle!.top || canvasRectangle.top > selectBoxRectangle!.bottom)) {
                            if (!currentlySelectedCanvas.includes(canvas as MapMakerCanvas)) {
                                checkIfAllInside = false
                            }
                            canvasesToDo.push(canvas as MapMakerCanvas)
                        }
                    })

                    if (checkIfAllInside) {
                        for (let i = 0; i < canvasesToDo.length; i++) {
                            const index = currentlySelectedCanvas.indexOf(canvasesToDo[i]);
                            currentlySelectedCanvas.splice(index, 1);

                            canvasesToDo[i].style.borderColor = ""
                            canvasesToDo[i].style.backgroundColor = ""
                        }
                    } else {
                        for (let i = 0; i < canvasesToDo.length; i++) {
                            canvasesToDo[i].style.borderColor = "lightskyblue"
                            canvasesToDo[i].style.backgroundColor = "gray"
                            currentlySelectedCanvas.push(canvasesToDo[i])
                        }
                    }

                } else {
                    clearSelected()
                    elements.forEach(canvas => {
                        let canvasRectangle = canvas.getBoundingClientRect()
                        if (!(canvasRectangle.right < selectBoxRectangle!.left || canvasRectangle.left > selectBoxRectangle!.right || canvasRectangle.bottom < selectBoxRectangle!.top || canvasRectangle.top > selectBoxRectangle!.bottom)) {
                            if (!currentlySelectedCanvas.includes(canvas as MapMakerCanvas)) {
                                let canvasAdd = canvas as MapMakerCanvas

                                canvasAdd.style.borderColor = "lightskyblue"
                                canvasAdd.style.backgroundColor = "gray"
                                currentlySelectedCanvas.push(canvasAdd)
                            }
                        }
                    })
                }

            }

            if (selectBox) {
                selectBox!.remove()
            }
        }
        this.holding = false
    }

    private holdFunction = () => {
        let selectBoxDiv = document.createElement("div") as HTMLDivElement

        selectBoxDiv.id = "selectBoxDiv"
        selectBoxDiv.classList.add("selectBoxDiv")
        document.body.append(selectBoxDiv)

        selectBoxDiv.style.left = `${this.divStartPositionX}px`
        selectBoxDiv.style.top = `${this.divStartPositionY}px`

        this.mapDiv.addEventListener('mousemove', this.mouseMoveFunction)
    }

    private mouseMoveFunction = (e: MouseEvent) => {
        let selectBoxDiv = document.getElementById("selectBoxDiv") as HTMLDivElement

        let divHeight = e.clientY - this.divStartPositionY
        let divWidth = e.clientX - this.divStartPositionX

        if (divWidth < 0) {
            selectBoxDiv.style.left = `${this.divStartPositionX + divWidth}px`;
            divWidth = -divWidth;
        } else {
            selectBoxDiv.style.left = `${this.divStartPositionX}px`;
        }

        if (divHeight < 0) {
            selectBoxDiv.style.top = `${this.divStartPositionY + divHeight}px`;
            divHeight = -divHeight;
        } else {
            selectBoxDiv.style.top = `${this.divStartPositionY}px`;
        }

        selectBoxDiv.style.width = `${divWidth}px`;
        selectBoxDiv.style.height = `${divHeight}px`;
    }

}
