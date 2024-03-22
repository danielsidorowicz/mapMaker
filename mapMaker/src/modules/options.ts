export default class Options {
    constructor() {
        const mapOptions = <HTMLElement>document.querySelector("#mapOptions")

        for (let i = 0; i < 32; i++) {
            for (let j = 0; j < 32; j++) {
                const canvas = <HTMLCanvasElement>document.createElement("canvas")
                canvas.width = 16;
                canvas.height = 16;

                mapOptions.append(canvas)

                const ctx = canvas.getContext("2d")
                const img = new Image();
                img.src = "./tileset.png";
                img.onload = function () {
                    ctx!.drawImage(img, 16 * j, 16 * i, 16, 16, 0, 0, 16, 16);
                }


            }
        }

    }
}