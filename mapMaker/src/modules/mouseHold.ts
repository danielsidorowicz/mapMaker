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
        this.holding = true

        this.divStartPositionX = e.pageX
        this.divStartPositionY = e.pageY

        this.timeOutForHold = setTimeout(() => {
            if (this.holding) {
                this.holdFunction()
            }
        }, 100)
    }

    private stopHoldFunction = () => {
        this.holding = false

        this.mapDiv.removeEventListener("mousemove", this.mouseMoveFunction)
        clearTimeout(this.timeOutForHold)

        if (document.getElementById("selectBoxDiv")) {
            document.getElementById("selectBoxDiv")!.remove()
        }
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
