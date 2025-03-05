import {NextApiRequest, NextApiResponse} from 'next';
import pool from "@/lib/db";
import {getServerSession} from "next-auth/next"
import {authOptions} from "@/pages/api/auth/[...nextauth]"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Fetch session
  const session = await getServerSession(req, res, authOptions);

  // Method GET (Get all the data)
  if (req.method === 'GET') {
    try {
      // Query data from SQL
      const [data] = await pool.query("SELECT * FROM anonymous")
      // Output data from SQL
      res.status(200).json({
        status: 200,
        data,
      })
      // If error occurs
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // Return error message
      res.status(500).json({
        status: 500,
        message: 'Internal Server Error'
      })
    }

  } else if (req.method === "POST") {
    try {
      const {question, answer} = req.body;

      if (!question) {
        return res.status(400).json({message: "Missing required fields"});
      }

      if (session) {
        const query = "INSERT INTO anonymous (question, answer) VALUE (?,?)"
        const values = [question, answer];

        await pool.query(query, values);
        res.status(200).json({message: "Question added successfully", question: question});
      }

      const query = "INSERT INTO anonymous (question) VALUE (?,?)"
      const values = [question];

      await pool.query(query, values);
      res.status(200).json({message: "Question added successfully", question: question});
    } catch (error) {
      console.error(error);
      res.status(500).json({message: "Internal Server Error"});
    }
  } else {
      // Judge if the user authorized
      if (session) {
        // Authorized
        if (req.method === "PUT") {
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
      } else {
        // Judge if method is POST / PUT / DELETE
        if (req.method === "POST" || req.method === "PUT" || req.method === "DELETE") {
          // Return Not Authorized
          res.status(401).json({
            status: 401,
            message: 'Not Authorized'
          })
        } else {
          // Return Method Not Allow
          res.status(405).json({
            status: 405,
            message: 'Method Not Allowed'
          })
        }
      }
    }
  }