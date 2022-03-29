var data = {"locale":"sv","title":"Ångest","description":{"sv":"Vägledande test för att upptäcka personer som har ångestsyndrom so kan beskrivas som GAD"},"logoPosition":"right","pages":[{"name":"Sida 1","elements":[{"type":"rating","name":"question9","title":"Har du under de senaste 2 veckorna besvärats av något av följande?","rateValues":[{"value":1,"text":"Inte alls"},{"value":2,"text":"Flera dagar"},{"value":3,"text":"Flertalet dagar"},{"value":4,"text":"Så gott som dagligen"}]},{"type":"rating","name":"question1","title":"Känt mig nervös, orolig, spänd","rateValues":[{"value":1,"text":"Inte alls"},{"value":2,"text":"Flera dagar"},{"value":3,"text":"Flertalet dagar"},{"value":4,"text":"Så gott som dagligen"}]},{"type":"rating","name":"question8","title":"Inte kunnat låta bli att ängslas","rateValues":[{"value":1,"text":"Inte alls"},{"value":2,"text":"Flera dagar"},{"value":3,"text":"Flertalet dagar"},{"value":4,"text":"Så gott som dagligen"}]},{"type":"rating","name":"question7","title":"Ängslats för mycket av olika saker","rateValues":[{"value":1,"text":"Inte alls"},{"value":2,"text":"Flera dagar"},{"value":3,"text":"Flertalet dagar"},{"value":4,"text":"Så gott som dagligen"}]}],"title":"GAD-7","description":"Vägledande test för att upptäcka personer som har ångestsyndrom so kan beskrivas som GAD"},{"name":"Sida 2","elements":[{"type":"rating","name":"question6","title":"Haft svårt att koppla av","rateValues":[{"value":1,"text":"Inte alls"},{"value":2,"text":"Flera dagar"},{"value":3,"text":"Flertalet dagar"},{"value":4,"text":"Så gott som dagligen"}]},{"type":"rating","name":"question5","title":"Varit så rastlös att du har haft svårt att sitta still","rateValues":[{"value":1,"text":"Inte alls"},{"value":2,"text":"Flera dagar"},{"value":3,"text":"Flertalet dagar"},{"value":4,"text":"Så gott som dagligen"}]},{"type":"rating","name":"question4","title":"Varit retad och lättkörd","rateValues":[{"value":1,"text":"Inte alls"},{"value":2,"text":"Flera dagar"},{"value":3,"text":"Flertalet dagar"},{"value":4,"text":"Så gott som dagligen"}]},{"type":"rating","name":"question3","title":"Varit rädd, som om något förfärligt skulle kunna hända","rateValues":[{"value":1,"text":"Inte alls"},{"value":2,"text":"Flera dagar"},{"value":3,"text":"Flertalet dagar"},{"value":4,"text":"Så gott som dagligen"}]}],"title":"GAD-7"}],"sendResultOnPageNext":true,"showPageNumbers":true,"startSurveyText":"Starta","pagePrevText":"Tidigare sida","pageNextText":"Nästa sida","completeText":"Färdigställ","previewText":"Tidigare"};
var pages = data.pages;

// Appends
var subject = document.getElementById('title')
var description = document.getElementById('description')
var pageNr = document.getElementById('page')
subject.innerText = data.title;
description.innerText = data.description.sv

var startBtn = document.getElementById('startBtn')
startBtn.innerText = data.startSurveyText

startBtn.addEventListener('click', function() {
    this.style.display = 'none'
    renderPages(0)
})

function renderPages(nr) {

    // End of pages
    if (nr >= pages.length) { console.log('End of pages'); getScore(); return }

    var pageContainer = document.createElement("ul");
    pageContainer.classList.add('questions')
    
    pages[nr].elements.forEach((element) => {

        var question = element.title;

        // Adds page nr
        pageNr.innerText = 'Sida ' + [nr + 1];

        // Question List
        var qList = document.createElement('li');
        qList.classList.add('question')

        var paragraph = document.createElement('p')
        paragraph.innerText = question
        
        pageContainer.appendChild(qList);
        qList.appendChild(paragraph);

        var rateContainer = document.createElement('div')
        rateContainer.classList.add('rate-container')

        element.rateValues.forEach((rate) => {

            var uniqueId = element.name + rate.value

            var rateInput = document.createElement('input')
            rateInput.type = 'radio';
            rateInput.value = rate.value -1;
            rateInput.id = uniqueId;
            rateInput.name = 'rate' + element.name;

            var rateLabel = document.createElement('label')
            rateLabel.innerText = rate.text
            rateLabel.htmlFor = uniqueId;

            var rate = document.createElement('div')
            rate.classList.add('rate')

            qList.appendChild(rateContainer)
            rate.appendChild(rateInput)
            rate.appendChild(rateLabel)
            rateContainer.appendChild(rate)

        })

    })

    document.querySelector('.container').appendChild(pageContainer);

    var nextPageBtn = document.createElement('button')
    currentPage = data.pages[nr].name.match(/\d+/g)

    if(currentPage == data.pages.length) { nextPageBtn.innerText = data.completeText }
    else { nextPageBtn.innerText = data.pageNextText }

    
    nextPageBtn.classList.add('btn', 'next')
    pageContainer.appendChild(nextPageBtn)

    nextPageBtn.addEventListener('click', function(){
        pageContainer.classList.add('hide')
        renderPages(nr + 1)
    })
}

function getScore(){

    var selected = document.querySelectorAll("input");
    var totals = 0;
    for (var i = 0; i < selected.length; ++i) { 
        if(selected[i].checked == true){
            totals = totals + selected[i].value;
        }
    }

    var totalsArray = Array.from(String(totals), Number)
    const initialValue = 0;
    const result = totalsArray.reduce((previousValue, currentValue) => previousValue + currentValue, initialValue);

    var resultHeader = document.createElement('h3')
    resultHeader.innerText = 'Total poäng: ' + result

    document.querySelector('.container').appendChild(resultHeader)

    page.style.display = 'none';
    description.style.display = 'none'

    interpretScore(result)

}

function interpretScore(score) {

    var interpet = document.getElementById('interpet')
    var levels = ['Du lider av mild ångest', 'Du lider av medelmåttlig ångest', 'Du lider av allvarlig ångest']

    if(score <= 5) { interpet.innerText = levels[0] }
    if(score >= 6 && score <= 14) { interpet.innerText = levels[1] }
    if(score >= 15) { interpet.innerText = levels[2] }

}