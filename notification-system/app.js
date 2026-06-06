const openBtn = document.getElementById('openBtn');
const overlay = document.getElementById('overlay');
const closeBtn = document.getElementById('closeBtn');

function isModalOpen() {
  return overlay.classList.contains('active');
}

function openModal() {

  if(isModalOpen()) return;

  overlay.classList.add('active');
  document.body.classList.add('no-scroll');
}

function closeModal() {

  if(!isModalOpen()) return;

  overlay.classList.remove('active');
  document.body.classList.remove('no-scroll');
}


openBtn.addEventListener('click', openModal);

closeBtn.addEventListener('click', closeModal)

// overlay.addEventListener('click', (e) => {
//   if(e.target === overlay) {
//     closeModal();
//   }  
// });

document.addEventListener('keydown', (e) => {
  if(e.key === 'Escape') {
    closeModal();
  }
});

