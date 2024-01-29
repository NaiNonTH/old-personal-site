const anchors = document.querySelectorAll("a");

anchors.forEach((anchor) => {
	if (
		anchor.parentElement.nodeName == "NAV" ||
		anchor.getAttribute("data-no-new-tab") != null
	) {
		anchor.onclick = (e) => {
			if (e.button != 0) {
				e.preventDefault();
				if (location.pathname.startsWith("/pages"))
					location.href = `${e.currentTarget.href}`;
				else document.getElementById("content").src = e.currentTarget.href;
			}
		};
		anchor.onauxclick = (e) => {
			e.preventDefault();
			if (location.pathname.startsWith("/pages"))
				location.href = `${e.currentTarget.href}`;
			else document.getElementById("content").src = e.currentTarget.href;
		};
		anchor.oncontextmenu = (e) => e.preventDefault();
	}
});
