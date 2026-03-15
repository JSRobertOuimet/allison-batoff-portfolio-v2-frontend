export function disableImageInteractions() {
    const preventContextMenu = (event: Event) => {
        const target = event.target;

        if (!(target instanceof Element) || !target.closest("img")) {
            return;
        }

        event.preventDefault();
    };

    const preventDrag = (event: Event) => {
        const target = event.target;

        if (!(target instanceof Element) || !target.closest("img")) {
            return;
        }

        event.preventDefault();
    };

    document.addEventListener("contextmenu", preventContextMenu);
    document.addEventListener("dragstart", preventDrag);

    return () => {
        document.removeEventListener("contextmenu", preventContextMenu);
        document.removeEventListener("dragstart", preventDrag);
    };
}
