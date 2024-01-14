let playerX,
    crushX,
    cuckX,
    playerY,
    crushY,
    cuckY,
    player,
    cuck,
    crush,
    playerWins,
    cuckWins,
    ended = false,
    inProgress = false,
    firstGame = true,
    
    id = "",
    date,
    status,
    clicks = 0,
    cheats;

const field = document.getElementById("field");
const clickOutput = document.getElementById("click");

field.addEventListener("click", (evt) => {
if (inProgress || ended) return;

inProgress = true;

playerX = evt.clientX - evt.currentTarget.offsetLeft;
playerY = evt.clientY - evt.currentTarget.offsetTop;

cheats = JSON.parse(localStorage.getItem("noobyone-cheat"));

crushX =
    cheats?.beRich && !firstGame
    ? playerX - 10
    : Math.floor(Math.random() * evt.currentTarget.offsetWidth);
crushY =
    cheats?.beRich && !firstGame
    ? playerY - 10
    : Math.floor(Math.random() * evt.currentTarget.offsetHeight);

cuckX =
    cheats?.ntr && !firstGame
        ? crushX - 10
        : Math.floor(Math.random() * evt.currentTarget.offsetWidth);
cuckY = 
    cheats?.ntr && !firstGame
        ? crushY - 10
        : Math.floor(Math.random() * evt.currentTarget.offsetHeight);

if (firstGame) {
    player = document.createElement("span");
    player.className = "player";

    crush = document.createElement("span");
    crush.className = "crush";

    cuck = document.createElement("span");
    cuck.className = "cuck";

    field.append(player, crush, cuck);
    firstGame = false;
}

player.style.left = playerX + "px";
player.style.top = playerY + "px";

cuck.style.left = cuckX + "px";
cuck.style.top = cuckY + "px";

crush.style.left = crushX + "px";
crush.style.top = crushY + "px";

clicks++;

clickOutput.innerText = clicks;

setTimeout(() => {
    inProgress = false;

    playerWins =
        Math.abs(crushX - playerX) <= 25 &&
        Math.abs(crushY - playerY) <= 25;
    cuckWins =
        Math.abs(crushX - cuckX) <= 25 && Math.abs(crushY - cuckY) <= 25;

    if (playerWins && cuckWins) {
        ended = true;
        field.classList.add("ultimate-win");
        clickOutput.innerText = "WHAT ARE THE CHANCES????";

        status = "U";
    } else if (playerWins) {
        ended = true;
        field.classList.add("win");
        clickOutput.innerText = "You win!";

        status = "W";
    } else if (cuckWins) {
        ended = true;
        field.classList.add("lose");
        clickOutput.innerText = "You lose!";

        status = "L";
    }

    if (ended) {
        const ascii = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
        let i;

        for (i = 0; i < 8; i++) {
            id += ascii[Math.floor(Math.random() * ascii.length)];
        }

        cheats = Boolean(cheats);
        date = new Date();


        const localLeaderboard =
            JSON.parse(localStorage.getItem("noobyone-destinyleaderboard")) ||
            [];

        localLeaderboard.push({ id, date, status, clicks, cheats });

        localStorage.setItem(
            "noobyone-destinyleaderboard",
            JSON.stringify(localLeaderboard),
        );
    }
}, 350);
});
