  
    // Keep navbar collapse behavior minimal and accessible
    function toggleNav(){
      const nav = document.getElementById('navbarNav');
      if(!nav) return;
      if(nav.style.display === 'flex') nav.style.display = 'none';
      else nav.style.display = 'flex';
    }

    // Small client-side validation and UX
    (function(){
      const form = document.getElementById('contactForm');
      const clearBtn = document.getElementById('clearBtn');

      // make placeholder-shown work reliably
      document.querySelectorAll('input, textarea').forEach(el => {
        if(!el.placeholder) el.placeholder = ' ';
      });

      function isEmail(e){
        return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(e);
      }

      form.addEventListener('submit', function(ev){
        ev.preventDefault();
        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const subject = form.subject.value.trim();
        const message = form.message.value.trim();

        if(!name || !email || !subject || !message){
          alert('Please fill all fields before sending.');
          return;
        }
        if(!isEmail(email)){
          alert('Please enter a valid email address.');
          form.email.focus();
          return;
        }

        // pretend-send (replace with actual backend integration later)
        form.reset();
        alert('Message sent — thank you! (This demo uses client-side submit only.)');
      });

      clearBtn.addEventListener('click', function(){ form.reset(); });
    })();
  