
/*main title animation*/
const text = document.querySelector('.fadeInText');
const strText = text.textContent;
const splitText = strText.split("");

text.textContent = "";
for (let i=0; i < splitText.length; i++){
    text.innerHTML += "<span>" + splitText[i] + "</span>";
}

let char = 0;
let timer = setInterval(onTick, 50);

function onTick() {
    const span = text.querySelectorAll('span')[char];
    span.classList.add("fade");
    char++;
    if (char === splitText.length) {
        complete();
        return;
    }
}

function complete() {
    clearInterval(timer);
    timer = null;
}
/*main title animation*/


/*section titles animation*/
var sectionTitlesList = document.querySelectorAll('.sectionTitle'); /*get all titles to a list*/
/*iterate for each title in list*/
for (const title of sectionTitlesList) {
    function scrollAppear() {
        var sectionTitle = title;
        var titlePosition = sectionTitle.getBoundingClientRect().top;
        var screenPosition = window.innerHeight ;

        if (titlePosition < screenPosition) {
            sectionTitle.classList.add('sectionTitle-appear');
        }
    }
    window.addEventListener('scroll',scrollAppear);
}

/*section titles animation*/

