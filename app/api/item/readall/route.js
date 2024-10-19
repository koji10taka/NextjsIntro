/* 全てのデータを読み取る機能 */
import { NextResponse } from "next/server";
import connectDB from "@/app/utils/database";
import { ItemModel } from "@/app/utils/schemaModels";

export async function GET() {
  try {
    await connectDB(); // データベースに接続
    const allItems = await ItemModel.find(); // データの読み取り
    // 取得したデータをブラウザに表示
    return NextResponse.json({
      message: "アイテム読み取り成功（オール）",
      allItems: allItems,
    });
  } catch {
    return NextResponse.json({ message: "アイテム読み取り失敗（オール）" });
  }
}

// 0を設定することで、このAPIが毎回リアルタイムでデータを取得。
// -> データのキャッシュを行わず、最新のデータを取得
export const revalidate = 0;
