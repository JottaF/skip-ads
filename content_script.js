"use strict"

function findButtonAndClick(maxR = 50) {
    let button = document.querySelector(".ytp-ad-skip-button-modern.ytp-button")

    if (!button && maxR > 0) {
        setTimeout(() => {
           return findButtonAndClick(maxR - 1)
        }, 150);
    }

    return button
}

function verifyChange() {
    return document.URL.includes("watch?")
}

function findAdDiv(maxR = 50) {
    const div = document.querySelector(".video-ads.ytp-ad-module")

    if (!div && maxR > 0) {
        setTimeout(() => {
            return findAdDiv(maxR - 1)
        }, 150);
    }

    return div
}

function init() {
    const AdDiv = findAdDiv()

    const observer = new MutationObserver(() => {
        if (verifyChange()) {
            const button = findButtonAndClick(20)

            try {
                button.click()
            } catch {}
        }
    })

    const config = { attributes: true, childList: true, subtree: true }

    observer.observe(AdDiv, config)
}

if (document.readyState == "loading") document.addEventListener('DOMContentLoaded', init)
else init()