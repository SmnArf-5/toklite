const urlInput = document.getElementById("urlInput");
const submitBtn = document.getElementById("submitButton");
const clearBtn = document.getElementById("clearButton");
const errorMsg = document.getElementById("errorMessage");
const copyMsg = document.getElementById("copyMsg");
const inputToolSection = document.getElementById("inputToolSection");
const videoSection = document.getElementById("videoSection");
const videoEl = document.getElementById("tiktokVideo");

function copyExample() {
  const text = document.querySelector(".example-url").innerText;
  navigator.clipboard.writeText(text);
  copyMsg.style.display = "block";
  setTimeout(() => (copyMsg.style.display = "none"), 2000);
}

function stripParams(url) {
  if (!/^https?:\/\//.test(url)) url = "https://" + url;
  const a = document.createElement("a");
  a.href = url;
  return `${a.protocol}//${a.hostname}${a.pathname}`;
}

function processURL() {
  const url = urlInput.value.trim();
  errorMsg.textContent = "";

  if (!url) return (errorMsg.textContent = "Please enter a URL");
  if (!url.includes("tiktok.com")) return (errorMsg.textContent = "Please enter a TikTok URL");
  if (!url.includes("/video/")) return (errorMsg.textContent = "Invalid TikTok video URL");

  submitBtn.textContent = "Processing...";
  submitBtn.disabled = true;

  const cleaned = stripParams(url);
  const videoId = cleaned.split("/video/")[1];
  const videoSrc = `https://www.tikwm.com/video/media/play/${videoId}.mp4`;


  setTimeout(() => {
    videoEl.src = videoSrc;

    inputToolSection.style.display = "none";
    videoSection.style.display = "block";

    submitBtn.textContent = "Get Started";
    submitBtn.disabled = false;
  }, 800);
}

function clearForm() {
  urlInput.value = "";
  videoEl.src = "";
  errorMsg.textContent = "";

  inputToolSection.style.display = "block";
  videoSection.style.display = "none";
}

urlInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    processURL();
  }
});

urlInput.addEventListener("paste", () => setTimeout(processURL, 0));
