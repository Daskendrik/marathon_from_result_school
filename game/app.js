"use strict"

const  board = document.querySelector('#board');
const SQUARES_NUMBER = 246 // границы всегда одни 0....19, 20.....39 (19)
const colors = ['#09990e', '#0aad10', '#10c916', '#10e517', '#08690c', '#357337', '#b6e3b7', '#0f6312']

for(let i = 0; i < SQUARES_NUMBER; i++) {
    const square = document.createElement('div');
    square.classList.add('square');
    square.id = `id_${i}`;

    square.addEventListener('mouseover', () => {
        setColor(square)
    })

    square.addEventListener('mouseleave', () => {
        removeColor(square)
    })

    square.addEventListener('click', () => {
        clickBoom(square)
    })

    board.append(square)
}

function setColor(element) {
    const color = getRandomColor();
    element.style.backgroundColor = color;
    element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`
}

function removeColor(element) {
    element.style.backgroundColor = '#1d1d1d'
    element.style.boxShadow = `0 0 2px #000`
}

function getRandomColor(){
    const index = Math.floor(Math.random() * colors.length)
    return colors[index]
}

function clickBoom(element){
    const ends = indexEnds()
    console.log(ends)
    const endsLeft = ends[0]
    const endsRight = ends[1]
    const id = element.id
    const namId = id.replace('id_', '')
    let arrOfId

    if(endsLeft.indexOf(Number(namId)) != -1){
        arrOfId =[ Number(namId)+1, Number(namId)+2, Number(namId)+20, Number(namId)+40, Number(namId)-20, Number(namId)-40 ]
    } else if (endsRight.indexOf(Number(namId)) != -1) {
        arrOfId =[Number(namId)-2, Number(namId)-1, Number(namId)+20, Number(namId)+40, Number(namId)-20, Number(namId)-40 ] 
    } else {
        arrOfId =[Number(namId)-2, Number(namId)-1, Number(namId)+1, Number(namId)+2,Number(namId)+20, Number(namId)+40, Number(namId)-20, Number(namId)-40 ] 
    }
    for(let index of arrOfId) {
        if(document.querySelector(`#id_${index}`)) {
           document.querySelector(`#id_${index}`).style.backgroundColor = 'red'
        }
    }
    setTimeout(() => {
        for(let index of arrOfId) {
            if(document.querySelector(`#id_${index}`)) {
               document.querySelector(`#id_${index}`).style.backgroundColor = '#1d1d1d'
            }
        }
    }, 1000)  
}

function indexEnds(){
    const numOfRow = SQUARES_NUMBER/20
    const endsLeft = []
    const endsRight = []

        let i = 0;
        do{
            endsLeft.push(i)
            i += 20;
        } while (i < SQUARES_NUMBER)
        i = 19
        do{
            endsRight.push(i)
            i += 20;
        } while (i <= SQUARES_NUMBER)
    if(!Number.isInteger(numOfRow)){
        endsRight.push(SQUARES_NUMBER-1)
    }
    return [endsLeft, endsRight]
}