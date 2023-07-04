const Wallet = require('../models/wallet');
const transaction = require('../models/transactionModel')
exports.addMoney = async (req, res) => {
  try {
    if (!req.user._id) {
      return res.status(500).json({ message: "Provide token" })
    } else {
      const wallet = await Wallet.findOne({ user: req.user._id });
      if (!wallet) {
        return res.status(401).json({ message: "Wallet is not Created " })
      } else {
        wallet.balance = parseInt(wallet.balance) + parseInt(req.body.balance);
        const w = await wallet.save();
        if (w) {
          let obj = {
            user: req.user._id,
            date: Date.now(),
            amount: req.body.balance,
            type: "Credit",
          };
          const data1 = await transaction.create(obj);
          if (data1) {
            res.status(200).json({ status: "success", data: w, });
          }
        }
      }
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message })
  }
}
exports.removeMoney = async (req, res) => {
  if (!req.user._id) {
    return res.status(500).json({ message: "Provide Token " })
  }
  console.log(req.user._id)
  const wallet = await Wallet.findOne({ user: req.user._id });
  console.log(wallet);
  wallet.balance = parseInt(wallet.balance) - parseInt(req.body.balance);
  const w = await wallet.save();
  if (w) {
    let obj = {
      user: req.user._id,
      date: Date.now(),
      amount: req.body.balance,
      type: "Debit",
    };
    const data1 = await transaction.create(obj);
    if (data1) {
      res.status(200).json({ status: "success", data: w, });
    }
  }
};
exports.getWallet = async (req, res) => {
  try {
    if (!req.user._id) {
      return res.status(500).json({ message: "Provide Token " })
    }
    const wall = await Wallet.findOne({ user: req.user._id })
    console.log(wall)
    res.status(200).json({ status: "success", data: wall, });
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
};
exports.allTransactionUser = async (req, res) => {
  try {
    const data = await transaction.find({ user: req.user._id }).populate("user");
    res.status(200).json({ data: data });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
exports.allcreditTransactionUser = async (req, res) => {
  try {
    const data = await transaction.find({ user: req.user._id, type: "Credit" });
    res.status(200).json({ data: data });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
exports.allDebitTransactionUser = async (req, res) => {
  try {
    const data = await transaction.find({ user: req.user._id, type: "Debit" });
    res.status(200).json({ data: data });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};