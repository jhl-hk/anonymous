import { NextApiRequest, NextApiResponse } from "next";
import pool from "@/lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ status: 405, message: "Method not allowed" });
  }

  try {
    // id INT AUTO_INCREMENT PRIMARY KEY: An integer id with auto increase with each row has a unique ID
    // question VARCHAR(100) NOT NULL: A string maximum with 100 character, and cannot be NULL
    // created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP: Automatically create a timestamp
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS anonymous (
        id INT AUTO_INCREMENT PRIMARY KEY,
        question VARCHAR(100) NOT NULL,
        answer VARCHAR(1000),
        time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await pool.query(createTableQuery);
    res.status(200).json({ status: 200, message: "Anonymous table generated" });
  } catch (error) {
    res.status(500).json({ status: 500, message: "Error", error });
  }
}
