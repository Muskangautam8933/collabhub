/**
 * User Controller
 * Handles all user-related operations
 */

import * as userRepo from "../repos/UserRepo.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getUsers = asyncHandler(async (req, res) => {
  const { email, name, page = 1, limit = 10 } = req.query;

  const filters = {};

  if (email) {
    filters.email = {
      $regex: email,
      $options: "i", // case insensitive
    };
  }

  if (name) {
    filters.name = {
      $regex: name,
      $options: "i", // case insensitive
    };
  }

  const pagination = {
    page: Number(page),
    limit: Number(limit),
  };

  const users = await userRepo.getUsers(filters, pagination);

  return res.status(200).json(users);
});

export const deleteUser = asyncHandler(async function (req, res) {
  await userRepo.deleteOne(req.params.id);
  return res.sendStatus(200);
});

export const deleteByEmail = asyncHandler(async function (req, res) {
  await userRepo.deleteByEmail(req.query.email);
  return res.sendStatus(200);
});


