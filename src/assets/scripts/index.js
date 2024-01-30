let i;

localStorage.removeItem("noobyone-cheat");

const html = document.documentElement;
const content = document.getElementsByTagName("iframe")[0];
const main = document.getElementsByTagName("main")[0];

function toggleRootClass(className) {
	if (html.classList.contains(className)) {
		html.classList.remove(className);
		content.contentDocument.documentElement.classList.remove(className);
		localStorage.removeItem("noobyone-" + className);

		document.getElementById(className + "-input").checked = false;
	} else {
		html.classList.add(className);
		content.contentDocument.documentElement.classList.add(className);
		localStorage.setItem("noobyone-" + className, true);

		document.getElementById(className + "-input").checked = true;
	}
	updateContentHeight();
}
function loadSettings(target, fromRoot, ...classNames) {
	let className, storage;

	for (className of classNames) {
		storage = localStorage.getItem("noobyone-" + className);

		if (storage) {
			target.classList.add(className);

			if (fromRoot) {
				document.getElementById(className + "-input").checked = true;
			}
		}
	}
}

loadSettings(
	html,
	true,
	"lowercase-only",
	"dyslexia-font",
	"no-blurs",
	"no-animation",
);

const lowercaseInput = document.getElementById("lowercase-only-input");
const dyslexiaInput = document.getElementById("dyslexia-font-input");
const backdropBlurInput = document.getElementById("no-blurs-input");
const animationInput = document.getElementById("no-animation-input");

lowercaseInput.onchange = () => toggleRootClass("lowercase-only");
dyslexiaInput.onchange = () => toggleRootClass("dyslexia-font");
backdropBlurInput.onchange = () => toggleRootClass("no-blurs");
animationInput.onchange = () => {
	toggleRootClass("no-animation");
	setupMarquee();
};

function updateContentHeight() {
	content.height = 0;
	content.height = content.contentDocument.documentElement.scrollHeight;
}

content.onload = () => {
	main.classList.remove("loading");
	loadSettings(
		content.contentDocument.documentElement,
		false,
		"lowercase-only",
		"dyslexia-font",
		"no-blurs",
		"no-animation",
	);

	updateContentHeight();

	content.contentWindow.onunload = () => {
		main.classList.add("loading");
	};
};

const splashTexts = [
	"Blazingly fast 🚀⚡️🚀⚡️",
	"[object Object] :3",
	'console.log("Hello, world");',
	"Mentally f**ked by C and assembly.",
	"𝓪𝓮𝓼𝓽𝓱𝓮𝓽𝓲𝓬𝓪𝓵𝓵𝔂 stupid",
	"🤓☝️",
	"👍",
	"Super idol 的笑容 都沒你的甜 八月正午的陽光 都沒你耀眼 熱愛105度的你 滴滴清純的蒸餾水 💦",
	"Dame tu cosita 👽 ah 👽 ah 👽, Dame tu cosita 👽 ah... 👽 <strong>ay?</strong> 👽",
	"whoopa gangnam style 🕶️",
	"☝️ what does the fox say? 🦊🦊",
	"chipi chipi chapa chapa 🐱 dubi dubi daba daba 🐱 magico mi dubi dubi boom 💥 boom 💥 boom 💥 boom 🐱",
	"<a href='https://mypsd.dev' target='_blank'>mypsd.dev</a> cringe 🤮",
	"uwu ♡ ฅ(^•⩊•^)ฅ ♡",
	"Love you all 💗",
	"*marquee go brrr*",
	"MAMAAAAAA!?!?",
	"Fuck the wars.",
	"Imagine the world where everyone gives the other respect; it would be so awesome! :)",
	"Inspired by *holy cow, so many sites out there*",
];

document
	.getElementById("splash-message")
	.getElementsByTagName("p")[0].innerHTML =
	splashTexts[Math.floor(Math.random() * splashTexts.length)];

const clock = document.getElementById("clock");
const secondHand = document.getElementById("second-hand");
const minuteHand = document.getElementById("minute-hand");
const hourHand = document.getElementById("hour-hand");

let songIndex = 0;

const songsURI = [
	{
		title: "fukashigi no carte",
		artist: "Mockingbird",
		src: "https://files.catbox.moe/gjrekv.mp3",
	},
];

const musicTitle = document.getElementById("music-title");

const playBtn = document.getElementById("pp-btn");
playBtn.onclick = playMusic;

let music, played, currentSong;

const volumeSlider = document.getElementById("audio-volume");
volumeSlider.onchange = (e) => {
	e.preventDefault();
	music.volume = +e.target.value;
};

newMusic();

const nextBtn = document.getElementById("next-btn");
nextBtn.onclick = nextMusic;

const prevBtn = document.getElementById("prev-btn");
prevBtn.onclick = previousMusic;

const loopBtn = document.getElementById("loop-btn");
loopBtn.onclick = () => {
	music.loop = !music.loop;

	if (music.loop) {
		loopBtn.classList.add("loop");
		loopBtn.title = "Unloop";
	} else {
		loopBtn.classList.remove("loop");
		loopBtn.title = "Loop";
	}
};

function newMusic() {
	if (played) {
		music.pause();
		played = undefined;
	}
	currentSong = songsURI[songIndex];

	music = new Audio(currentSong.src);
	music.muted = false;
	music.volume = volumeSlider.value;

	music.onended = (e) => {
		if (!e.target.loop) nextMusic();
	};
}
function previousMusic() {
	if (songIndex <= 0) songIndex = songsURI.length - 1;
	else songIndex--;

	newMusic();
	playMusic();
}
function nextMusic() {
	if (songIndex + 1 >= songsURI.length) songIndex = 0;
	else songIndex++;

	newMusic();
	playMusic();
}
function playMusic() {
	if (!played) {
		played = music.play();
		playBtn.classList.add("playing");

		musicTitle.innerText = `${currentSong.title} - ${currentSong.artist}`;
	} else {
		if (music.paused) {
			music.play();
			playBtn.classList.add("playing");
			playBtn.title = "Pause";
		} else {
			music.pause();
			playBtn.classList.remove("playing");
			playBtn.title = "Play";
		}
	}
}

window.addEventListener("keypress", (e) => {
	if (e.code === "Space") playMusic();
});

const muteBtn = document.getElementById("mute-btn");
muteBtn.onclick = () => {
	music.muted = !music.muted;

	if (music.muted) {
		muteBtn.classList.add("muted");
		muteBtn.title = "Unmute";
		volumeSlider.disabled = true;
	} else {
		muteBtn.classList.remove("muted");
		muteBtn.title = "Mute";
		volumeSlider.disabled = false;
	}
};

const systemInfo = document.getElementById("system-info");
const ua = navigator.userAgent;

let regExecuted;

if ((regExecuted = /Edg\/([\d|\.]+)/.exec(ua))) {
	systemInfo.innerHTML += "<br>browser: Edge " + regExecuted[1];
} else if ((regExecuted = /OPR\/([\d|\.]+)/.exec(ua))) {
	systemInfo.innerHTML += "<br>browser: Opera " + regExecuted[1];
} else if ((regExecuted = /Firefox\/([\d|\.]+)/.exec(ua))) {
	systemInfo.innerHTML += "<br>browser: Firefox " + regExecuted[1];
} else if ((regExecuted = /SamsungBrowser\/([\d|\.]+)/.exec(ua))) {
	systemInfo.innerHTML += "<br>browser: Samsung Internet " + regExecuted[1];
} else if ((regExecuted = /Chrome\/([\d|\.]+)/.exec(ua))) {
	systemInfo.innerHTML += "<br>browser: Chrome " + regExecuted[1];
} else {
	regExecuted = /[\d|\.]+/;
	systemInfo.innerHTML += "<br>browser: Safari " + regExecuted[0];
}

if (ua.includes("Mobile")) {
	systemInfo.innerHTML += "<br>mobile: true";
} else {
	systemInfo.innerHTML += "<br>mobile: false";
	onresize = updateContentHeight;
}

function enterCheat(...cheats) {
	let cheat,
		obj = {};

	for (cheat of cheats) {
		obj[cheat] = true;
	}

	localStorage.setItem("noobyone-cheat", JSON.stringify(obj));

	console.log(`Cheat(s) entered.`);
	console.table(obj);
}

const marquees = document.getElementsByClassName("marquee");
let marquee;

function setupMarquee() {
	for (i = 0; i < marquees.length; i++) {
		marquee = marquees[i];
		marquee.style.setProperty(
			"--multiplier",
			(marquee.parentElement.offsetWidth * 2) / marquee.offsetWidth,
		);
		marquee.parentElement.classList.add("marquee-parent");
	}
}
setupMarquee();

let dmy, seconds, minutes;

setInterval(() => {
	dmy = new Date();

	seconds = dmy.getSeconds();
	secondHand.style.setProperty(
		"--rotate",
		(seconds + dmy.getMilliseconds() / 1000) * 6 + "deg",
	);

	minutes = dmy.getMinutes();
	minuteHand.style.setProperty(
		"--rotate",
		(minutes + seconds / 60) * 6 + "deg",
	);

	hourHand.style.setProperty(
		"--rotate",
		(dmy.getHours() - 12 + minutes / 60) * 30 + "deg",
	);

	document.getElementById("reloadIframe").onclick = () => {
		content.contentWindow.location.reload();
	};
}, 40);
