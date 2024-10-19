/* ミドルウェア -> 特定のAPIルートにアクセスする前に、リクエストをチェックして処理する */
import { NextResponse } from "next/server";
// JWTトークンが正しいかどうかを確認するために使用
import { jwtVerify } from "jose";

// 引数のrequestは、ブラウザやクライアントから送られてきたリクエストの情報を保持
export async function middleware(request) {
  // リクエストのAuthorizationヘッダーから情報を取得
  // このヘッダーには、ユーザーがログイン時に取得したJWTトークンが含まれている
  // .split(" ")[1]で、Bearer トークンの形式から、実際のトークン部分だけを取り出す
  // ?.は「トークンがなければエラーを出さずにundefinedを返す」
  const token = await request.headers.get("Authorization")?.split(" ")[1];

  if (!token) {
    return NextResponse.json({ message: "トークンがありません" });
  }
  // トークンがある場合、有効性の判定
  try {
    const secretKey = new TextEncoder().encode("next-market-app-book");
    //
    const decodedJwt = await jwtVerify(token, secretKey);
    // トークンが正しければ次の処理に進む
    return NextResponse.next();
  } catch {
    return NextResponse.json({
      message: "トークンが正しくないので、ログインしてください",
    });
  }
}

// configオブジェクトは、このミドルウェアをどのルートに適用するかを指定
// matcherの配列にリストされているURLパターンにアクセスがあった時に、上で定義したmiddleware関数が実行
export const config = {
  matcher: [
    "/api/item/create",
    "/api/item/update/:path*",
    "/api/item/delete/:path*",
  ],
};
