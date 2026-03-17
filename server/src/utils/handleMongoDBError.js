import { Error as MongooseError } from "mongoose";
import { MongoServerError } from "mongodb";

export async function handleMongoDbErrors(operation) {
  try {
    return await operation();
  } catch (error) {
    // Duplicate key error
    if (error instanceof MongoServerError && error.code === 11000) {
      const fields = Object.keys(error.keyPattern || {});
      throw new Error(
        `${fields.join(", ") || "Resource"} already exists`,
      );
    }

    // Validation error
    if (error instanceof MongooseError.ValidationError) {
      throw new Error(error.message);
    }

    // Cast error (invalid ObjectId)
    if (error instanceof MongooseError.CastError) {
      throw new Error(`Invalid value for field '${error.path}'`);
    }

    // Unknown error
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error("Database operation failed");
  }
}
