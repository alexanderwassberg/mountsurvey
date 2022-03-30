function getSurvey(id) {
    fetch('https://api.surveyjs.io/public/Survey/getSurvey?surveyId={' + id + '}')
        .then(response => response.json())
        .then(data => {
            var subject = document.getElementById('title')
            var description = document.getElementById('description')
            subject.innerText = data.title;
            description.innerText = data.description.sv

            var startBtn = document.getElementById('startBtn')
            startBtn.innerText = data.startSurveyText
            startBtn.addEventListener('click', function() {
                this.style.display = 'none'
                renderPages(0, data);
            })
        });
}

var surveys = [
    { title: 'Ångest', id: '11f8c383-ccd9-4726-b521-6b4f3fea7b2b' },
    { title: 'Depression', id: '801459b2-fcf1-4626-9e6f-ec736131535b' }
]

surveys.forEach((survey) => {
    var menu = document.getElementById('menu')
    var menuItem = document.createElement('li')
    var menuItemA = document.createElement('a')
    menuItemA.href = survey.id
    menuItemA.innerText = survey.title

    menuItem.appendChild(menuItemA)
    menu.appendChild(menuItem)
    
})

function renderPages(nr, data) {

    // Appends

    // End of pages
    if (nr >= data.pages.length) { console.log('End of pages'); getScore(); return }

    var pageContainer = document.createElement("ul");
    pageContainer.classList.add('questions')
    
    data.pages[nr].elements.forEach((element) => {

        var question = element.title;
        var pageNr = document.getElementById('page')

        // Adds page nr
        pageNr.innerText = 'Sida ' + nr + 1;

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
        renderPages(nr + 1, data)
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
    else if(score >= 6 && score <= 14) { interpet.innerText = levels[1] }
    else { interpet.innerText = levels[2] }

}