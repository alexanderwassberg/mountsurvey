import { getScore } from './result.js';

export function renderSurvey(nr, data) {

    // End of pages
    if (nr >= data.pages.length) { console.log('End of pages'); getScore(); return }

    var pageContainer = document.createElement("ul");
    pageContainer.classList.add('questions')
    
    data.pages[nr].elements.forEach((element) => {

        var question = element.title;
        var pageNr = document.getElementById('page')

        var pageNumber = nr + 1;

        // Adds page nr
        pageNr.innerText = 'Sida ' + pageNumber;

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
    var currentPage = data.pages[nr].name.match(/\d+/g)

    if(currentPage == data.pages.length) { nextPageBtn.innerText = data.completeText }
    else { nextPageBtn.innerText = data.pageNextText }

    
    nextPageBtn.classList.add('btn', 'next')
    pageContainer.appendChild(nextPageBtn)

    nextPageBtn.addEventListener('click', function(){
        pageContainer.classList.add('hide')
        renderSurvey(nr + 1, data)
    })
}