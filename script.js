const DIALOG_REF = document.getElementById("#DialogPhotoOverlay");
let foldernames = [];
let photos_array = [];
let photo_overlay = document.getElementById("#PhotoOverlay");

/** 
 * Initialer Aufruf beim Starten der Seite
 */
function init() {
    getPhotofoldername();
    getAllPhotoData();
    renderPhotoThumbnail();
}

/** 
 * Photofoldername über ID erhalten
 */
function getPhotofoldername() {
    const FOLDER_LIST = document.getElementsByClassName("ImageContainerPhotoGallery");
    for (let i = 0; i < FOLDER_LIST.length; i++) {
        foldernames.push(FOLDER_LIST[i].id);
    }
}
function getAllPhotoData() {
    for (let i = 0; i < foldernames.length; i++) {
        getPhotoDataPerFolder(foldernames[i]);  
    }
}

function getPhotoDataPerFolder(foldername) {
    let photos_per_folder = All_PHOTOS[foldername];

    for (let i = 0; i < photos_per_folder.length; i++) {
        let photo_id = foldername + "-" + (i+1);
        let photo_src = "./assets/img/" + foldername + "/" + photos_per_folder[i].filename;
        let photo_alt = "Foto: " + photos_per_folder[i].description;
        let photo_description = photos_per_folder[i].description;
        let photo_copyright = "&#169 " + photos_per_folder[i].year + " " + photos_per_folder[i].copyright;
        let photo_nr = photos_per_folder[i].folder + ":<br>" + (i+1) + " von " + photos_per_folder.length;

        let photo_data =[{photoIndex:0}, {Foldername:foldername}, {photoId:photo_id}, {photoSrc:photo_src}, {photoAlt:photo_alt}, {photoDescription:photo_description}, {photoCopyright:photo_copyright}, {photoNr:photo_nr}];
        photos_array.push(photo_data);
    }
}

function renderPhotoThumbnail() {
    let photos_thumbnail_container_per_folder = "";
    for (let i = 0; i < photos_array.length; i++) {
        photos_array[i][0]['photoIndex'] += i, 
        photos_thumbnail_container_per_folder = document.getElementById(photos_array[i][1]['Foldername']); 
        photos_thumbnail_container_per_folder.innerHTML += 
            displayPhotoThumbnail(
                photos_array[i][0]['photoIndex'], 
                photos_array[i][2]['photoId'], 
                photos_array[i][3]['photoSrc'], 
                photos_array[i][4]['photoAlt']
            ); 
    }
}

function closeDialogPhotoOverlay() {
    DIALOG_REF.close();
}

function openDialogPhotoOverlay(photoIndex) {
    DIALOG_REF.showModal();
    renderPhotoOverlay(photoIndex);
}

function renderPhotoOverlay(photoIndex) {
    photo_overlay.innerHTML = "";
    photo_overlay.innerHTML = displayPhotoOverlay(
        photos_array[photoIndex][0]['photoIndex'],
        photos_array[photoIndex][3]['photoSrc'],
        photos_array[photoIndex][4]['photoAlt'], 
        photos_array[photoIndex][5]['photoDescription'], 
        photos_array[photoIndex][6]['photoCopyright'], 
        photos_array[photoIndex][7]['photoNr']
    );
    setFocusOnDialogFooter();
}

function renderPreviousPhotoOverlay(currentPhotoIndex) {
    let previousPhotoIndex = (currentPhotoIndex == 0) ? (photos_array.length - 1) : (currentPhotoIndex - 1);
    renderPhotoOverlay(previousPhotoIndex);
}

function renderNextPhotoOverlay(currentPhotoIndex) {
    let nextPhotoIndex = (currentPhotoIndex == (photos_array.length - 1)) ? 0 : (currentPhotoIndex + 1);
    renderPhotoOverlay(nextPhotoIndex);
}

function pressKeyEnter(event, photoIndex) {
    let key = event.key;
    if (key == "Enter" || key == " ") {
        openDialogPhotoOverlay(photoIndex);
    }
}

function pressKeyArrow(event, photoIndex) {
    let key = event.key;
    if (key == "ArrowLeft") {
        renderPreviousPhotoOverlay(photoIndex)
    } else if (key == "ArrowRight") {
        renderNextPhotoOverlay(photoIndex)
    };
}

function setFocusOnDialogFooter() {
    const FOCUS = document.getElementById("#DialogFooter");
    FOCUS.focus();
}