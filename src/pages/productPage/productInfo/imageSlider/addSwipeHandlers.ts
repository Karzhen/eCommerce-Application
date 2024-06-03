export default function addSwipeHandlers(
  element: Element,
  nextImage: { (): void; (): void },
  prevImage: { (): void; (): void },
) {
  let startX: number;
  let isDragging = false;
  let startMouseX: number;
  let isMouseDragging = false;

  function handleTouchStart(event: TouchEvent) {
    startX = event.touches[0].clientX;
    isDragging = true;
  }

  function handleTouchMove(event: TouchEvent) {
    if (!isDragging) return;
    const currentX = event.touches[0].clientX;
    const deltaX = currentX - startX;
    if (deltaX > 50) {
      prevImage();
      isDragging = false;
    } else if (deltaX < -50) {
      nextImage();
      isDragging = false;
    }
  }

  function handleTouchEnd() {
    isDragging = false;
  }

  function handleMouseDown(event: MouseEvent) {
    startMouseX = event.clientX;
    isMouseDragging = true;
  }

  function handleMouseMove(event: MouseEvent) {
    if (!isMouseDragging) return;
    const currentMouseX = event.clientX;
    const deltaX = currentMouseX - startMouseX;
    if (deltaX > 50) {
      prevImage();
      isMouseDragging = false;
    } else if (deltaX < -50) {
      nextImage();
      isMouseDragging = false;
    }
  }

  function handleMouseUp() {
    isMouseDragging = false;
  }

  element.addEventListener('touchstart', handleTouchStart as EventListener);
  element.addEventListener('touchmove', handleTouchMove as EventListener);
  element.addEventListener('touchend', handleTouchEnd);
  element.addEventListener('mousedown', handleMouseDown as EventListener);
  element.addEventListener('mousemove', handleMouseMove as EventListener);
  element.addEventListener('mouseup', handleMouseUp);
  element.addEventListener('mouseleave', handleMouseUp);
}
