import { NextApiRequest, NextApiResponse } from 'next';
import pool from "@/lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // GET DATA
  if (req.method === "GET") {
    try {
      // const the data data
      const [data] = await pool.query("SELECT * FROM anonymous");
      res.status(200).json({
        status: 200,
        data,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
    // POST DATA
  }  else if (req.method === "POST") {
    try {
      const { question } = req.body;

      if (!question) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const query = "INSERT INTO anonymous (question) VALUE (?)"
      const values = [question];

      await pool.query(query, values);
      res.status(200).json({ message: "Question added successfully", question: question });
    } catch (error) {
      console.error("Database Error:", error);
      res.status(500).json({message: "Internal Server Error"});
    }
  } else {
    res.status(405).json({ status: 405, message: "Method doesn't allow" });
  }
}