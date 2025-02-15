import { NextApiRequest, NextApiResponse } from "next";
import pool from "@/lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ status: 405, message: "Method not allowed" });
  }

  try {
    // 创建 anonymous 表（如果不存在）
    const createAnonymousTableQuery = `
      CREATE TABLE IF NOT EXISTS anonymous (
        id INT AUTO_INCREMENT PRIMARY KEY,
        question VARCHAR(100) NOT NULL,
        answer VARCHAR(1000),
        time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // 创建 users 表（如果不存在）
    const createUsersTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255),
        email VARCHAR(255) UNIQUE,
        image VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await pool.query(createAnonymousTableQuery);
    await pool.query(createUsersTableQuery);

    res.status(200).json({ status: 200, message: "Database setup complete" });
  } catch (error) {
    res.status(500).json({ status: 500, message: "Error", error });
  }
}
