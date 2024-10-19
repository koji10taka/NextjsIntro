/* ユーザー登録機能に使用 */
import connectDB from "@/app/utils/database";
import { UserModel } from "@/app/utils/schemaModels";
import { NextResponse } from "next/server";

// POSTという関数をエクスポート。APIエンドポイントにPOSTリクエストが来たときに実行される
export async function POST(request) {
  // request.json()を使って、POSTリクエストのボディ部分（ユーザーが送信したデータ）をJSON形式で取得
  const reqBody = await request.json();
  try {
    await connectDB();
    // UserModel.create(reqBody)で、reqBodyに含まれるデータ（ユーザー情報）を使って新しいユーザーをデータベースに保存
    await UserModel.create(reqBody);
    return NextResponse.json({ message: "ユーザー登録成功" });
  } catch {
    return NextResponse.json({ message: "ユーザー登録失敗" });
  }
}
