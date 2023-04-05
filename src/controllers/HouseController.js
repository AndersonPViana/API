import * as Yup from 'yup';

import House from '../models/House.js';
import User from '../models/User.js';

class HouseController {
  async update(req, res) {
    const { id } = req.params;
    const { filename } = req.file;
    const { description, price, location, status } = req.body;
    const { user_id } = req.headers;

    const user = await User.findById(user_id);
    const house = await House.findById(id);

    if (String(user._id) !== String(house.user)) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const updateHouse = await House.updateOne(
      { _id: id },
      {
        user: user_id,
        thumbnail: filename,
        description,
        price,
        location,
        status,
      }
    );

    return res.json(updateHouse);
  }

  async destroy(req, res) {
    const { house_id } = req.body;
    const { user_id } = req.headers;

    const house = await House.findById(house_id);
    const user = await User.findById(user_id);

    if (String(user._id) !== String(house.user)) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    try {
      house.deleteOne();
      return res.status(200).json({ message: 'House Deleted' });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  async index(req, res) {
    const { status } = req.query;

    const house = await House.find({ status });

    return res.json(house);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
      price: Yup.number().required(),
      location: Yup.string().required(),
      status: Yup.boolean().required(),
    });

    const { filename } = req.file;
    const { description, price, location, status } = req.body;
    const { user_id } = req.headers;

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ message: 'validation failure' });
    }

    const house = await House.create({
      user: user_id,
      thumbnail: filename,
      description,
      price,
      location,
      status,
    });

    return res.json(house);
  }
}

export default new HouseController();
