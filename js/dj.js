document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('myAudio');

    const playPromise = audio.play();

    if (playPromise !== undefined) {
        playPromise.catch(error => {
            console.log("Autoplay was prevented:", error);
            showPlayButton();
        });
    }
});

function showPlayButton() {
    const btn = document.createElement('button');
    btn.textContent = 'Click to Play Audio';
    btn.style.margin = '20px';
    btn.style.padding = '10px 20px';
    btn.addEventListener('click', function() {
        document.getElementById('myAudio').play();
        btn.remove();
    });
    document.body.appendChild(btn);
}