"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const profile_cards = document.getElementById("profile-cards");
const profile_table = document.getElementById("profile-table");
const profile_count = 5;
const api_URL = `https://randomuser.me/api/?results=${profile_count}`;
const button = document.getElementById("fetch-btn");
// const table: HTMLElement | null = document.querySelector("table");
const table = document.createElement("table");
main();
function fetchData() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(api_URL);
        const data = yield response.json();
        return data;
    });
}
function returnNames(data) {
    const names = [];
    for (const person of data.results) {
        names.push(`${person.name.first} ${person.name.last}`);
    }
    return names;
}
function returnEmail(data) {
    const emails = [];
    for (const person of data.results) {
        emails.push(`${person.email}`);
    }
    return emails;
}
function returnProfilePics(data) {
    const pics = [];
    for (const person of data.results) {
        pics.push(`${person.picture.large}`);
    }
    return pics;
}
function createCard(pic, name, email) {
    let div = document.createElement("div");
    div.className = "profile-card";
    let img = document.createElement("img");
    let h3 = document.createElement("h3");
    let h4 = document.createElement("h4");
    img.src = pic;
    h3.textContent = name;
    h4.textContent = email;
    div.appendChild(img);
    div.appendChild(h3);
    div.appendChild(h4);
    profile_cards === null || profile_cards === void 0 ? void 0 : profile_cards.appendChild(div);
}
function createTableHeader() {
    let row = document.createElement("tr");
    let th1 = document.createElement("th");
    let th2 = document.createElement("th");
    th1.textContent = "Name";
    th2.textContent = "Email";
    row.appendChild(th1);
    row.appendChild(th2);
    table.appendChild(row);
}
function createTable(name, email) {
    let row = document.createElement("tr");
    let data1 = document.createElement("td");
    let data2 = document.createElement("td");
    data1.textContent = name;
    data2.textContent = email;
    row.appendChild(data1);
    row.appendChild(data2);
    table === null || table === void 0 ? void 0 : table.appendChild(row);
    profile_table === null || profile_table === void 0 ? void 0 : profile_table.append(table);
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield fetchData();
            let pictures = returnProfilePics(data);
            let names = returnNames(data);
            let emails = returnEmail(data);
            createTableHeader();
            for (let i = 0; i < profile_count; i++) {
                createCard(pictures[i], names[i], emails[i]);
                createTable(names[i], emails[i]);
            }
        }
        catch (error) {
            alert(error);
        }
    });
}
button === null || button === void 0 ? void 0 : button.addEventListener("click", () => {
    if (profile_cards) {
        profile_cards.textContent = "";
    }
    if (table) {
        table.textContent = "";
    }
    main();
});
