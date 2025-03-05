import {useEffect, useState} from "react";
import {Dialog, DialogBackdrop, DialogPanel, DialogTitle} from "@headlessui/react";

interface DialogFormsProps {
  id: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function DialogForms({id, isOpen, onClose}: DialogFormsProps) {
  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      if (isOpen) { // Check if the dialog is open
        if (id === 0) {
          setQuestion(""); // Changed from null to empty string to match the type
          setAnswer("");
        } else {
          try {
            const response = await fetch(`/api/question/${id}`);
            const data = await response.json();
            const {question, answer} = data;
            setQuestion(question || "");
            setAnswer(answer || "");
          } catch (error) {
            console.error("Error fetching data: ", error);
          }
        }
      }
    };

    fetchData();
  }, [id, isOpen]);

  // Submit the data
  const handleSubmit = async () => {
    if (!question) {
      alert("Question is required.");
      return;
    }

    if (id === 0) {
      try {
        const response = await fetch(`/api/data`, {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({question: question, answer: answer || null}),
        })

        if (!response.ok) throw new Error("Fail to submit data");

        alert("Data submitted successfully.");
        onClose();
        window.location.reload();
      } catch (error) {
        console.error("Error fetching data: ", error);
        alert("Fail to submit data");
      }
    } else if (id !== 0) {
      try {
        const response = await fetch("/api/data", {
          method: "PUT",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({id: id, question: question, answer: answer || null}),
        });

        if (!response.ok) throw new Error("Failed to submit data");

        alert("Data submitted successfully!");
        onClose();
        // Optionally reload the page
        window.location.reload();
      } catch (error) {
        console.error("Error submitting data:", error);
        alert("Error submitting answer.");
      }
    }
  };

  // const handleDelete
  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/data`, {
        method: "DELETE",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({id}),
      })

      if (!response.ok) throw new Error("Fail to submit data");

      alert("Data submitted successfully!");
      onClose();
      window.location.reload();
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Error deleting question");
    }
  }

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-10">
      <DialogBackdrop className="fixed inset-0 bg-gray-500/75"/>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            className="relative transform overflow-hidden rounded-lg bg-white px-6 py-5 text-left shadow-xl sm:w-full sm:max-w-lg">
            <div>
              <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                Answer the Question
              </DialogTitle>
              <ul role="list" className="divide-y divide-gray-200">
                {/* ID Field */}
                <li className="py-4">
                  <label className="block text-sm font-medium text-gray-900">ID</label>
                  <div className="mt-2">
                    <input
                      value={id}
                      type="text"
                      disabled
                      className="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-gray-500"
                    />
                  </div>
                </li>
                {/* Question Field */}
                <li className="py-4">
                  <label className="block text-sm font-medium text-gray-900">
                    Question <span className="text-red-600">*</span>
                  </label>
                  <div className="mt-2">
                    <input
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      type="text"
                      placeholder="Enter your question"
                      className="block w-full rounded-md bg-white px-3 py-1.5 border text-gray-900 focus:outline-indigo-600"
                    />
                  </div>
                </li>
                {/* Answer Input */}
                <li className="py-4">
                  <label className="block text-sm font-medium text-gray-900">Answer</label>
                  <div className="mt-2">
                    <input
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      type="text"
                      placeholder="Your answer (optional)"
                      className="block w-full rounded-md border px-3 py-1.5 text-gray-900 focus:outline-indigo-600"
                    />
                  </div>
                </li>
              </ul>
              {/* Buttons */}
              <div className="mt-4 flex justify-end">
                <button
                  onClick={handleSubmit}
                  className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                >
                  Submit
                </button>
                <button
                  onClick={handleDelete}
                  className="inline-flex items-center gap-x-1.5 rounded-md bg-red-600 ml-2 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}