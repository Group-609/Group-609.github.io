window.document.addEventListener('myCustomEvent', handleEvent, false)
function handleEvent(e) {
  console.log(e.detail)
}