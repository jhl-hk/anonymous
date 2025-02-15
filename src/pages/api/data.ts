import {NextApiRequest, NextApiResponse} from 'next';
import pool from "@/lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // GET DATA
  if (req.method === "GET") {
    try {
      const [data] = await pool.query("SELECT * FROM anonymous");
      res.status(200).json({
        status: 200,
        data,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({status: 500, message: "Internal Server Error"});
    }

    // POST
  } else if (req.method === "POST") {
    try {
      const {question, answer} = req.body;

      if (!question) {
        return res.status(400).json({message: "Missing required fields"});
      }

      const query = "INSERT INTO anonymous (question, answer) VALUE (?,?)"
      const values = [question, answer];

      await pool.query(query, values);
      res.status(200).json({message: "Question added successfully", question: question});
    } catch (error) {
      console.error(error);
      res.status(500).json({message: "Internal Server Error"});
    }

    // UPDATE
  } else if (req.method === "PUT") {
    try {
      const {id, answer, question} = req.body;

      if (!id || !question) {
        return res.status(400).json({message: "Missing required fields"});
      }

      const query = "UPDATE anonymous SET answer = ?, question = ? WHERE id = ?"
      const values = [answer, question, id];

      await pool.query(query, values);
      res.status(200).json({message: "Answer Updated", id: id})
    } catch (error) {
      console.error(error);
      res.status(500).json({message: "Internal Server Error"});
    }

    // DELETE
  } else if (req.method === "DELETE") {
    try {
      const {id} = req.body;

      if (!id) {
        return res.status(400).json({message: "Missing required fields"});
      }

      const query = "DELETE FROM anonymous WHERE id = ?"
      const value = [id];

      await pool.query(query, value);
      res.status(200).json({message: "Deleted successfully", id: id})
    } catch (error) {
      console.error(error);
      res.status(500).json({message: "Internal Server Error"});
    }

  } else {
    res.status(405).json({status: 405, message: "Method doesn't allow"});
  }
}