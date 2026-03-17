import mongoose from "mongoose";

export const withTransaction = async (workFn) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const result = await workFn(session);

    await session.commitTransaction();
    return result;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};
