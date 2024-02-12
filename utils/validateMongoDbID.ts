import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;

export const validateMongoDbId = (
  id:
    | string
    | number
    | mongoose.mongo.BSON.ObjectId
    | mongoose.mongo.BSON.ObjectIdLike
    | Uint8Array
) => {
  const isValid = ObjectId.isValid(id);
  if (isValid == false) throw new Error("Invalid Id or Not Found");
};
