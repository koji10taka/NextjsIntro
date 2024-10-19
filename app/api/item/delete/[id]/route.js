/* 削除する機能 */
import { NextResponse } from "next/server";
import connectDB from "@/app/utils/database";
import { ItemModel } from "@/app/utils/schemaModels";

export async function DELETE(request, context) {
  const reqBody = await request.json();
  try {
    await connectDB();
    // 該当のアイテムデータを取得
    const singleItem = await ItemModel.findById(context.params.id);

    if (singleItem.email === reqBody.email) {
      // 指定した_idのデータに対して削除処理を実行
      await ItemModel.deleteOne({ _id: context.params.id });
      return NextResponse.json({ message: "アイテム削除成功" });
    } else {
      return NextResponse.json({ message: "他の人が作成したアイテムです" });
    }
  } catch {
    return NextResponse.json({ message: "アイテム削除失敗" });
  }
}