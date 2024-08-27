"use strict";

function findButtonToSkip(maxR = 30) {
  let button = document.querySelector(".ytp-skip-ad-button");

  if (!button && maxR > 0) {
    setTimeout(() => {
      return findButtonToSkip(maxR - 1);
    }, 150);
  }

  return button;
}

function goToTheFinal() {
  const ad = document.querySelector(".video-stream.html5-main-video");
  ad.playbackRate += 15;
  ad.muted = true;
  ad.currentTime = ad.duration;
}

function isAdWithoutButton() {
  try {
    const adText = document.querySelector(".ytp-preview-ad__text");

    return adText.textContent == "O vídeo já vai começar";
  } catch {
    return null;
  }
}

function accelerateAds() {
  try {
    const ad = document.querySelector(".video-stream.html5-main-video");
    ad.playbackRate += 15;
    ad.muted = true;
  } catch {}
}

function verifyChange() {
  return document.URL.includes("watch?");
}

async function findAdDiv(maxR = 50) {
  let div = document.querySelector(".video-ads.ytp-ad-module");

  if (!div && maxR > 0) {
    await new Promise(resolve => setTimeout(resolve, 250));
    return findAdDiv(maxR - 1);
  }

  return div;
}

async function init() {
  const AdDiv = await findAdDiv();

  const observer = new MutationObserver(() => {
    if (verifyChange()) {
      if (isAdWithoutButton()) {
        accelerateAds();
      } else {
        const button = findButtonToSkip(20);

        if (button) {
          try {
            goToTheFinal();
          } catch (err) {
            console.log("Skip ads - error:", err);
          }
        }
      }
    }
  });

  const config = { attributes: true, childList: true, subtree: true };

  try {
    observer.observe(AdDiv, config);
  } catch {}
}

if (document.readyState == "loading")
  document.addEventListener("DOMContentLoaded", init);
else init();
