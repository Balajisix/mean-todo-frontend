self.addEventListener('push', event => {
  let data = {};
  try {
    data = event.data.json();
  } catch (e) {
    data = { title: 'Notification', body: event.data.text() };
  }

  const title = data.title || 'Notification';
  const options = {
    body: data.body,
    icon: 'assets/icons/icon-72x72.png'
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});
