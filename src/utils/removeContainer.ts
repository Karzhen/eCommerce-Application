export default function removeContainer(elementId: string) {
  const idEndsWith = `-${elementId}`;
  console.log(`[id$="${idEndsWith}"]`);
  const elementToRemove = document.querySelector(`[id$="${idEndsWith}"]`);
  if (elementToRemove) {
    elementToRemove.remove();
  }
}
