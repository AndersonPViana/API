import House from "../models/House.js";
import User from "../models/User.js";
import Reserve from "../models/Reserve.js";

class ReserveController {

  async destroy(req, res) {
    const { reserve_id } = req.body;

    await Reserve.findByIdAndDelete({_id: reserve_id});

    return res.status(200).json({ message: 'Reservation canceled' })
  }

  async index(req, res) {
    const { id } = req.body;

    const reserves = await Reserve.findById(id).populate('user');

    return res.json(reserves)
  }

  async store(req, res) {
    const { date } = req.body;
    const { house_id } = req.params;
    const { user_id } = req.headers;

    const house = await House.findById( house_id );
    const user = await User.findById ( user_id );

    if(!house) {
      return res.status(400).json({ message: 'House not found' })
    }

    if(house.status !== true) {
      return res.status(400).json({ message: 'House unavailable' })
    }

    if (String(user._id) === String(house.user)) {
      return res.status(401).json({ message: 'Reservation not allowed' })
    }

    const reserve = await Reserve.create({
      user: user_id,
      house: house_id,
      date
    })

    await reserve.populate('house');

    return res.json(reserve);
  }
}

export default new ReserveController();
