
    (function(){
      const pwd = document.getElementById('password');
      const cpwd = document.getElementById('cPassword');
      const toggle = document.getElementById('togglePwd');
      const pwBar = document.getElementById('pwBar');
      const pwText = document.getElementById('pwText');
      const form = document.getElementById('registerForm');
      const msg = document.getElementById('msg');

      // show/hide password
      toggle.addEventListener('click', () => {
        const shown = pwd.type === 'text';
        pwd.type = shown ? 'password' : 'text';
        cpwd.type = shown ? 'password' : 'text';
        toggle.textContent = shown ? 'Show' : 'Hide';
      });

      // password strength estimator (simple)
      function strengthScore(s){
        let score = 0;
        if(s.length >= 8) score += 2;
        if(/[a-z]/.test(s)) score += 1;
        if(/[A-Z]/.test(s)) score += 1;
        if(/[0-9]/.test(s)) score += 1;
        if(/[^\w\s]/.test(s)) score += 1;
        return Math.min(score, 6);
      }

      pwd.addEventListener('input', () => {
        const s = pwd.value || '';
        const sc = strengthScore(s);
        const pct = Math.round((sc / 6) * 100);
        pwBar.style.width = pct + '%';

        if(pct < 34){
          pwText.textContent = 'Weak — try 8+ chars with letters & numbers.';
          pwBar.style.background = '#f87171';
        } else if(pct < 67){
          pwText.textContent = 'Okay — add uppercase or symbols to strengthen.';
          pwBar.style.background = '#f59e0b';
        } else {
          pwText.textContent = 'Strong password.';
          pwBar.style.background = 'linear-gradient(90deg,var(--accent-1),var(--accent-2))';
        }
      });

      function validEmail(e){ return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(e); }

      form.addEventListener('submit', (ev) => {
        ev.preventDefault();
        msg.textContent = '';
        msg.className = 'msg';

        const full = form.fullName.value.trim();
        const user = form.userName.value.trim();
        const email = form.email.value.trim();
        const p = form.password.value;
        const cp = form.cPassword.value;
        const agree = form.agree.checked;

        if(!full || !user || !email || !p || !cp){
          msg.textContent = 'Please fill all fields.';
          msg.classList.add('error');
          return;
        }
        if(!validEmail(email)){
          msg.textContent = 'Please enter a valid email address.';
          msg.classList.add('error');
          return;
        }
        if(p.length < 6){
          msg.textContent = 'Password must be at least 6 characters.';
          msg.classList.add('error');
          return;
        }
        if(p !== cp){
          msg.textContent = 'Passwords do not match.';
          msg.classList.add('error');
          return;
        }
        if(!agree){
          msg.textContent = 'You must agree to the terms.';
          msg.classList.add('error');
          return;
        }
        form.submit();

        // Demo UI feedback (replace with real POST or remove preventDefault)
        msg.classList.remove('error');
        msg.classList.add('ok');
        msg.textContent = 'Registering… (demo)';
        document.getElementById('regBtn').disabled = true;

        setTimeout(() => {
          msg.textContent = 'Account created (demo). Redirecting to login…';
          // Uncomment to actually submit:
          // form.submit();
        }, 900);
      });
    })();
  