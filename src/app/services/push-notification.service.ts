import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SwPush } from '@angular/service-worker';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {
  // Replace with your actual public VAPID key
  readonly VAPID_PUBLIC_KEY = 'BP__0qNQEDL-86yjh-hSokPRqFs1KpUWK-AZQqRw02b6eYPaIK7E7-jZtdKmsBzmLPGA_xlciMroJfXpm8aeKH0';
  readonly SUBSCRIBE_URL = 'http://localhost:3000/api/notifications/subscribe';

  constructor(private swPush: SwPush, private http: HttpClient) {}

  subscribeToNotifications() {
    if (this.swPush.isEnabled) {
      this.swPush.requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY
      })
      .then(subscription => {
        // Send the subscription object to the backend
        this.http.post(this.SUBSCRIBE_URL, subscription).subscribe(
          () => console.log('✅ Subscription sent to server.'),
          err => console.error('❌ Error sending subscription to server:', err)
        );
      })
      .catch(err => console.error('❌ Could not subscribe to notifications', err));
    } else {
      console.warn('⚠️ Push notifications are not enabled in this browser.');
    }
  }

  // 📩 Listen for incoming push notifications
  listenToNotifications() {
    this.swPush.messages.subscribe(message => {
      console.log('📨 Push Message Received:', message);
      alert('🔔 ' + JSON.stringify(message));
    });

    this.swPush.notificationClicks.subscribe(({ action, notification }) => {
      console.log('🖱️ Notification clicked:', notification);
      // You can redirect or handle logic here
    });
  }
}
