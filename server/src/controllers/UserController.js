/**
 * User Controller
 * Handles all user-related operations
 */

import * as userRepo from "../repos/UserRepo.js";
import * as accountRepo from "../repos/AccountRepo.js";
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

export const getUserProfile = asyncHandler(async function (req, res) {
  const { id } = req.params;

  const user = await userRepo.getById(id);
  if (!user) throw new Error("User not found");

  const account = await accountRepo.getAccountByUserId(id);
  if (!account) throw new Error("Account not found");

  // For now, accountLifecycle is null, friendRequest and chat are null
  const profile = {
    user: user.toJSON(),
    account: account.toJSON(),
    accountLifecycle: null,
    friendRequest: null,
    chat: null,
  };

  return res.status(200).json(profile);
});


