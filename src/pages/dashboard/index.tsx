'use client'

import DashFrame from "@/components/DashFrame";
import {useEffect, useState} from "react";
import DialogsForms from "@/components/DialogsForms";
import {useSession} from "next-auth/react"
import NotAuthorized from "@/components/NotAuthorized";

// Define a proper type for the question data
interface QuestionData {
  id: number; // Changed from string to number to match DialogsForms expectations
  question: string;
  answer: string;
}

export default function Dashboard() {
  // Query session status
  const {data: session} = useSession()

  // Use the proper type instead of any
  const [question, setQuestion] = useState<QuestionData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/data");
        const data = await response.json();
        setQuestion(data.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }

    fetchData();
  }, []);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<{ id: number }>({
    id: 0
  });

  // Open dialog and pass data
  const openDialog = (id: number | string) => {
    // Convert string id to number if needed
    const numericId = typeof id === 'string' ? parseInt(id, 10) : id;
    setSelectedData({ id: numericId });
    setIsDialogOpen(true);
  };

  if (session) {
    return (
      <DashFrame>
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-base font-semibold text-gray-900">Questions</h1>
              <p className="mt-2 text-sm text-gray-700">
                A list of all the questions.
              </p>
            </div>
            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
              <button
                type="button"
                onClick={() => openDialog(0)}
                className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add Questions
              </button>
            </div>
          </div>
          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black/5 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                        Questions
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Answers
                      </th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                    {question.map((data) => (
                      <tr key={data.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {data.question}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{data.answer}</td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <button
                            type="button"
                            onClick={() => openDialog(Number(data.id))}
                            className="rounded bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        <DialogsForms
          id={selectedData.id}
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
        />
      </DashFrame>
    )
  } else {
    return (
      <NotAuthorized />
    )
  }
}