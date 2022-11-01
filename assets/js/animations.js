
/*main title animation*/
function mainTitleWritingAnimation(){
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
}
/*main title animation*/


/*section titles animation*/
var sectionTitlesList = document.querySelectorAll('.sectionTitle'); /*get all titles to a list*/
/*iterate for each title in list*/
for (const title of sectionTitlesList) {
    function scrollAppear() {
        var sectionTitle = title;
        var titlePosition = sectionTitle.getBoundingClientRect().top;
        var screenPosition = window.innerHeight /1.2 ;

        if (titlePosition < screenPosition) {
            sectionTitle.classList.add('sectionTitle-appear');
        }
    }
    window.addEventListener('scroll',scrollAppear);
}
/*section titles animation*/


/*loading screen*/
$(window).on('load',function (){
    $('#loader').css('transform','translateX(100vw)');
    $('#loader').css('transition','all 1s');
    $('#main,#footer,#header').css('visibility','visible');

    setTimeout(function (){
        mainTitleWritingAnimation();
    },500);
});
/*loading screen*/


/*certificate change*/
{
    let certificates = ["assets/image/certificates/sololearn-html.jpg","assets/image/certificates/uom-python.jpg"];
    let selectedCertificateIndex = 0;

    setCertificate();

    $('#btn_next_on_certificate').click(function (){
        selectedCertificateIndex++;
        if (selectedCertificateIndex === certificates.length){
            selectedCertificateIndex = 0;
        }
        setCertificate();
    });
    $('#btn_prev_on_certificate').click(function (){
        selectedCertificateIndex--;
        if (selectedCertificateIndex === -1){
            selectedCertificateIndex = certificates.length-1;
        }
        setCertificate();
    });

    function setCertificate(){
        $('#certificate_image').attr('src',certificates[selectedCertificateIndex]);
    }
}
/*certificate change*/


/*when scroll from home sec*/
window.onscroll = function() {myFunction()};

function myFunction() {
    if (document.documentElement.scrollTop > 700) {
        $('#homeTextDiv').css('display','none');
        $('#socialNav').css('display','none');
        $('#homeMainImage').css('opacity','20%');
    } else {
        $('#homeTextDiv').css('display','inline');
        $('#socialNav').css('display','inline');
        $('#homeMainImage').css('opacity','100%');
    }
}
/*when scroll from home sec*/