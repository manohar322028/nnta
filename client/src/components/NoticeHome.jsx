import React from "react";
import { FaFilePdf } from "react-icons/fa";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const NoticeHome = ({ notices }) => {
  return (
    <div className="container mx-auto px-4 py-2">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border-collapse border border-gray-500">
          <thead>
            <tr>
              <th className="border border-gray-500 px-6 py-2 bg-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-3/5">
                Title
              </th>
              <th className="border border-gray-500 px-4 py-2 bg-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-1/5">
                Date
              </th>
              <th className="border border-gray-500 px-4 py-2 bg-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-1/5">
                Download
              </th>
            </tr>
          </thead>
          <tbody>
            {notices.map((notice, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-gray-100" : "bg-gray-50"}
              >
                <td className="border border-gray-500 px-6 py-2 text-sm">
                  {notice.title}
                </td>
                <td className="border border-gray-500 px-4 py-2 text-sm">
                  {formatDate(notice.updatedAt)}
                </td>
                <td className="border border-gray-500 px-4 py-2 text-sm">
                  <a
                    href={`/files/${notice.pdf}`}
                    target="_blank"
                    className="flex items-center text-blue-500 hover:underline"
                  >
                    <FaFilePdf className="mr-1" /> PDF
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NoticeHome;
