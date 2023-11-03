"use server";

import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import {
  CreateUserParams,
  DeleteUserParams,
  UpdateUserParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import Question from "@/database/question.model";

export async function getUserById(params: any) {
  try {
    connectToDatabase();
    const { userId } = params;

    const user = await User.findOne({ clerkId: userId });

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createUser(userData: CreateUserParams) {
  try {
    connectToDatabase();
    const newUser = await User.create(userData);
    return newUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateUser(params: UpdateUserParams) {
  try {
    connectToDatabase();

    const { clerkId, updateData, path } = params;

    await User.findOneAndUpdate({ clerkId }, updateData, {
      new: true,
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deletedUser(deleteUser: DeleteUserParams) {
  try {
    connectToDatabase();
    const { clerkId } = deleteUser;
    const delUser = await User.findOneAndDelete({ clerkId });
    if (!delUser) {
      throw new Error("User not Found");
    }

    // const userQuestionIds = await Question.find({
    //   author: delUser._id,
    // }).distinct("_id");

    await Question.deleteMany({ author: delUser._id });
    const deletedUser = await User.findById(delUser._id);
    return deletedUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
