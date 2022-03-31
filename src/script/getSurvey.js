import { renderSurvey } from "./renderSurvey.js";

export function getSurvey(id) {
    fetch('https://api.surveyjs.io/public/Survey/getSurvey?surveyId={' + id + '}')
        .then(response => response.json())
        .then(data => {
            const subject = document.getElementById('title')
            const description = document.getElementById('description')
            subject.innerText = data.title;
            description.innerText = data.description.sv

            const startBtn = document.getElementById('startBtn')
            startBtn.style.display = 'block'
            startBtn.innerText = data.startSurveyText
            startBtn.addEventListener('click', function() {
                this.style.display = 'none'
                // Renders the first page of the current survey
                renderSurvey(0, data);
            })
        });
}