function submit() {
    localStorage.clear();
    var table = document.getElementById("tg");
    var rowCount = table.getElementsByTagName("tr").length;
    let result = "";

    let localStorageValues = [];

    for (let j = 6; j < rowCount + 5; j++) {
        let NAME, RANK, AP, SUPPORTS;

        for (let a = 0; a < 4; a++) {
            let id = `s${j}${a}`;
            let element = document.getElementById(id);
            if (element) {
                switch (a) {
                    case 0: NAME = element.value; break;
                    case 1: RANK = element.value; break;
                    case 2: AP = parseFloat(element.value) || 0; break;
                    case 3: SUPPORTS = parseFloat(element.value) || 0; break;
                }
            }
        }

        // Determine Tier and Rewards based on Supports and AP
        let tier = "";
        let rewards = "";
        let multiplierIncrease = 0;

        if (SUPPORTS >= 10 && AP >= 400) {
            tier = "Seraph";
            rewards = "100 Points, 40 RP, Multiplier Increase of 1, Exclusive benefits";
            multiplierIncrease = 1;
        } else if (SUPPORTS >= 7 && AP >= 300) {
            tier = "Guardian";
            rewards = "75 Points, 25 RP, Multiplier Increase of 0.5, Exclusive benefits";
            multiplierIncrease = 0.5;
        } else if (SUPPORTS >= 4 && AP >= 200) {
            tier = "Custodian";
            rewards = "50 Points, 15 RP, Multiplier Increase of 0.25, Exclusive benefits";
            multiplierIncrease = 0.25;
        } else if (SUPPORTS >= 2 && AP >= 100) {
            tier = "Ally";
            rewards = "35 Points, 10 RP";
        } else if (SUPPORTS >= 1 && AP >= 50) {
            tier = "Helper";
            rewards = "20 Points, 5 RP";
        } else {
            tier = "No Tier";
            rewards = "No Rewards";
        }

        // Generate the output
        let data = `${NAME} (${RANK})\n`;
        data += `AP: ${AP}\n`;
        data += `Supports: ${SUPPORTS}\n\n`;
        data += `Resulting Tier: ${tier}\n`;
        data += `Rewards: ${rewards}\n\n`;
        data += `=================================\n`;

        localStorage.setItem(j, data);
    }

    for (let b = 1; b <= 87; b++) {
        let value = localStorage.getItem(b);
        if (value !== null) {
            localStorageValues.push(value);
        }
    }

    result = localStorageValues.reverse().join("");

    const textToBLOB = new Blob([result], { type: 'text/plain' });
    const sFileName = 'Tier_Rewards_Record.txt';
    let newLink = document.createElement("a");
    newLink.download = sFileName;
    newLink.href = window.URL.createObjectURL(textToBLOB);
    newLink.style.display = "none";
    document.body.appendChild(newLink);
    newLink.click();
}

function handleRowFocus(event) {
    const row = event.target.closest('tr');
    row.classList.add('active-row');
}

function handleRowBlur(event) {
    const row = event.target.closest('tr');
    row.classList.remove('active-row');
}

function addRowFocusListeners() {
    const table = document.getElementById('tg');

    if (!table) {
        console.error("Table with id 'tg' not found!");
        return;
    }

    const inputs = table.querySelectorAll('input');

    inputs.forEach(input => {
        input.removeEventListener('focus', handleRowFocus);
        input.removeEventListener('blur', handleRowBlur);

        input.addEventListener('focus', handleRowFocus);
        input.addEventListener('blur', handleRowBlur);
    });
}

window.addEventListener('load', addRowFocusListeners);

function more() {
    var table = document.getElementById("tg");
    var rowCount = table.getElementsByTagName("tr").length;
    var id = rowCount + 5;

    var row = table.insertRow(1);
    row.id = id;

    for (let i = 0; i < 4; i++) {
        var cell = row.insertCell(i);
        cell.id = i;
        cell.innerHTML = `<input type="text" id="s${id}${i}" style="color: white; width: 65%; background-color: transparent; border: 0px;">`;
    }
    addRowFocusListeners();
}


