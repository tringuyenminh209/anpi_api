const express = require("express");
const admin = require("firebase-admin");
const cors = require("cors");

const app = express();
const port = 3000;


// Firebaseの構成ファイルをインポート
// const serviceAccount = require("./firebase-config.json");
require("dotenv").config(); 
const serviceAccount = {
  type: process.env.TYPE,
  project_id: process.env.PROJECT_ID,
  private_key_id: process.env.PRIVATE_KEY_ID,
  private_key: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: process.env.CLIENT_EMAIL,
  client_id: process.env.CLIENT_ID,
  auth_uri: process.env.AUTH_URI,
  token_uri: process.env.TOKEN_URI,
  auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
  universe_domain: process.env.UNIVERSE_DOMAIN,
};

// Firebase Adminの初期化
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

app.use(cors());
app.use(express.json());

// Firestoreから全ての部署表を取得
// ルート: 部署表の登録API
app.get("/api/departments", async(req, res) => {
  try {
    const snapshot = await db.collection("departments").get();
    const reports = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    res.json(reports);
  } catch (error) {
    console.error("読み込みエラー:", error);
    res.status(500).json({ error: "データの取得に失敗しました。" });
  }
})

// Firestoreから全ての社員情報を取得
// ルート: 社員情報の登録API
app.get("/api/employees", async(req, res) => {
  try {
    const snapshot = await db.collection("employees").get();
    const reports = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    res.json(reports);
  } catch (error) {
    console.error("読み込みエラー:", error);
    res.status(500).json({ error: "データの取得に失敗しました。" });
  }
})

// ルート: 安否報告の登録API
// app.post("/api/safety-report", async (req, res) => {
//   try {
//     const { user_id, department_id, is_safe, can_go_to_work, note } = req.body;

//     // 必須項目のチェック
//     if (!user_id || !department_id) {
//       return res.status(400).json({ error: "user_idまたはdepartment_idが不足しています。" });
//     }

//     // ドキュメントIDの生成（例：report_uid_001_20250424）
//     const today = new Date().toISOString().slice(0, 10).replace(/-/g, "");
//     const docId = `report_${user_id}_${today}`;

//     // Firestoreにデータを登録
//     await db.collection("safety_reports").doc(docId).set({
//       user_id,
//       department_id,
//       is_safe,
//       can_go_to_work,
//       note,
//       updated_at: admin.firestore.Timestamp.now()
//     });

//     res.status(200).json({ message: "安否報告が正常に登録されました。" });
//   } catch (error) {
//     console.error("エラー内容:", error);
//     res.status(500).json({ error: "サーバーエラーが発生しました。" });
//   }
// });



// Firestoreから全ての安否報告を取得
app.get("/api/safety-status", async (req, res) => {
  try {
    const snapshot = await db.collection("safety_status").get();
    const reports = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    res.json(reports);
  } catch (error) {
    console.error("読み込みエラー:", error);
    res.status(500).json({ error: "データの取得に失敗しました。" });
  }
});

// Firestoreから全ての役割を取得
app.get("/api/roles", async (req, res) => {
  try {
    const snapshot = await db.collection("roles").get();
    const reports = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    res.json(reports);
  } catch (error) {
    console.error("読み込みエラー:", error);
    res.status(500).json({ error: "データの取得に失敗しました。" });
  }
});

app.use(express.json());

const AUTH_TOKEN = process.env.AUTH_TOKEN || "abc123";

function authenticateToken(req, res, next) {
  const token = req.headers.authorization;
  if (token !== AUTH_TOKEN) {
    return res.status(401).json({ error: "アクセス権限がありません。" });
  }
  next();
}

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  if (email === "" && password === "") {
    res.json({ token: AUTH_TOKEN });
  } else {
    res.status(401).json({ error: "メールアドレスまたはパスワードが正しくありません。" });
  }
});

app.get("/api/protected", authenticateToken, (req, res) => {
  res.json({ message: "このデータは認証されたユーザーのみアクセスできます。" });
});



// サーバーの起動
app.listen(port, () => {
  console.log(`安否APIは http://localhost:${port} で起動しています`);
});
