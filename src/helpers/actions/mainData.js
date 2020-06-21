export const fetchWeather = async () => {
    const response = await fetch('https://api.weather.yandex.ru/v1/informers?lat=44.495273&lon=34.166353', {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json',
            'X-Yandex-API-Key': '888cb5b5-3600-4da2-b97e-94aa4b53de7b',
        },
    });
    return await response.json(); // parses JSON response into native JavaScript objects
}
