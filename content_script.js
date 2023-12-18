"use strict"

function findButtonAndClick(maxR = 50) {
    console.log("procurando btn", maxR);

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
    console.log("procurando adiv", maxR);
    const div = document.querySelector(".video-ads.ytp-ad-module")

    if (!div && maxR > 0) {
        setTimeout(() => {
            return findAdDiv(maxR - 1)
        }, 150);
    }

    return div
}

function init() {
    console.log("inicio");
    const AdDiv = findAdDiv()

    const observer = new MutationObserver(() => {
        if (verifyChange()) {
            console.log('Observou e vai clicar')
            const button = findButtonAndClick(20)

            try {
                button.click()
            } catch (e) {
                console.log("Erro ao clicar no botão de anúncio")
            }
        }
    })

    // Define as opções do MutationObserver
    const config = { attributes: true, childList: true, subtree: true }

    // Inicia a observação do elemento HTML com as opções definidas
    observer.observe(AdDiv, config)
    console.log("fim");

}

if (document.readyState == "loading") document.addEventListener('DOMContentLoaded', init)
else init()