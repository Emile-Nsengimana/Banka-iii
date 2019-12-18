const googleNotifications = [];

class Notifications {
  static registerNotifications(req, res) {
    const data = req.headers;
    const payload = {
      'X-Goog-Channel-ID': data['x-goog-channel-id'],
      'X-Goog-Resource-ID': data['x-goog-resource-id'],
      'X-Goog-Resource-URI': data['x-goog-resource-uri'],
    };
    googleNotifications.push(payload);
    return res.status(200).json({ message: 'notification received' });
  }

  static getNotifications(req, res) {
    const data = req.headers;
    const payload = {
      'X-Goog-Channel-ID': data['x-goog-channel-id'],
      'X-Goog-Resource-ID': data['x-goog-resource-id'],
      'X-Goog-Resource-URI': data['x-goog-resource-uri'],
    };
    googleNotifications.push(payload);
    // return res.status(200).json({ message: 'notification received' });
    return res.status(200).json({ notifications: req });
  }
}

export default Notifications;
