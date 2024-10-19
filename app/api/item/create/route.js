/* アイテムデータの作成機能 */
import { NextResponse } from "next/server";
import connectDB from "@/app/utils/database";
import { ItemModel } from "@/app/utils/schemaModels";

export async function POST(request) {
  const reqBody = await request.json();

  try {
    // データベースに接続する
    await connectDB();
    // 送信されたデータをデータベースへ登録する
    await ItemModel.create(reqBody); // 保存したいデータをパラメータに指定
    return NextResponse.json({ message: "アイテム作成成功" });
  } catch {
    return NextResponse.json({ message: "アイテム作成失敗" });
  }
}
/*

*/
