import React, { useState } from "react";
import Image from "next/image";
import { BsFileMinus, BsPlus } from "react-icons/bs";
import Layout from "../components/Layout/Layout";
import FaqsPic from "../public/Faqs2.png";
import { faqs } from "../utils/constants";
import { AiOutlineMinus } from "react-icons/ai";
const Faqs = () => {
  const [questionClicked, setQuestionClicked] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [disableAnswer, setDisableAnswer] = useState(true);
  const handleQuestion = (id) => {
    setActiveQuestion(id);
    setQuestionClicked(true);
    setDisableAnswer(!disableAnswer);
  };

  const handleQuestionClose = () => {
    setDisableAnswer(!disableAnswer);
    setQuestionClicked(false);
    setActiveQuestion(20);
  };

  return (
    <Layout title='layout'>
      <div className='mt-[90px] bgContact py-12'>
        <div className='grid grid-cols-1 px-4 md:px-12 lg:px-16 md:grid-cols-2 gap-6'>
          <div>
            <h2 className='font-bold text-4xl mb-3 text-[#333333]'>
              Frequently Asked Questions
            </h2>
            <p className='text-gray-500 text-sm mb-8'>
              Find answers to questions about your credit card account, billing
              statements, payments, managing your account online, and contacting
              us.
            </p>
            <div>
              <Image
                src={FaqsPic}
                alt='faqs'
                layout='responsive'
                className='scale-90'
              />
            </div>
          </div>
          <div className='space-y-3 mt-4'>
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className=' border border-solid border-indigo-500 customTransition'
              >
                <div
                  className='flex items-center gap-2 border-b border-solid customTransition border-indigo-400'
                  onClick={() => handleQuestion(faq.id)}
                >
                  <span className='bg-indigo-500 flex items-center justify-center h-12 w-4 mr-4'>
                    {disableAnswer && activeQuestion === faq.id ? (
                      <span onClick={() => handleQuestionClose(faq.id)}>
                        <AiOutlineMinus className='cursor-pointer' />
                      </span>
                    ) : (
                      <BsPlus />
                    )}
                  </span>
                  <span>{faq.question}</span>
                </div>

                {disableAnswer && (
                  <div
                    className={`customTransition flex  scale-100 px-2 rounded-b-lg transition-all duration-500 ease-linear ${
                      questionClicked && activeQuestion === faq.id
                        ? "flex  scale-100 px-2 rounded-b-lg transition-all duration-500 ease-linear"
                        : " h-0 scale-0 customTransition"
                    }`}
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Faqs;
