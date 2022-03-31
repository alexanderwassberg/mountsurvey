import { getScore } from './result.js';

export function renderSurvey(nr, data) {

    // End of pages
    if (nr >= data.pages.length) { console.log('End of pages'); getScore(); return }

    const pageContainer = document.createElement("ul");
    pageContainer.classList.add('questions')
    
    data.pages[nr].elements.forEach((element) => {

        const question = element.title;
        const pageNr = document.getElementById('page')
        const pageNumber = nr + 1;

        // Adds page nr
        pageNr.innerText = 'Sida ' + pageNumber;

        // Question List
        const qList = document.createElement('li');
        qList.classList.add('question')

        const paragraph = document.createElement('p')
        paragraph.innerText = question
        
        pageContainer.appendChild(qList);
        qList.appendChild(paragraph);

        const rateContainer = document.createElement('div')
        rateContainer.classList.add('rate-container')

        element.rateValues.forEach((rate) => {

            const uniqueId = element.name + rate.value

            const rateInput = document.createElement('input')
            rateInput.type = 'radio';
            rateInput.value = rate.value -1;
            rateInput.id = uniqueId;
            rateInput.name = 'rate' + element.name;

            const rateLabel = document.createElement('label')
            rateLabel.innerText = rate.text
            rateLabel.htmlFor = uniqueId;

            rate = document.createElement('div')
            rate.classList.add('rate')

            qList.appendChild(rateContainer)
            rate.appendChild(rateInput)
            rate.appendChild(rateLabel)
            rateContainer.appendChild(rate)

        })

    })

    document.querySelector('.container').appendChild(pageContainer);

    const nextPageBtn = document.createElement('button')
    const currentPage = data.pages[nr].name.match(/\d+/g)

    if(currentPage == data.pages.length) { nextPageBtn.innerText = data.completeText }
    else { nextPageBtn.innerText = data.pageNextText }

    
    nextPageBtn.classList.add('btn', 'next')
    pageContainer.appendChild(nextPageBtn)

    nextPageBtn.addEventListener('click', function(){
        pageContainer.classList.add('hide')
        renderSurvey(nr + 1, data)
    })
}