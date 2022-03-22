var data = {"locale":"sv","title":"Ångest","logoPosition":"right","pages":[{"name":"Sida 1","elements":[{"type":"rating","name":"question9","title":"Har du under de senaste 2 veckorna besvärats av något av följande?","rateValues":[{"value":1,"text":"Inte alls"},{"value":2,"text":"Flera dagar"},{"value":3,"text":"Flertalet dagar"},{"value":4,"text":"Så gott som dagligen"}]},{"type":"rating","name":"question1","title":"Känt mig nervös, orolig, spänd","rateValues":[{"value":1,"text":"Inte alls"},{"value":2,"text":"Flera dagar"},{"value":3,"text":"Flertalet dagar"},{"value":4,"text":"Så gott som dagligen"}]},{"type":"rating","name":"question8","title":"Inte kunnat låta bli att ängslas","rateValues":[{"value":1,"text":"Inte alls"},{"value":2,"text":"Flera dagar"},{"value":3,"text":"Flertalet dagar"},{"value":4,"text":"Så gott som dagligen"}]},{"type":"rating","name":"question7","title":"Ängslats för mycket av olika saker","rateValues":[{"value":1,"text":"Inte alls"},{"value":2,"text":"Flera dagar"},{"value":3,"text":"Flertalet dagar"},{"value":4,"text":"Så gott som dagligen"}]}],"title":"GAD-7","description":"Vägledande test för att upptäcka personer som har ångestsyndrom so kan beskrivas som GAD"},{"name":"Sida 2","elements":[{"type":"rating","name":"question6","title":"Haft svårt att koppla av","rateValues":[{"value":1,"text":"Inte alls"},{"value":2,"text":"Flera dagar"},{"value":3,"text":"Flertalet dagar"},{"value":4,"text":"Så gott som dagligen"}]},{"type":"rating","name":"question5","title":"Varit så rastlös att du har haft svårt att sitta still","rateValues":[{"value":1,"text":"Inte alls"},{"value":2,"text":"Flera dagar"},{"value":3,"text":"Flertalet dagar"},{"value":4,"text":"Så gott som dagligen"}]},{"type":"rating","name":"question4","title":"Varit retad och lättkörd","rateValues":[{"value":1,"text":"Inte alls"},{"value":2,"text":"Flera dagar"},{"value":3,"text":"Flertalet dagar"},{"value":4,"text":"Så gott som dagligen"}]},{"type":"rating","name":"question3","title":"Varit rädd, som om något förfärligt skulle kunna hända","rateValues":[{"value":1,"text":"Inte alls"},{"value":2,"text":"Flera dagar"},{"value":3,"text":"Flertalet dagar"},{"value":4,"text":"Så gott som dagligen"}]}],"title":"GAD-7"}],"sendResultOnPageNext":true,"showPageNumbers":true,"startSurveyText":"Starta","pagePrevText":"Tidigare sida","pageNextText":"Nästa sida","completeText":"Färdigställ","previewText":"Tidigare"}

var pages = data.pages;

// Appends
var titleEl = document.getElementById('title')
var pageEl = document.getElementById('page')
titleEl.innerText = data.title;

let score = 0;

function renderPages(nr) {

    // If the page does not exist
    if (nr >= pages.length) { console.log('End of pages'); return }

    var pageContainer = document.createElement("ul");
    pageContainer.classList.add('questions')
    
    pages[nr].elements.forEach((element) => {
        pageEl.innerText = pages[nr].name;
        var qTitle = element.title;
        var qTitleEl = document.createElement("li");
        qTitleEl.classList.add('question')
        qTitleEl.innerText = qTitle;

        pageContainer.appendChild(qTitleEl);
        var rateContainer = document.createElement('div')
        rateContainer.classList.add('ratecontainer')

        element.rateValues.forEach((rate) => {

            var uniqueId = element.name + rate.value

            var rateInput = document.createElement('input')
            rateInput.type = 'radio';
            rateInput.value = uniqueId;
            rateInput.id = uniqueId;
            rateInput.name = 'rate' + element.name;

            var rateLabel = document.createElement('label')
            rateLabel.innerText = rate.text
            rateLabel.htmlFor = element.name + rate.value

            qTitleEl.appendChild(rateContainer)
            rateContainer.appendChild(rateInput)
            rateContainer.appendChild(rateLabel)
        })

    })

    document.querySelector('.container').appendChild(pageContainer);

    var nextPageBtn = document.createElement('button')
    nextPageBtn.innerText = 'Nästa sida';
    pageContainer.appendChild(nextPageBtn)

    nextPageBtn.addEventListener('click', function(){
        console.log('click');
        renderPages(nr + 1)
        pageContainer.classList.add('hide')

        
    })

  
}

renderPages(0)