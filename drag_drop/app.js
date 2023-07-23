"use static"
//ПОПРОБОВАТЬ ТОЖЕ САМОЕ ЧЕРЕЗ jQuery
const items = document.querySelectorAll('.item')
const placeHolders = document.querySelectorAll('.placeholder')
const addGame = document.querySelector('.addGame')
const placeholderNewGame = document.querySelector('.placeholderNewGame')

for(const item of items){
    item.addEventListener('dragstart', dragstart) //начинаем перенос
    item.addEventListener('dragend', dragend) //заканчиваем перенос
}

addGame.addEventListener('click',addNewGame)

for(const placeHolder of placeHolders) {
    console.log(placeHolder)
    placeHolder.addEventListener('dragover',dragover) //когда элемент над местом помещения
    placeHolder.addEventListener('dragenter', dragenter) // заходим на территорию места помещения
    placeHolder.addEventListener('dragleave', dragleave) // покаидаем место помещения
    placeHolder.addEventListener('drop', dragdrop) // отпустили на место помещения
}

function dragstart(event){
   event.target.classList.add('hold')
   setTimeout(() => {
    event.target.classList.add('hide') //зачем то прячем?
   }, 0)
    
}

function dragend(event){
    event.target.classList.remove('hold', 'hide')//=event.target.className = 'item' задаем с 0 только 1 класс
}

function dragover(event) {
    event.preventDefault() //отменяет дефолтное поведение
}

function dragenter(event) {
    event.target.classList.add('hovered')
}

function dragleave(event) {
    event.target.classList.remove('hovered')
}

function dragdrop(event) {
    let targetItem = document.querySelector('.hold')
    event.target.append(targetItem)
    event.target.classList.remove('hovered')
}

function addNewGame() {
    let nameGame = prompt('Введите название игры', 'Игра без названия')
    let name = document.createElement("p");
    name.innerText = nameGame
    let divGame = document.createElement("div");
    divGame.classList.add('item');
    divGame.draggable = "true";
    divGame.append(name);
    placeholderNewGame.append(divGame);
    const items = document.querySelectorAll('.item');
    for(const item of items){
        item.removeEventListener('dragstart', dragstart) //отключем, чтобы переназначить
        item.removeEventListener('dragend', dragend) //отключем, чтобы переназначить
        item.addEventListener('dragstart', dragstart) //начинаем перенос
        item.addEventListener('dragend', dragend) //заканчиваем перенос
    }
}