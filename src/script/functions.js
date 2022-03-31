export function owo (type, attributes, target) 
{
    if (typeof target == 'string')
    {
        target = document.querySelector(target);
    }
    let elem = document.createElement(type);
    for (const [key, value] of Object.entries(attributes)) {
        elem.setAttribute(key, value);
    }
    target.appendChild(elem);
    return elem;
}