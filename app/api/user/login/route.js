/* ログイン機能 */
import { NextResponse } from "next/server";
// JWTを生成するために使うjoseライブラリのクラス
import { SignJWT } from "jose";
import connectDB from "@/app/utils/database";
import { UserModel } from "@/app/utils/schemaModels";

export async function POST(request) {
  const reqBody = await request.json();
  try {
    await connectDB();
    // UserModel.findOne({ email: reqBody.email })を使って、リクエストで送られてきたemailに対応するユーザー情報をデータベースから取得
    const savedUserData = await UserModel.findOne({ email: reqBody.email });
    if (savedUserData) {
      // ユーザーデータが存在する場合の処理
      if (reqBody.password === savedUserData.password) {
        // パスワードが正しい場合の処理

        // JWTの署名に使用する秘密鍵を。ここでは文字列"next-market-app-book"を使っているが、実際のプロジェクトではより安全な値を使うべき
        const secretKey = new TextEncoder().encode("next-market-app-book");

        // JWTに含める情報（ここではemail）を設定。これにより、JWTを使って後でユーザーのemailを認証に利用できる
        const payload = {
          email: reqBody.email,
        };

        const token = await new SignJWT(payload) // JWTトークンを作成するためのクラス
          .setProtectedHeader({ alg: "HS256" }) // JWTのヘッダー部分を設定。ここでは、署名アルゴリズムとしてHS256（HMAC SHA-256）を指定
          .setExpirationTime("1d") //トークンの有効期限を1日（"1d"）に設定
          .sign(secretKey); // トークンに署名して、実際のトークン文字列を生成
        // このトークンはクライアント側で保存され、認証が必要な後続のリクエストで使用
        console.log(token);

        return NextResponse.json({ message: "ログイン成功", token: token });
      } else {
        // パスワードが間違っている場合の処理
        return NextResponse.json({
          message: "ログイン失敗：パスワードが間違っています",
        });
      }
    } else {
      // ユーザーデータが存在しない場合の処理
      return NextResponse.json({
        message: "ログイン失敗：ユーザー登録をしてください",
      });
    }
  } catch {
    return NextResponse.json({ message: "ログイン失敗" });
  }
}

/**
 * 〇SignJWTとは？
 * SignJWTは、JavaScriptのjoseというライブラリに含まれている機能で、JWT（JSON Web Token）を作るためのもの。JWTは、ユーザーのログインや認証に使われる特殊な「デジタルキー」のようなもの。これを使うと、サーバーとクライアント（例えば、ブラウザ）間で、誰がアクセスしているかを安全に確認できる。
 * 〇setProtectedHeader({ alg: "HS256" })とは？
 * setProtectedHeader()は、JWTの「ヘッダー部分」を設定するための関数です。
 * ヘッダーには、どんな方法でトークンが作られたのかが記載されます。
 * ここでは、alg（アルゴリズム）という項目に"HS256"を設定しています。
 * "HS256"は、HMAC SHA-256という暗号化の方法です。これは、データを安全にするための「暗号化方式」の一つです。
 * 簡単に言うと、HS256を使うことで「誰かがトークンを改ざんしていないか」を確認できるようになります。
 * 〇.sign()は、トークンに署名（サイン）をするための関数です。
 * 署名とは、トークンが作られた時に使った秘密の「カギ」を使って、このトークンが正しいものであることを証明するためのものです。
 * secretKeyというものを使って署名しますが、これは誰にも知られてはいけない秘密のカギです。
 * 例えば、トークンを発行する際に「next-market-app-book」という文字列をsecretKeyとして使っているので、これを知らない人が勝手にトークンを作ることはできません。
 * 〇簡単な流れ
 * 1.SignJWTは「JWTトークンを作るマシン」だと思ってください。
 * 2.setProtectedHeader({ alg: "HS256" })で、「このトークンはHS256という方法で作られたよ」という情報をトークンに付けます。
 * 3.setExpirationTime("1d")で、「このトークンは1日間有効だよ」と設定します。
 * 4.sign(secretKey)で「秘密のカギ」を使ってトークンにサインし、誰かが勝手にトークンを変えたり作ったりできないようにします。
 */
