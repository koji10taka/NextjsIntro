/* データベースとの接続を行うファイル */
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // 実行したい処理
    // MongoDB Atlasに接続
    await mongoose.connect(
      "mongodb+srv://xiaodaochong2:Q2JxeOYcGzbqcVD7@cluster0.8xn4u.mongodb.net/nextAppDataBase?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Success: Connected to MongoDB");
  } catch {
    // 接続に失敗した場合の処理
    console.log("Failure: Unconnected to MongoDB");
    throw new Error();
  }
};

export default connectDB;
