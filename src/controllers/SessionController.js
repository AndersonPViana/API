import * as Yup from 'yup';
import User from '../models/User.js';

class SessionController {
  async destroy(req, res) {
    const { user_id } = req.body;

    const user = await User.findById(user_id);

    try {
      user.deleteOne();
      return res.status(200).json({ message: 'User deleted' });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
    });

    const { email } = req.body;

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ message: 'validation failure' });
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({ email });
    }

    return res.json(user);
  }
}

export default new SessionController();
