import {NextApiRequest, NextApiResponse} from "next";
import pool from "@/lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // get query id
  const id = req.query.id;

  if (req.method === 'GET') {
    try {
      const query = "SELECT * FROM anonymous WHERE id = ?";
      const [data]: any = await pool.query(query, [id]);

      if (data.length === 0) {
        return res.status(404).json({ message: "Question not found" });
      }

      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({message: "Internal Server Error"});
    }
  } else {
    res.status(405).json({status: 404, message: "Method doesn't allow"});
  }
}