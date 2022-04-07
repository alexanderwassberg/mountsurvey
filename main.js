import { surveys } from './src/script/surveys.js';
import { addSurveyName, owo } from './src/script/functions.js';
import { getSurvey } from './src/script/getSurvey.js';

// Enter the name of the Survey
addSurveyName('MountSurvey')

// Loops through available categories based on "surveys"
surveys().forEach((survey) => {
    const link = owo("button", {class:"btn"}, owo("li", {}, "#menu"))
    link.innerText = survey.title

    link.addEventListener('click', function() {
        getSurvey(survey.id)

        //Reset <main> if it had content before
        document.querySelector('main').innerHTML = ''
    })
})