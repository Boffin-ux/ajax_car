document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const select = document.getElementById('cars'),
        output = document.getElementById('output');

    select.addEventListener('change', () => {
        const getCars = (url) => {
            return new Promise((resolve, reject) => {
                const request = new XMLHttpRequest();
                request.open('GET', url);
                request.setRequestHeader('Content-type', 'application/json');
                request.addEventListener('readystatechange', () => {
                    if (request.readyState !== 4) {
                        return;
                    }
                    if (request.status === 200) {
                        const data = JSON.parse(request.responseText);
                        resolve(data);
                    } else {
                        output.innerHTML = 'Произошла ошибка';
                        reject(request.statusText);
                    }
                });
                request.send();
            });
        };

        const outputCars = (dataCars) => {
            dataCars.cars.forEach(item => {
                if (item.brand === select.value) {
                    const { brand, model, price } = item;
                    output.innerHTML = `Тачка ${brand} ${model} <br>
                        Цена: ${price}$`;
                }
            });
        };
        const urlCars = './cars.json';
        getCars(urlCars)
            .then(outputCars)
            .catch(error => {
                console.error(error);
            });
    });
});