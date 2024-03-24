// Burger menus
document.addEventListener('DOMContentLoaded', function() {
    // open
    const burger = document.querySelectorAll('.navbar-burger');
    const menu = document.querySelectorAll('.navbar-menu');

    if (burger.length && menu.length) {
        for (var i = 0; i < burger.length; i++) {
            burger[i].addEventListener('click', function() {
                for (var j = 0; j < menu.length; j++) {
                    menu[j].classList.toggle('hidden');
                }
            });
        }
    }

    // close
    const close = document.querySelectorAll('.navbar-close');
    const backdrop = document.querySelectorAll('.navbar-backdrop');

    if (close.length) {
        for (var i = 0; i < close.length; i++) {
            close[i].addEventListener('click', function() {
                for (var j = 0; j < menu.length; j++) {
                    menu[j].classList.toggle('hidden');
                }
            });
        }
    }

    if (backdrop.length) {
        for (var i = 0; i < backdrop.length; i++) {
            backdrop[i].addEventListener('click', function() {
                for (var j = 0; j < menu.length; j++) {
                    menu[j].classList.toggle('hidden');
                }
            });
        }
    }
})
const mySecret = process.env['airtable_api']
document.getElementById('submitButton').addEventListener('click', function() {
      var email = document.getElementById('headerInput3-1').value;
      var timestamp = new Date().toISOString();

      var airtableApiKey = mySecret;
      var baseId = 'appqs3SmShdPgX4jA';
      var tableName = 'tbl3Mm0Exzo8eUkPg';
      var url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`;

      var data = {
          "fields": {
              "Email": email,
              "Timestamp": timestamp
          }
      };

      fetch(url, {
          method: 'POST',
          headers: {
              'Authorization': `Bearer ${airtableApiKey}`,
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(data => {
          console.log('Success:', data);
          // Optionally, clear the input field after successful submission
          document.getElementById('emailInput').value = '';
      })
      .catch((error) => {
          console.error('Error:', error);
      });
  });;
