export function disableImageInteractions() {
    const images = document.querySelectorAll("img");

    const preventContextMenu = (event: Event) => {
        event.preventDefault();
    };

    const preventDrag = (event: Event) => {
        event.preventDefault();
    };

    images.forEach((image) => {
        image.addEventListener("contextmenu", preventContextMenu);
        image.addEventListener("dragstart", preventDrag);
    });

    return () => {
        images.forEach((image) => {
            image.removeEventListener("contextmenu", preventContextMenu);
            image.removeEventListener("dragstart", preventDrag);
        });
    };
}