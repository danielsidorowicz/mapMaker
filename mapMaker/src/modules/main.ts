import '../style/style.css'
import Options from './options'
import Map from './map'
// import { currentlySelectedCanvas, clearSelected } from './data'
import ContextMenu from './contextMenu'
// import MouseSelect from './mouseSelect'

// const mapMaker = <HTMLElement>document.querySelector("#mapMaker")



new Options()
new Map()
let contextMenu = new ContextMenu()

let controlKey = false
let metaKey = false
let lKey = false
let sKey = false
let zKey = false
let yKey = false

window.addEventListener('keydown', function (e) {
    e.preventDefault()
    let key: String = e.code

    console.log(key);

    if (key == "Delete") {
        contextMenu.delButtonFunction()
    }

    if (key == "ControlLeft") {
        controlKey = true
    }

    if (key == "MetaKey") {
        metaKey = true
    }

    if (key == "KeyS") {
        sKey = true
    }

    if (key == "KeyL") {
        lKey = true
    }

    if (key == "KeyZ") {
        zKey = true
    }

    if (key == "KeyY") {
        yKey = true
    }

    if ((controlKey && sKey) || (metaKey && sKey)) {
        contextMenu.saveButtonFunction()
        // controlKey = false
        sKey = false
    } else if ((controlKey && lKey) || (metaKey && lKey)) {
        contextMenu.clickLoadButton()
        // controlKey = false
        lKey = false
    } else if ((controlKey && zKey) || (metaKey && zKey)) {
        contextMenu.undoButtonFunction()
        // controlKey = false
        zKey = false
    } else if ((controlKey && yKey) || (metaKey && yKey)) {
        contextMenu.redoButtonFunction()
        // controlKey = false
        yKey = false
    }

})

window.addEventListener('keyup', (e) => {
    let key: String = e.code

    if (key == "ControlLeft") {
        controlKey = false
    }

    if (key == "MetaKey") {
        metaKey = false
    }

    if (key == "KeyS") {
        sKey = false
    }

    if (key == "KeyL") {
        lKey = false
    }

    if (key == "KeyZ") {
        zKey = false
    }

    if (key == "KeyY") {
        yKey = false
    }
});
