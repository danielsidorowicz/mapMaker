import '../style/style.css'
import Options from './options'
import Map from './map'
import { currentlySelectedCanvas, clearSelected } from './data'
// import MouseSelect from './mouseSelect'

// const mapMaker = <HTMLElement>document.querySelector("#mapMaker")
window.addEventListener('keydown', function(e) {
    let key = e.key

    if(key == "Delete"){
        for (let i = 0; i < currentlySelectedCanvas.length; i++) {
            const context = currentlySelectedCanvas[i].getContext('2d');
            context!.clearRect(0, 0, currentlySelectedCanvas[i].width, currentlySelectedCanvas[i].height);
        }
        clearSelected()
    }
})


new Options()
new Map()


// for (let i = 0; i < mapMaker.children.length; i++) {
    

// }
// (document.querySelector('.app') as HTMLElement).addEventListener("mousedown", function () {
//     console.log("click");

// })