document.addEventListener('DOMContentLoaded', function() {
    const welcomeText = "Welcome To Happy Hoe Grocery";
    const sloganText = "Cereal is Gold";
    const welcomeElement = document.getElementById('welcome');
    const sloganElement = document.getElementById('slogan');
    const getStartedButton = document.getElementById('getStarted');
  
    let welcomeIndex = 0;
    let sloganIndex = 0;
  
    function typeWelcome() {
      if (welcomeIndex < welcomeText.length) {
        welcomeElement.innerHTML += welcomeText.charAt(welcomeIndex);
        welcomeIndex++;
        setTimeout(typeWelcome, 100);
      } else {
        setTimeout(typeSlogan, 500);
      }
    }
  
    function typeSlogan() {
      if (sloganIndex < sloganText.length) {
        sloganElement.innerHTML += sloganText.charAt(sloganIndex);
        sloganIndex++;
        setTimeout(typeSlogan, 100);
      }
    }
  
    typeWelcome();
  
    getStartedButton.addEventListener('click', function() {
      alert('Get Started button clicked!');
    });
    getViewStatusButton.addEventListener('click', function() {
      alert('View Status button clicked!');

  });
  });