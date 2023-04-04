const logout = async () => {
    console.log("clickd btn");
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      console.log("working logout");
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  };

logout_btn = document.querySelector('#btn-logout');
console.log(logout_btn);
logout_btn.addEventListener('click', logout);
  