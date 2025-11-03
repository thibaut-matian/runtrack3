
const footer = document.querySelector("footer");

window.onscroll = function() {
    
    let scrollTop = window.scrollY;
    let docHeight = document.documentElement.scrollHeight;
    let winHeight = window.innerHeight;
    let maxScrollable = docHeight - winHeight;
    let scrollPercent = (scrollTop / maxScrollable) * 100;

    footer.style.background = `linear-gradient(to right, #5862bbff ${scrollPercent}%, #f752e9ff ${scrollPercent}%)`;
};