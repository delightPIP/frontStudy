"use strict"

class DragAttachment {
    /*data*/
    setting(targetId, data){
        this.wrapper = document.querySelector("#"+targetId);
        this.initWrapper();
    }


    initWrapper() {
        const that = this;
        const dragDiv = document.createElement("div");
        dragDiv.setAttribute("class", "upload-div");

        /*drag event*/
        dragDiv.addEventListener("dragenter", function (event) {
           console.log("");
        });

        dragDiv.addEventListener("dragover", function (event) {
            event.preventDefault();
            this.style.background = "purple";
        });
        dragDiv.addEventListener("dragleave", function (event) {
            this.style.background = "white";
        });
        dragDiv.addEventListener("drop", function (event) {
            event.preventDefault();

            /*drag start*/
            if(that.fileValid(event.dataTransfer)) {
                // post file
            }

        });

        const inputButton = document.createElement("button");
        inputButton.setAttribute("class", "upload-button");
        inputButton.textContent = "파일첨부";

        const fileInput = document.createElement("input");
        fileInput.setAttribute("type", "file");
        fileInput.setAttribute("class", "upload-file");

        dragDiv.appendChild(inputButton);
        dragDiv.appendChild(fileInput);
        this.wrapper.appendChild(dragDiv);
    }

    fileValid(data) {
        // 유효성 검사 추가

        if(data.types.indexOf("Files") < 0) {
            return false;
        }

        if(data.files[0].type.indexOf('image') < 0){
            alert('이미지 파일만 업로드 가능합니다.');
            return false;
        }

        if(data.files.length > 1){
            return false;
        }

        //파일의 사이즈는 50MB 미만
        if(data.files[0].size >= 1024 * 1024 * 10){
            alert('10MB 이상인 파일은 업로드할 수 없습니다.');
            return false;
        }

        return true;
    }
}

const dragFile = new DragAttachment();