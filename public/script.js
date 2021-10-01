import { createApp } from "https://unpkg.com/petite-vue?module"

createApp({
    dender: [],
    show: true,
    temp: [],
    clicked(el) {

        if (this.temp.length < 3) {
            el.style.transform = "scale(0.8)"
            this.temp.push(el.src.split("/").pop().split(".")[0])
        }
        else {
            alert("You already selected 3 images for combination")
        }
    },
    set() {
        this.show = false
        if (this.temp.length !== 3) alert("You have to select 3 images for combination")
        else {
            this.dender.push(this.temp)
            this.temp = []
            var arr = Array.from(document.querySelectorAll("#sample img"))
            for (var i of arr) {
                if (i.style.transform == "scale(0.8)") i.style.transform = "scale(1)"
            }
        }
    },
    del(n) {
        this.dender.splice(n, 1)
        if (this.dender.length == 0) this.show = true
    },
    send() {
        var xhr = new XMLHttpRequest()
        xhr.open("POST", "298342897934234", true)
        xhr.setRequestHeader("Content-Type", "application/json")
        xhr.send(JSON.stringify(Array.from(this.dender)))
        alert("combonations has been sended!")
    },
    getData() {
        var xml = new XMLHttpRequest();
        xml.open("GET", "34283634576395873", true);
        var self = this
        xml.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var data = JSON.parse(this.response);
                self.dender = data
                self.show = false
            }
        }
        xml.send();
    }
}).mount()

