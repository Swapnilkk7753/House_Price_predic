
    (function(){
      const form = document.getElementById('forgotForm');
      const email = document.getElementById('email');
      const msg = document.getElementById('msg');
      const btn = document.getElementById('sendBtn');

      function validateEmail(e){
        // simple but effective regex
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        return re.test(e);
      }

      form.addEventListener('submit', (ev) => {
        ev.preventDefault();
        msg.textContent = '';
        msg.className = 'msg';

        const val = email.value.trim();
        if(!val){
          msg.textContent = 'Please enter your registered email.';
          msg.classList.add('error');
          email.focus();
          return;
        }
        if(!validateEmail(val)){
          msg.textContent = 'Please enter a valid email address.';
          msg.classList.add('error');
          email.focus();
          return;
        }
        form.submit();
        // Demo UI feedback - replace with actual POST/fetch to your backend
        btn.disabled = true;
        btn.textContent = 'Sending…';
        msg.classList.remove('error');
        msg.classList.add('success');
        msg.textContent = 'Sending reset link to ' + val + ' (demo)...';

        setTimeout(() => {
          btn.disabled = false;
          btn.textContent = 'Send reset link';
          msg.textContent = 'If an account exists for ' + val + ', you will receive a password reset email shortly.';
        }, 1000);
      });
    })();
  