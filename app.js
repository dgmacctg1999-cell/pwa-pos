// Replace with your Apps Script deployed web app URL
const API_URL = "https://script.google.com/macros/s/AKfycbwAW2WAk3fZLTF2GCoEj-iwCdFYjZsL7sj1Mkh8boYQ3PD7wETY75MUk8MkJUsxIHJ4/exec";


async function sendToAPI(action, data) {
const payload = { action, data };


try {
const res = await fetch(API_URL, {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify(payload)
});


const json = await res.json();
document.getElementById("status").innerText = JSON.stringify(json);
return json;


} catch (err) {
saveOffline(action, data);
document.getElementById("status").innerText = "Saved offline. Will sync later.";
}
}


// ------------------ Sale ------------------
function submitSale() {
const data = {
date: document.getElementById("sale-date").value,
invoiceNo: document.getElementById("sale-invoice").value,
customerID: document.getElementById("sale-cust").value,
totalAmount: Number(document.getElementById("sale-total").value),
cashier: "Admin"
};


sendToAPI("addSale", data);
}


// ------------------ Customer ------------------
function submitCustomer() {
const data = {
name: document.getElementById("cust-name").value,
contact: document.getElementById("cust-contact").value,
type: document.getElementById("cust-type").value,
user: "Admin"
};


sendToAPI("addCustomer", data);
}


// ------------------ Offline Queue ------------------
function saveOffline(action, data) {
const queue = JSON.parse(localStorage.getItem("queue") || "[]");
queue.push({ action, data });
localStorage.setItem("queue", JSON.stringify(queue));
}


async function syncOffline() {
const queue = JSON.parse(localStorage.getItem("queue") || "[]");
if (queue.length === 0) return;


for (let item of queue) {
await sendToAPI(item.action, item.data);
}


localStorage.removeItem("queue");
}


window.addEventListener("online", syncOffline);


// Register Service Worker\if ("serviceWorker" in navigator) {
navigator.serviceWorker.register("sw.js");
}