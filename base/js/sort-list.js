"use strict"

class SortList {

    // wrapper > ul > li 형태
    settingList(targetWrapper, valueName){
        this.wrapper = document.querySelector("#"+targetWrapper);
        this.initWrapper("ul", "li", valueName);
    }

    settingBox(targetWrapper, box, item, valueName) {
        this.wrapper = document.querySelector("#"+targetWrapper);
        this.initWrapper(`.${box}`, `.${item}`, valueName);
    }

    initWrapper(box, item, valueName) {
        const that = this;

        that.dragUl = that.wrapper.querySelector(box);
        that.dragUl.classList.add("drag-box");
        that.dragItem = that.wrapper.querySelectorAll(box+" "+item);

        that.dragUl.addEventListener("dragover", (event) => {
            event.preventDefault();

            const dragTargetItem = event.target.parentNode.querySelector(".dragging");

            if(dragTargetItem !== null) {
                let siblings = [...event.target.parentNode.querySelectorAll(".drag-item:not(.dragging)")];
                let nextSibling = siblings.find(sibling => {
                    return event.clientY <= sibling.offsetTop + sibling.offsetHeight / 2;
                });
                event.target.parentNode.insertBefore(dragTargetItem, nextSibling);
            }else{
                console.log("다른영역에서 dragover");
            }
        });
        that.dragUl.addEventListener("dragenter", (event) => event.preventDefault());

        that.dragItem.forEach(item => {
            item.classList.add("drag-item");
            item.setAttribute("draggable", true);

            item.addEventListener("dragstart", () => {
                setTimeout(() => item.classList.add("dragging"), 0);
            });
            item.addEventListener("dragend", (event) => {
                item.classList.remove("dragging");
                if(event.target.parentNode.querySelector(".dragging") !==null) {
                    that.sortArray(event.target.parentNode, valueName);
                }else{
                    console.log("다른영역에서 끝");
                }
            });
        });
    }

    sortArray(ul, valueName) {
        let sortArray = [];
        ul.querySelectorAll(".drag-item").forEach(item => {
            sortArray.push(item.querySelector(`input[name=${valueName}]`).value);
        });
        console.log(sortArray);
    }
}

const sortUl = new SortList();