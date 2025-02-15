'use client'

import {CheckCircleIcon} from '@heroicons/react/20/solid'
import Footer from '@/components/Footer'
import Banner from '@/components/Banner';
import {useEffect, useState} from "react";

export default function Index() {
  const [question, setQuestion] = useState<any[]>([]);

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

  const handleSubmit = async () => {
    if (!question) {
      alert("Question is required.");
      return
    }

    try {
      const response = await fetch(`/api/data`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({question: question}),
      })

      if (!response.ok) throw new Error ("Fail to submit data");

      alert("Data submitted successfully.");
      window.location.reload();
    } catch (error) {
      console.error("Error fetching data: ", error);
      alert("Fail to submit data");
    }
  }

  return (
    <div className="bg-gray-100">
      <Banner/>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl pt-8">
          <div className="relative">
            <label
              htmlFor="Question"
              className="absolute -top-2 left-2 inline-block rounded-lg bg-white px-1 text-xs font-medium text-gray-900"
            >
              Question
            </label>
            <div className="flex items-center gap-2"> {/* Flex container for alignment */}
              <input
                id="name"
                name="name"
                type="text"
                placeholder="How old are you?"
                className="flex-1 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
              />
              <button
                type="button"
                className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <CheckCircleIcon aria-hidden="true" className="-ml-0.5 size-5"/>

              </button>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-3xl">
          {/* Question and Answers */}
          <ul role="list" className="divide-y divide-gray-200">
            {question.map((data: { question: string; answer: string }) => (
              <li key={data.question} className="py-6">
                <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
                  <div className="px-4 py-5 sm:px-6">
                    <strong>Question: {data.question}</strong></div>
                  <div className="px-4 py-5 sm:p-6">
                    {data.answer}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer */}
      <Footer/>
    </div>
  )
}