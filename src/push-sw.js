self.addEventListener('push', event => {
  if(event.data) {
    const data = event.data.json();
    const title = data.title || 'Notification';
    const options = {
      body: data.body,
      icon: 'assets/icons/icon-72x72.png'
    };
    event.waitUntil(
      self.registration.showNotification(title, options)
    );
  }
});