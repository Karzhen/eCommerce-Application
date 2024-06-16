export default function removeContainer(elementId: string) {
  const idEndsWith = `-${elementId}`;
  const elementToRemove = document.querySelector(`[id$="${idEndsWith}"]`);
  if (elementToRemove) {
    elementToRemove.remove();
  }
}
