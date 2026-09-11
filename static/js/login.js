  
    // Toggle password visibility
    (function(){
      const pwd = document.getElementById('password');
      const btn = document.getElementById('togglePwd');
      btn.addEventListener('click', () => {
        const isText = pwd.type === 'text';
        pwd.type = isText ? 'password' : 'text';
        btn.textContent = isText ? 'Show' : 'Hide';
      });

      // Basic client-side validation demo (replace with real auth)
      const form = document.getElementById('loginForm');
      const msg = document.getElementById('msg');
    
      form.addEventListener('submit', (e) => {
        e.preventDefault(); // remove to allow real POST
        msg.textContent = '';
        const u = form.userName.value.trim();
        const p = form.password.value;
        if(!u){
          msg.textContent = 'Please enter username or email.';
          msg.style.color = '#e24b4b';
          form.userName.focus();
          return;
        }
        if(!p || p.length < 6){
          msg.textContent = 'Password must be at least 6 characters.';
          msg.style.color = '#e24b4b';
          form.password.focus();
          return;
        }
        form.submit();
        msg.style.color = '#0b7a3a';
        msg.textContent = 'Logging in (demo)...';
        // replace with fetch()/form.submit() to integrate with backend
        setTimeout(()=> { msg.textContent = 'Login successful (demo). Redirecting...'; }, 700);
      });
    })();
  