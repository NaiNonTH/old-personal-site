const leaderboardOutput = document.getElementById("leaderboard");
let localLeaderboard =
	JSON.parse(localStorage.getItem("noobyone-destinyleaderboard")) || [];
let i;

if (localLeaderboard.length == 0) {
	leaderboardOutput.innerHTML = `<tr><td style="text-align: center;" colspan="4">No saved scores</td></tr>`;
} else {
	for (i = 0; i < localLeaderboard.length; i++) {
		let stat = localLeaderboard[i];
		const date = new Date(stat.date);

		const row = document.createElement("tr");
		row.innerHTML = `
        <td>
            ${date.getDate().toString().padStart(2, "0")}/${(
							date.getMonth() + 1
						)
							.toString()
							.padStart(2, "0")}/${date.getFullYear()} - ${date
							.getHours()
							.toString()
							.padStart(2, "0")}:${date
							.getMinutes()
							.toString()
							.padStart(2, "0")}:${date
							.getSeconds()
							.toString()
							.padStart(2, "0")}
        </td>
        <td>${stat.status}</td>
        <td>${stat.clicks}</td>
        <td>${stat.cheats}</td>
        `;

		const deleteBtn = document.createElement("button");
		deleteBtn.title = "Delete this score";
		deleteBtn.addEventListener("click", (e) => {
			localLeaderboard = localLeaderboard.filter((n) => n.id != stat.id);

			localStorage.setItem(
				"noobyone-destinyleaderboard",
				JSON.stringify(localLeaderboard),
			);

			row.remove();
		});

		row.appendChild(deleteBtn);
		leaderboardOutput.appendChild(row);
	}
}
