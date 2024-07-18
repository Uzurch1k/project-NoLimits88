const Water = require('../models/water');

exports.addWater = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({ msg: 'Please include the amount of water consumed' });
    }

    const newWater = new Water({
      userId: req.user.id,
      amount,
    });

    const water = await newWater.save();

    res.json(water);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.updateWater = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({ msg: 'Please include the amount of water consumed' });
    }

    let water = await Water.findById(req.params.id);

    if (!water) {
      return res.status(404).json({ msg: 'Record not found' });
    }

    if (water.userId.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    water = await Water.findByIdAndUpdate(
      req.params.id,
      { amount },
      { new: true }
    );

    res.json(water);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.deleteWater = async (req, res) => {
  try {
    let water = await Water.findById(req.params.id);

    if (!water) {
      return res.status(404).json({ msg: 'Record not found' });
    }

    if (water.userId.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await Water.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Record removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
