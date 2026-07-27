const tabs = document.querySelectorAll('.tab');
const tabPanels = document.querySelectorAll('[data-tab-content]');


tabs.forEach((tab) => tab.addEventListener('click', () => {
  tabs.forEach(button => button.classList.remove('active'));
  tab.classList.add('active');

  tabPanels.forEach((panel) => {
    if(panel.dataset.tabContent === tab.dataset.tab) {
      panel.classList.add('active');
    }else {
      panel.classList.remove('active');
    }
    
  });
  
}));


