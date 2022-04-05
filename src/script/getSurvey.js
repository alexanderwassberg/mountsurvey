import { renderSurvey } from "./renderSurvey.js";
import { owo } from './functions.js';

export function getSurvey(id) {
    fetch('https://api.surveyjs.io/public/Survey/getSurvey?surveyId={' + id + '}')
        .then(response => response.json())
        .then(data => {
            console.log(data);

            const subject = owo("h2", {class:"title"}, "main")
            subject.innerText = data.title

            const description = owo("p", {class:"description"}, "main")
            description.innerText = data.description

            const startBtn = owo("button", {class:"btn next"}, "main")
            startBtn.style.display = 'block'

            if(data.startSurveyText == undefined) { data.startSurveyText = 'Starta' }
            startBtn.innerText = data.startSurveyText

            startBtn.addEventListener('click', function() {
                renderSurvey(0, data)
                description.remove()
                startBtn.remove()
                document.getElementById('menu').remove()
            })
        });
}