function displayPhotoThumbnail(photoIndex, photoId, photoSrc, photoAlt) {
    return `
        <img role="button" 
            onclick="openDialogPhotoOverlay('${photoIndex}')" 
            onkeyup="pressKeyEnter(event, '${photoIndex}')" 
            class="ImagePhotoGallery" 
            tabindex="0"
            id="${photoId}"
            src="${photoSrc}"
            alt="${photoAlt}"
        />`;
}

function displayPhotoOverlay(currentPhotoIndex, photoSrc, photoAlt, photoDescription, photoCopyright, photoNr) {
    return `
        <header role="banner">
            <h3>${photoDescription}</h3>
            <button onclick="closeDialogPhotoOverlay()">
                <img 
                    src="./assets/icons/close.svg" 
                    alt="X-Symbol zum Schließen des Dialogfensters"/>
            </button>
        </header>
        <figure role="main">
            <img class="ImagePhotoOverlay"
                src="${photoSrc}"
                alt="${photoAlt}"
            <figcaption role="contentinfo">
                <small class="figcaption">${photoCopyright}</small>
            </figcaption>
        </figure>
        <footer id="#DialogFooter" 
            onkeyup="pressKeyArrow(event, ${currentPhotoIndex})" 
            tabindex="-1">
            <button onclick="renderPreviousPhotoOverlay(${currentPhotoIndex})"
                class="ButtonReverse">
                <img 
                    src="./assets/icons/arrow-left.svg" 
                    alt="Pfeil-Symbol nach links, um zum vorherigen Bild zu gelangen."/>
            </button>
            <span class="Width135">${photoNr}</span>
            <button onclick="renderNextPhotoOverlay(${currentPhotoIndex})">
                <img 
                    src="./assets/icons/arrow-right.svg" 
                    alt="Pfeil-Symbol nach rechts, um zum nächsten Bild zu gelangen."/>
            </button>
        </footer>`;
}