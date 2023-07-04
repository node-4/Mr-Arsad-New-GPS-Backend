const Faq = require("../models/faq");
exports.getAllFaqs = async (req, res) => {
  try {
    const Faqs = await Faq.find();
    if (Faqs.length == 0) {
      res.status(404).send({ status: 404, message: "Faq Not found", data: {} });
    } else {
      res.status(200).send({ status: 200, message: "Faq found successfully.", data: Faqs });
    }
  } catch (error) {
    res.status(500).json({ status: 500, error: "Internal Server Error" });
  }
};
exports.createFaq = async (req, res) => {
  try {
    const { question, answer } = req.body;
    if (!question || !answer) {
      res.status(400).json({ message: "questions and answers cannot be blank " });
    }
    const newFaq = await Faq.create(req.body);
    res.status(200).send({ status: 200, message: "Faq Create successfully.", data: newFaq });
  } catch (error) {
    res.status(500).json({ status: 500, error: "Internal Server Error" });
  }
};
exports.getFaqById = async (req, res) => {
  try {
    const Faqs = await Faq.findById(req.params.id);
    if (!Faqs) {
      res.status(404).send({ status: 404, message: "Faq Not found", data: {} });
    } else {
      res.status(200).send({ status: 200, message: "Faq found successfully.", data: Faqs });
    }
  } catch (error) {
    res.status(500).json({ status: 500, error: "Internal Server Error" });
  }
};
exports.updateFaq = async (req, res) => {
  try {
    const Faqs = await Faq.findById(req.params.id);
    if (!Faqs) {
      res.status(404).send({ status: 404, message: "Faq Not found", data: {} });
    } else {
      const { question, answer } = req.body;
      if (!question || !answer) {
        res.status(400).json({ message: "questions and answers cannot be blank " });
      }
      let obj = {
        question: question || Faq.question,
        answer: answer || Faq.answer,
      }
      const updatedFaq = await Faq.findByIdAndUpdate(Faqs._id, obj, { new: true });
      res.status(200).send({ status: 200, message: "Faq Update successfully.", data: updatedFaq });
    }
  } catch (error) {
    res.status(500).json({ status: 500, error: "Internal Server Error" });
  }
};
exports.deleteFaq = async (req, res) => {
  try {
    const deletedFaq = await Faq.findByIdAndDelete(req.params.id);
    if (!deletedFaq) {
      res.status(404).send({ status: 404, message: "Faq Not found", data: {} });
    }
    res.status(200).send({ status: 200, message: "Faq deleted successfully.", data: {} });
  } catch (error) {
    res.status(500).json({ status: 500, error: "Internal Server Error" });
  }
};
