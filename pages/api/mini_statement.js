import ktk from './data/ktkMiniStatement.json';
import john from './data/johnMiniStatement.json';
import tirumala from './data/tirumalaMiniStatement.json';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ success: false, message: 'Username is required.' });
  }

  const dataMap = {
    ktk,
    john,
    tirumala,
  };

  const userData = dataMap[username.toLowerCase()];
  if (!userData) {
    return res.status(404).json({ success: false, message: 'User not found.' });
  }

  return res.status(200).json({ success: true, transactions: userData.transactions });
}