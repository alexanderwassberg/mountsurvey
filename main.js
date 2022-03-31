import { surveys } from './src/script/surveys.js';
import { owo } from './src/script/functions.js';
import { getSurvey } from './src/script/getSurvey.js';

// Loops through available categories based on "surveys"
surveys().forEach((survey) => {
    var link = owo("button", {class:"btn"}, owo("li", {}, "#menu"))
    link.innerText = survey.title

    link.addEventListener('click', function() {
        getSurvey(survey.id)
    })
})