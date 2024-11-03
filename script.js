window.addEventListener('DOMContentLoaded', () => {
  const message = document.getElementById('message');
  const jumpscare = document.getElementById('jumpscare');
  const screamAudio = document.getElementById('scream-audio');
  const text = 'Happy Halloween!';

  function typeText(text, element, delay, callback) {
    let index = 0;
    element.textContent = '';

    const typingInterval = setInterval(() => {
      if (index < text.length) {
        element.textContent += text.charAt(index);
        index++;
      } else {
        clearInterval(typingInterval);
        if (callback) callback();
      }
    }, delay);
  }

  function startHalloweenLoop() {
    typeText(text, message, 100, () => {
      setTimeout(() => {
        jumpscare.classList.add('hidden');

        setTimeout(() => {
          message.style.opacity = '0';
          jumpscare.classList.remove('hidden');
          screamAudio.volume = 1.0;
          screamAudio.loop = true;
          screamAudio.play();

          setTimeout(() => {
            screamAudio.pause();
            screamAudio.currentTime = 0;
            message.style.opacity = '1';
            startHalloweenLoop();
          }, 3000);
        }, 1000);
      }, 500);
    });
  }

  startHalloweenLoop();
});
