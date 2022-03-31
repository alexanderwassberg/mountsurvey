import { owo } from './src/script/functions.js';
import { getSurvey } from './src/script/getSurvey.js';

// API ID's from surveyjs
var surveys = [
    { title: 'Ångest', id: '11f8c383-ccd9-4726-b521-6b4f3fea7b2b' },
    { title: 'Depression', id: '801459b2-fcf1-4626-9e6f-ec736131535b' },
    { title: 'Sömnbesvär', id: 'd30d8f61-c06c-47d2-8f42-b4740cfc34b7' },
    { title: 'Personlighet', id: 'c14522d5-58ec-484a-8f7d-1e5097b39ad5' }
]

// Loops through available categories based on "surveys"
surveys.forEach((survey) => {
    var link = owo("button", {class:"btn"}, owo("li", {}, "#menu"))
    link.innerText = survey.title

    link.addEventListener('click', function() {
        getSurvey(survey.id)
    })
})