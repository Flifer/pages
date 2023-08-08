"use strict"

const isMobile = {
    Android: function(){
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function(){
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function(){
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function(){
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function(){
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function(){
        return (
            isMobile.Android()  ||
            isMobile.BlackBerry() ||
            isMobile.iOS() ||
            isMobile.Opera() ||
            isMobile.Windows()
        );
    }
};

if (isMobile.any()){
    document.body.classList.add('_touch');
} else {
    document.body.classList.add('_pc');
}

//бургер меню

const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');
if(iconMenu){
    iconMenu.addEventListener("click", function(e) {
        document.body.classList.toggle('_lock')
        iconMenu.classList.toggle('_active')
        menuBody.classList.toggle('_active')
    });
}

//прокрутка при клике на разделы

const menuLinks = document.querySelectorAll('.menu__link');
if (menuLinks.length > 0) {
    menuLinks.forEach(menuLink => {
        menuLink.addEventListener("click", onMenuLinkClick)
    });
    
    function onMenuLinkClick(e) {
        const menuLink = e.target;
        if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)){
            const gotoBlock = document.querySelector(menuLink.dataset.goto);
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollY - document.querySelector('header').offsetHeight;
            
            if(iconMenu.classList.contains('_active')) {
                document.body.classList.remove('_lock')
                iconMenu.classList.remove('_active')
                menuBody.classList.remove('_active')
            }

            window.scrollTo({
                top: gotoBlockValue,
                behavior: "smooth"
            });
            e.preventDefault();

        } if (menuLink.classList.contains('_langSwitch')) {

            const ruBlocks = document.querySelectorAll('._ruLang');
            const ukrBlocks = document.querySelectorAll('._ukrLang');

            ruBlocks.forEach(ruBlock => {
                ruBlock.classList.toggle('_notCurrentLang');
            })
            ukrBlocks.forEach(ukrBlock => {
                ukrBlock.classList.toggle('_notCurrentLang');
            })
            e.preventDefault();
        }
    }
}

function validateForm(event) {
    event.preventDefault();
    
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const phoneNumber = document.getElementById('phoneNumber').value.trim();
    
    if (firstName.length < 3 || lastName.length < 3) {
      alert('Имя и фамилия должны содержать минимум 3 знака');
      return;
    }
    
    if (phoneNumber.length < 10) {
      alert('Номер телефона должен содержать минимум 10 знаков');
      return;
    }

    let text = 'Спасибо ' + firstName + ' ' + lastName + ' мы постараемся с вами связаться как можно скорее'

    alert(text);
    clearForm();
  }

  function clearForm() {
    const form = document.getElementById('myForm');
    const elements = form.elements;
    
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      
      if (element.type === 'text' || element.type === 'tel') {
        element.value = '';
      }
    }
  }
  
  const form = document.getElementById('myForm');
  form.addEventListener('submit', validateForm);
