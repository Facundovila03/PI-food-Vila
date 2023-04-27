const { Op } = require("sequelize");
const { Diet } = require("../db");
const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;

const getAllDiets = async (req, res) => {
  try {
    const dietas = await Diet.findAll();
    res.status(200).json(dietas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getAllDiets;
