import { FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function HelpCard() {
  return (
    <div className="w-full p-0  py-3  lg:p-3 lg:basis-1/3 text-slate-800">
      <div className="transition  w-full p-6 h-full bg-white   rounded-lg flex flex-col dark:bg-slate-800 border dark:border-slate-600">
        <p className="mb-3  text-slate-800  font-medium opacity-70 dark:text-slate-200">
          Help & Support
        </p>
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-hoverprim"></h5>
        <div>
          {" "}
          <a
            href="https://www.dhiraagu.com.mv/personal/support/faqs/voice-collaboration/bulk-sms"
            target="_blank"
            className="font-black text-secondary min-w-min"
          >
            FAQ
          </a>
        </div>

        <div className="bg-slate-100 dark:bg-slate-700 dark:text-slate-300 rounded-md px-5 mt-8 pt-2 justify-self-end w-full h-full flex flex-col justify-center border dark:border-slate-600">
          <p className="text-sm font-black text-slate-900 mb-3 dark:text-slate-200 ">
            Contact us
          </p>
          <div className="flex gap-2 p-2 align-middle">
            <div className="flex align-middle justify-center items-center text-ellipsis ">
              <MdEmail color="#d9440e" />
            </div>
            <p className="text-sm"> support@example.com </p>
          </div>
          <div className="flex gap-2 p-2 align-middle">
            <div className="flex align-middle justify-center items-center">
              <FaPhone color="#d9440e" />
            </div>
            <p className="text-sm"> XXX-XXX-XXXX </p>
          </div>
        </div>
      </div>
    </div>
  );
}
