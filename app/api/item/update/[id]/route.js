/* 修正する機能 */
import { NextResponse } from "next/server";
import connectDB from "@/app/utils/database";
import { ItemModel } from "@/app/utils/schemaModels";

export async function PUT(request, context) {
  // 修正済みのデータを格納
  const reqBody = await request.json();
  try {
    await connectDB();
    // 該当のアイテムデータを取得
    const singleItem = await ItemModel.findById(context.params.id);

    if (singleItem.email === reqBody.email) {
      // データベースのemailとフロント側からリクエスト送信されたemailとが一致する
      // -> 編集者＝登録者の場合
      // _idプロパティが指定したidのデータの内容をreqBodyの中身に更新
      await ItemModel.updateOne({ _id: context.params.id }, reqBody);
      return NextResponse.json({ message: "アイテム編集成功" });
    } else {
      return NextResponse.json({ message: "他の人が作成したアイテムです" });
    }
  } catch {
    return NextResponse.json({ message: "アイテム編集失敗" });
  }
}
