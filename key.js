const inp = document.getElementById("upld");
const winc = document.getElementById("newWin");
inp.addEventListener('change', p);

function p() {
    const o = this.files[0];
    const r = new FileReader();
    r.readAsDataURL(o);
    r.onload = function() {
        const t = r.result;
        const i = document.getElementById("prev");
        i.setAttribute('src', t)
    }
}