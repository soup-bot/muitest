import React from "react";
import { useState, useEffect } from "react";
import { FaAlignRight } from "react-icons/fa";
import { FaAlignLeft } from "react-icons/fa";
import { useNavigation } from "@remix-run/react";

const TextAreaWithCount = ({
  text,
  setText,
  numMessages,
  setNumMessages,
  inputType,
}) => {
  const [textDirection, setTextDirection] = useState("ltr");
  const navigation = useNavigation();
  const rtlTextDirection = () => {
    // Toggle the text direction between "ltr" and "rtl"
    setTextDirection("rtl");
  };
  const ltrTextDirection = () => {
    // Toggle the text direction between "ltr" and "rtl"
    setTextDirection("ltr");
  };

  const calculateMessages = (text) => {
    const gsm7Chars = new Set(
      " @£$¥èéùìòÇØøÅåΔ_ΦΓΛΩΠΨΣΘΞÆæßÉ !\"#¤%&'()*+,-./0123456789:;<=>?ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    );
    const ucs2Chars = new Set(text);

    const isGsm7 = [...ucs2Chars].every((char) => gsm7Chars.has(char));
    const charCount = text.length;

    if (isGsm7) {
      // Calculate messages for GSM-7
      if (charCount <= 160) {
        setNumMessages(1);
      } else {
        setNumMessages(Math.ceil(charCount / (160 - 7)));
      }
    } else {
      if (charCount <= 70) {
        setNumMessages(1);
      } else {
        // Calculate messages for UCS-2
        setNumMessages(Math.ceil(charCount / (70 - 3)));
      }
    }
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  useEffect(() => {
    calculateMessages(text);
  }, [text]);

  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between mb-1">
        <label
          htmlFor="message"
          className="block mb-2 text-l font-medium text-gray-900 dark:text-slate-300"
        >
          Your message
        </label>

        <div>
          <button
            type="button"
            onClick={ltrTextDirection}
            className={` ${
              textDirection === "ltr"
                ? "bg-secondary/50 dark:bg-secondary/60 dark:text-white text-secondary"
                : "text-slate-300 dark:text-slate-800 "
            } p-2 border rounded-l-lg dark:bg-slate-700 hover:bg-secondary/20 dark:hover:bg-secondary/20 transition dark:border-slate-800 `}
          >
            <FaAlignLeft />
          </button>
          <button
            type="button"
            onClick={rtlTextDirection}
            className={` ${
              textDirection === "rtl"
                ? "bg-secondary/50 dark:bg-secondary/60 dark:text-white text-secondary"
                : "text-slate-300 dark:text-slate-800"
            } p-2 border rounded-r-lg dark:bg-slate-700 hover:bg-secondary/20 dark:hover:bg-secondary/20 transition dark:border-slate-800 `}
          >
            <FaAlignRight />
          </button>
        </div>
      </div>

      <textarea
        style={{ direction: textDirection }}
        disabled={navigation.state === "submitting"}
        value={text}
        onChange={handleTextChange}
        name="text"
        id="message"
        rows="14"
        maxLength="1530"
        className="disabled:opacity-50 resize-none block p-2.5 w-full text-sm text-gray-900  bg-gray-50 rounded-lg border border-gray-300 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-600"
        placeholder={
          textDirection === "rtl"
            ? "ބޭނުންފުޅުވާ މެސެޖު ލިޔުއްވާ.."
            : "Write your message here..."
        }
      ></textarea>

      <div className="justify-between flex-wrap align-middle   rounded-md  dark:text-slate-200 mt-2">
        <div className="flex font-medium text-sm justify-between p-2 ">
          <p className="">
            {text.length} characters used
            {inputType === "file" && <span>*</span>}
          </p>
          <p className={`${numMessages > 10 ? "text-red-600 font-black" : ""}`}>
            {numMessages}/10 messages
            {inputType === "file" && <span>*</span>}
          </p>
        </div>
      </div>

      <div>
        {inputType === "file" && (
          <p className="text-sm mb-3 dark:text-slate-400 text-gray-400">
            *Message/Charge count may vary based on the length of your file data
          </p>
        )}
      </div>
    </div>
  );
};

export default TextAreaWithCount;
