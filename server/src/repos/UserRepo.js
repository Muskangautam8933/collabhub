/**
 * User Repository
 * Handles all database operations related to users and accounts
 * Based on ER Diagram Schema
 */

import User from "../models/UserSchema.js";
import { Types } from "mongoose";

/************************************************************************
 **************************** CREATE ************************************
 ************************************************************************/
export async function create(user, options = {}) {
  const newUser = new User(user);
  return await newUser.save(options);
}
/************************************************************************
 **************************** READ **************************************
 ************************************************************************/
export async function getUsers(filters = {}, { page = 1, limit = 10 } = {}) {
  const skip = (page - 1) * limit;

  return await User.find(filters)
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });
}

export async function getAll() {
  return await User.find();
}

export async function getByEmail(email) {
  if (!email) throw new Error("Email is required");

  return await User.findOne({ email: email.toLowerCase() });
}

export async function getById(id) {
  if (!id) throw new Error("User ID is required");

  return await User.findById(id);
}

/************************************************************************
 **************************** UPDATE ************************************
 ************************************************************************/
/************************************************************************
 **************************** DELETE ************************************
 ************************************************************************/
export async function deleteOne(userId) {
  const user = await User.findById(new Types.ObjectId(userId));

  if (!user) throw new Error("User not found");

  await user.cascadeDelete();
}

export async function deleteByEmail(email) {
  const user = await User.findOne({ email: email.toLowerCase() });

  if (!user) throw new Error("User not found");

  await user.cascadeDelete();
}
