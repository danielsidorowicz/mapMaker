export default class Map {
    constructor() {
        const mapMaker = <HTMLElement>document.querySelector("#mapMaker")

        for (let i = 0; i < 32; i++) {
            for (let j = 0; j < 64; j++) {
                const canvas = <HTMLCanvasElement>document.createElement("canvas")
                canvas.width = 16;
                canvas.height = 16;
                mapMaker.append(canvas)
            }
        }

    }
}