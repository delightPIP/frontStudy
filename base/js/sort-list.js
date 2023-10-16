"use strict"

class SortList {

    // wrapper > ul > li 형태
    setting(targetWrapper){
        this.wrapper = document.querySelector("#"+targetWrapper);
        this.initWrapper("ul", "li");
    }

    // 직접 클래스명으로 부여
    setting(targetWrapper, box, item){
        this.wrapper = document.querySelector("#"+targetWrapper);
        this.initWrapper("."+box, "."+item)
    }

    initWrapper(box, item) {
        const that = this;
        that.dragUl = that.wrapper.querySelector(box);
        that.dragUl.classList.add("drag-box");
        that.dragItem = that.wrapper.querySelectorAll(box+" "+item);

        that.dragUl.addEventListener("dragover", (event) => {
            event.preventDefault();

            const dragTargetItem = that.wrapper.querySelector(".dragging");
            let siblings = [...that.dragUl.querySelectorAll(".drag-item:not(.dragging)")];
            let nextSibling = siblings.find(sibling => {
                return event.clientY <= sibling.offsetTop + sibling.offsetHeight / 2;
            });
            this.dragUl.insertBefore(dragTargetItem, nextSibling);
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
                that.sortArray();
            });
        });
    }

    sortArray() {
        let sortArray = [];
        this.wrapper.querySelectorAll(".drag-item").forEach(item => {
            sortArray.push(item.querySelector("input[name=idx]").value);
        });
        console.log(sortArray);
    }
}

const sortUl = new SortList();