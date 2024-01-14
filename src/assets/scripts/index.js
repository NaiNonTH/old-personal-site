localStorage.removeItem("noobyone-cheat");

const html = document.documentElement;
const content = document.getElementsByTagName("iframe")[0];

function toggleRootClass(className) {
	if (html.classList.contains(className)) {
		html.classList.remove(className);
		content.contentDocument.documentElement.classList.remove(className);
		localStorage.removeItem("noobyone-" + className);
	} else {
		html.classList.add(className);
		content.contentDocument.documentElement.classList.add(className);
		localStorage.setItem("noobyone-" + className, true);
	}
	updateContentHeight();
}
function loadSettings(target, ...classNames) {
	let className, storage;

	for (className of classNames) {
		storage = localStorage.getItem("noobyone-" + className);

		if (storage) {
			target.classList.add(className);
		}
	}
}

loadSettings(html, "lowercase-only", "dyslexia-font", "no-blurs");

const lowercaseBtn = document.getElementById("lowercase-only-btn");
const dyslexiaBtn = document.getElementById("dyslexia-font-btn");
const backdropBlurBtn = document.getElementById("no-blurs-btn");

lowercaseBtn.onclick = () => toggleRootClass("lowercase-only");
dyslexiaBtn.onclick = () => toggleRootClass("dyslexia-font");
backdropBlurBtn.onclick = () => toggleRootClass("no-blurs");

function updateContentHeight() {
	content.height = 0;
	content.height = content.contentDocument.documentElement.scrollHeight;
}

content.onload = () => {
	document.getElementsByTagName("main")[0].classList.remove("loading");
	loadSettings(
		content.contentDocument.documentElement,
		"lowercase-only",
		"dyslexia-font",
		"no-blurs",
	);

	updateContentHeight();

	let i;
	const allElement =
		content.contentDocument.body.getElementsByTagName("section");

	for (i = 0; i < allElement.length; i++) {
		allElement[i].style.setProperty("--delay", i * 0.1 + "s");
	}

	content.contentDocument.body.classList.add("loaded");

	content.contentWindow.onunload = () => {
		document.getElementsByTagName("main")[0].classList.add("loading");
	};
};
onresize = () => updateContentHeight();

const splashTexts = [
	"Blazingly fast 🚀⚡️🚀⚡️",
	"[object Object] :3",
	"Svelte > React",
	'console.log("Hello, world");',
	"Mentally f**ked by C and assembly.",
	"Certified Micr*s*ft bitch",
	"I wanna be a cute lil' asian girl but god and my fat-ass wouldn't let me :(",
	"This is made to be the most random shit happen on the internet.",
	"fuck myself. /lh",
	"𝓪𝓮𝓼𝓽𝓱𝓮𝓽𝓲𝓬𝓪𝓵𝓵𝔂 stupid",
	"🤓☝️",
	"👍",
	"Super idol 的笑容 都沒你的甜 八月正午的陽光 都沒你耀眼 熱愛105度的你 滴滴清純的蒸餾水 💦 /c",
	"Dame tu cosita 👽 ah 👽 ah 👽, Dame tu cosita 👽 ah... 👽 <strong>ay?</strong> 👽 /c",
	"whoopa gangnam style 🕶️",
	"☝️ what does the fox say? 🦊🦊",
	"ถ้าฟ้าเสียตัว ฟ้าต้องได้เป็นแอร์ ✈️ /c",
	"chipi chipi chapa chapa 🐱 dubi dubi daba daba 🐱 magico mi dubi dubi boom 💥 boom 💥 boom 💥 boom 🐱 /c",
	"<a href='https://mypsd.dev' target='_blank'>mypsd.dev</a> cringe 🤮",
	"uwu ♡ (^•⩊•^) ♡",
	"Love you all 💗 /nx",
	"*marquee go brrr*",
	"MAMAAAAAA!?!?",
	"Fuck the wars.",
	"Imagine the world where everyone gives the other respect; It would be so awesome! :)",
	"Inspired by <a href='https://cinni.net'>cinni.net</a>, <a href='https://lostlove.neocities.org'>lunospace</a>, and <a href='https://shishka.neocities.org/nofollow'>No follow</a>.",
];

document
	.getElementById("splash-message")
	.getElementsByTagName("marquee")[0].innerHTML =
	splashTexts[Math.floor(Math.random() * splashTexts.length)];

const allMarquee = document.getElementsByTagName("marquee");

for (i = 0; i < allMarquee.length; i++) {
	allMarquee[i].onmouseenter = (e) => e.target.stop();
	allMarquee[i].onmouseleave = (e) => e.target.start();
}

const clock = document.getElementById("clock");
const secondHand = document.getElementById("second-hand");
const minuteHand = document.getElementById("minute-hand");
const hourHand = document.getElementById("hour-hand");

let dmy, seconds, minutes;

dmy = new Date();

seconds = dmy.getSeconds();
secondHand.style.setProperty(
	"--rotate",
	(seconds + dmy.getMilliseconds() / 1000) * 6 + "deg",
);

minutes = dmy.getMinutes();
minuteHand.style.setProperty("--rotate", (minutes + seconds / 60) * 6 + "deg");

hourHand.style.setProperty(
	"--rotate",
	(dmy.getHours() - 12 + minutes / 60) * 30 + "deg",
);
