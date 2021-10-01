var images = `
<img style="justify-self: center;" height="200" alt="" src="game/assets/0.png">
<img style="justify-self: center;" height="200" alt="" src="game/assets/1.png">
<img style="justify-self: center;" height="200" alt="" src="game/assets/2.png">
<img style="justify-self: center;" height="200" alt="" src="game/assets/3.png">
<img style="justify-self: center;" height="200" alt="" src="game/assets/4.png">
<img style="justify-self: center;" height="200" alt="" src="game/assets/5.png">
<img style="justify-self: center;" height="200" alt="" src="game/assets/6.png">
<img style="justify-self: center;" height="200" alt="" src="game/assets/7.png">
<img style="justify-self: center;" height="200" alt="" src="game/assets/8.png">
<img style="justify-self: center;" height="200" alt="" src="game/assets/9.png">
<img style="justify-self: center;" height="200" alt="" src="game/assets/10.png">
<img style="justify-self: center;" height="200" alt="" src="game/assets/11.png">
<img style="justify-self: center;" height="200" alt="" src="game/assets/12.png">
<img style="justify-self: center;" height="200" alt="" src="game/assets/13.png">
<img style="justify-self: center;" height="200" alt="" src="game/assets/14.png">
<img style="justify-self: center;" height="200" alt="" src="game/assets/15.png">
<img style="justify-self: center;" height="200" alt="" src="game/assets/16.png">
<img style="justify-self: center;" height="200" alt="" src="game/assets/17.png">
<img style="justify-self: center;" height="200" alt="" src="game/assets/18.png">
<img style="justify-self: center;" height="200" alt="" src="game/assets/19.png">
<img style="justify-self: center;" height="200" alt="" src="game/assets/20.png">       
`

var data = []
window.onload = () => {
    document.querySelectorAll(".slot1, .slot2, .slot3").forEach(el => {
        el.innerHTML = images
    })
    var xml = new XMLHttpRequest();

    xml.open("GET", `34283634576395873`, true);
    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            data = JSON.parse(this.response)
            document.querySelector(".btn").hidden = false
        }
    }
    xml.send();
}


$('.slot1').on('scroll', function () {
    if ($(".slot1").scrollTop() + $(".slot1").innerHeight() >= $(".slot1")[0].scrollHeight) {
        $(this).append(images)
    }
});
$('.slot2').on('scroll', function () {
    if ($(".slot2").scrollTop() + $(".slot2").innerHeight() >= $(".slot2")[0].scrollHeight) {
        $(this).append(images)
    }
});
$('.slot3').on('scroll', function () {
    if ($(".slot3").scrollTop() + $(".slot3").innerHeight() >= $(".slot3")[0].scrollHeight) {
        $(this).append(images)
    }
});

function reset() {
    document.querySelectorAll(".slot1, .slot2, .slot3").forEach(el => {
        el.innerHTML = images
        el.scrollTo({ top: 0 })
    })
}

function start() {

    reset()

    document.querySelector(".btn").style.mixBlendMode = "overlay"
    document.querySelector(".btn").disabled = true
    var el = document.querySelectorAll(".slot3, .slot2, .slot1")
    let index = Math.floor(Math.random() * (data.length - 0))
    var cards = data[index]
    if (!cards) {
        alert("Something went wrong please refresh the page")
        return
    }
    var rounds = []
    var base = 21 * 200
    for (var i = 2; i < 5; i++) {
        if (cards[i - 2] == 0) cards[i - 2] = 21

        let remain = (base - (200 * cards[i - 2])) * i

        let res = (200 * cards[i - 2] * (i + 1)) + remain
        rounds.push(res)

    }
    next0(el[0], 0, rounds[0])
    next0(el[1], 0, rounds[1])
    next0(el[2], 0, rounds[2])
}
function next0(el, t, round) {

    var time = setInterval(() => {
        if (t <= round / 3) {
            el.scrollTo({ top: t, behavior: "auto" })
            t += 100
        }
        else {
            clearInterval(time)
            next1(el, t, round)
        }
    }, 25)
}
function next1(el, t, round) {

    var time = setInterval(() => {
        if (t <= round / 2) {
            el.scrollTo({ top: t, behavior: "auto" })
            t += 85
        }
        else {
            clearInterval(time)
            next2(el, t, round)
        }
    }, 35)
}
function next2(el, t, round) {
    var time = setInterval(() => {
        if (t <= round * 0.75) {
            el.scrollTo({ top: t, behavior: "auto" })
            t += 70
        }
        else {
            clearInterval(time)
            next3(el, t, round)
        }
    }, 45)
}
function next3(el, t, round) {
    var time = setInterval(() => {
        if (t <= round - 30) {
            el.scrollTo({ top: t, behavior: "auto" })
            t += 30
        }
        else {
            clearInterval(time)
            check(el, t, round)
        }
    }, 55)
}
var stoper = 0
function check(el, t, round) {
    var mod = t % 200

    if (mod > 0 && t < round) {
        t = t + 200 - mod
        el.scrollTo({ top: t, behavior: "auto" })
    }
    else {
        t -= mod
        el.scrollTo({ top: t, behavior: "auto" })
    }

    if (stoper < 2) stoper++
    else {
        document.querySelector(".btn").style.mixBlendMode = "multiply"
        document.querySelector(".btn").disabled = false
        stoper = 0
    }


}