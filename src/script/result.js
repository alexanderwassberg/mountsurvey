export function getScore(){

    const selected = document.querySelectorAll("input");
    let totals = 0;

    for (var i = 0; i < selected.length; ++i) { 
        if(selected[i].checked == true){
            totals = totals + selected[i].value;
        }
    }

    const totalsArray = Array.from(String(totals), Number)
    const initialValue = 0;

    let result = totalsArray.reduce((previousValue, currentValue) => previousValue + currentValue, initialValue);

    const resultHeader = document.createElement('h3')
    resultHeader.innerText = 'Total poäng: ' + result

    document.querySelector('.container').appendChild(resultHeader)
    
    page.style.display = 'none';
    description.style.display = 'none'

    interpretScore(result)

}

export function interpretScore(score) {

    const interpet = document.getElementById('interpet')
    const levels = ['Du lider av mild ångest', 'Du lider av medelmåttlig ångest', 'Du lider av allvarlig ångest']

    if(score <= 5) { interpet.innerText = levels[0] }
    else if(score >= 6 && score <= 14) { interpet.innerText = levels[1] }
    else { interpet.innerText = levels[2] }

}