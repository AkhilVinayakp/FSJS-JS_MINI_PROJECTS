
// let divelement = document.getElementById('e1');
// let p = document.getElementById('e2');
// divelement.addEventListener("wheel", alert('wheel'));
// let v  = 0;
// p.textContent = v;
window.addEventListener("wheel", event => {
    const delta = Math.sign(event.deltaY);
    console.info(delta);
});