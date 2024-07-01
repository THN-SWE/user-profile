const profile_cards: HTMLElement | null =
  document.getElementById("profile-cards");
const profile_table: HTMLElement | null =
  document.getElementById("profile-table");
const profile_count: number = 5;
const api_URL = `https://randomuser.me/api/?results=${profile_count}`;
const button: HTMLElement | null = document.getElementById("fetch-btn");
// const table: HTMLElement | null = document.querySelector("table");
const table = document.createElement("table");


main();

async function fetchData(): Promise<any> {
  const response = await fetch(api_URL);
  const data = await response.json();
  return data;
}

function returnNames(data: any): string[] {
  const names: string[] = [];
  for (const person of data.results) {
    names.push(`${person.name.first} ${person.name.last}`);
  }
  return names;
}

function returnEmail(data: any): string[] {
  const emails: string[] = [];
  for (const person of data.results) {
    emails.push(`${person.email}`);
  }
  return emails;
}

function returnProfilePics(data: any) {
  const pics: string[] = [];
  for (const person of data.results) {
    pics.push(`${person.picture.large}`);
  }
  return pics;
}

function createCard(pic: string, name: string, email: string): void {
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

  profile_cards?.appendChild(div);
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
function createTable(name: string, email: string): void {
  let row = document.createElement("tr");
  let data1 = document.createElement("td");
  let data2 = document.createElement("td");

  data1.textContent = name;
  data2.textContent = email;

  row.appendChild(data1);
  row.appendChild(data2);

  table?.appendChild(row);

  profile_table?.append(table);
}

async function main() {
  try {
    const data = await fetchData();
    let pictures = returnProfilePics(data);
    let names = returnNames(data);
    let emails = returnEmail(data);

    createTableHeader();

    for (let i = 0; i < profile_count; i++) {
      createCard(pictures[i], names[i], emails[i]);
    
      createTable(names[i], emails[i]);
    }
  } catch (error) {
    alert(error);
  }
}

button?.addEventListener("click", () => {
  if (profile_cards) {
    profile_cards.textContent = "";
  }

   if(table){
    table.textContent = ""
   }
  main();
});
