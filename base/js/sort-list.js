"use strict"

class SortList {

    // wrapper > ul > li 형태
    setting(targetWrapper, valueName){
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
            let siblings = [...event.target.parentNode.querySelectorAll(".drag-item:not(.dragging)")];
            let nextSibling = siblings.find(sibling => {
                return event.clientY <= sibling.offsetTop + sibling.offsetHeight / 2;
            });
            event.target.parentNode.insertBefore(dragTargetItem, nextSibling);
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
                that.sortArray(event.target.parentNode, valueName);
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