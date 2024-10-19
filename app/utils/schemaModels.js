/* 保存するデータの形と種類を設定 */
// mongooseはMongoDBとJavaScriptの間のデータ操作を簡単にするライブラリ
import mongoose from "mongoose";

//mongooseからSchemaという機能を取得。Schemaを使って、データの構造（どのような項目を保存するか）を定義
const Schema = mongoose.Schema;

// アイテムをデータベースに保存する際の構造を決める部分
const ItemSchema = new Schema({
  // アイテムデータとして保存したい形を定義 _idはDB保存時に割り当て
  title: String,
  image: String,
  price: String,
  description: String,
  email: String,
});

// ユーザーデータのschema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true, // 必須
    unique: true, // 重複禁止
  },
  password: {
    type: String,
    required: true,
  },
});

// Modelの作成
// ItemModelという名前でItemというデータ構造のモデルを作成
// mongoose.models.Itemがすでに存在する場合はそれを使い、存在しない場合はItemSchemaを使って新しくモデルを作成
// モデルは、MongoDBとやり取りするための「データのテンプレート」
export const ItemModel =
  mongoose.models.Item || mongoose.model("Item", ItemSchema);

export const UserModel =
  mongoose.models.User || mongoose.model("User", UserSchema);
