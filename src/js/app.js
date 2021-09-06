if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw-test/sw.js', { scope: '/sw-test/' }).then(function(reg) {
      // Registrierung erfolgreich
      console.log('Registrierung erfolgreich. Scope ist ' + reg.scope);
    }).catch(function(error) {
      // Registrierung fehlgeschlagen
      console.log('Registrierung fehlgeschlagen mit ' + error);
    });
  };