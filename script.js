window.addEventListener('DOMContentLoaded', () => {
  const message = document.getElementById('message');
  const jumpscare = document.getElementById('jumpscare');
  const screamAudio = document.getElementById('scream-audio');
  const text = 'Happy Halloween!';

  // بارگذاری صدا به‌محض لود صفحه
  screamAudio.load();

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
    typeText(text, message, 200, () => {
      setTimeout(() => {
        jumpscare.classList.add('hidden');

        // بعد از 3 ثانیه، جامپ‌اسکر نمایش داده می‌شود
        setTimeout(() => {
          message.style.opacity = '0';
          jumpscare.classList.remove('hidden');
          screamAudio.volume = 1.0; // تنظیم صدا به 100%
          screamAudio.loop = true; // تنظیم صدا به حالت تکرار

          // پخش صدا
          screamAudio
            .play()
            .then(() => {
              console.log('Playback started successfully');
            })
            .catch((error) => {
              console.log('Playback prevented:', error);
            });

          // بعد از 3 ثانیه صبر کنه و به حالت اول برگرده
          setTimeout(() => {
            screamAudio.pause();
            screamAudio.currentTime = 0; // بازنشانی صدا برای تکرار
            message.style.opacity = '1'; // بازگرداندن پیام به حالت اول
            startHalloweenLoop(); // تکرار افکت
          }, 3000);
        }, 3000);
      }, 1000); // زمان اضافی برای دیدن متن کامل
    });
  }

  // شروع چرخه افکت
  startHalloweenLoop(); // شروع اولین نمایش
});
