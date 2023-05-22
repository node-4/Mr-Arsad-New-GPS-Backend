const Wallet = require('../models/wallet');



exports.addMoney = async(req,res) => {
    try{
    if(!req.user._id){
        return res.status(500).json({
            message: "Provide token"
        })
    }
    const wallet = await Wallet.findOne({user: req.user._id});
    if(!wallet){
        return res.status(401).json({
            message: "Wallet is not Created "
        })
    }else{
        wallet.balance = parseInt(wallet.balance) + parseInt(req.body.balance);
        console.log(wallet.balance)
         const w = await wallet.save();
        res.status(200).json({
          status: "success",
         data: w,
        });
    }
    }catch(err){
        console.log(err);
        res.status(400).json({
            message: err.message
        })
    }
}


exports.removeMoney = async (req, res) => {
    if(!req.user._id){
      return res.status(500).json({
        message: "Provide Token "
      })
    }
    console.log(req.user._id)
    const wallet = await Wallet.findOne({ user: req.user._id });
    console.log(wallet);
  
    wallet.balance = parseInt(wallet.balance) - parseInt(req.body.balance);
    const w = await wallet.save();
    console.log(w);
  
    res.status(200).json({
      status: "success",
      data: w,
    });
  };


  exports.getWallet = async (req, res) => {
    try{
    if(!req.user._id){
      return res.status(500).json({
        message: "Provide Token "
      })
    }
    const wall = await Wallet.findOne({ user: req.user._id })
    console.log(wall)
    res.status(200).json({
      status: "success",
      data: wall,
    });
  }catch(err){
    console.log(err)
    res.status(400).json({
      message: err.message
    })
  }
  };