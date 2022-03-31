import { renderSurvey } from "./renderSurvey.js";

export function getSurvey(id) {
    fetch('https://api.surveyjs.io/public/Survey/getSurvey?surveyId={' + id + '}')
        .then(response => response.json())
        .then(data => {
            var subject = document.getElementById('title')
            var description = document.getElementById('description')
            subject.innerText = data.title;
            description.innerText = data.description.sv

            var startBtn = document.getElementById('startBtn')
            startBtn.style.display = 'block'
            startBtn.innerText = data.startSurveyText
            startBtn.addEventListener('click', function() {
                this.style.display = 'none'
                renderSurvey(0, data);
            })
        });
}