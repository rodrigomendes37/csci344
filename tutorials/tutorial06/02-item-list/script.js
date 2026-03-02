const items = ['Apple', 'Banana', 'Orange', 'Grape', 'Mango'];

const itemList = document.querySelector('#itemList');

function displayItems(){
    itemList.innerHTML = '';

    for(let i = 0; i < items.length; i++){
        const listItemHTML = `<li>${items[i]}</li>`;

        itemList.insertAdjacentHTML('beforeend', listItemHTML);
    }
}

displayItems();
