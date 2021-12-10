
const orderId = getOrderId();
displayOrderId(orderId);
clearSessionStorage();

function getOrderId() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const orderId = urlParams.get('orderId');
    return orderId;
}

function displayOrderId(orderID) {
    const orderIdElement = document.getElementById('orderId');
    orderIdElement.textContent = orderId;
}

function clearSessionStorage() {
 const cache = window.localStorage;
 cache.clear();
}