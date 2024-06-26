import React from "react";
import Downloads from "../components/Downloads";
import { useState, useEffect } from "react";
import Pagination from "../components/Pagination";

export default function Notices() {
  const [notices, setNotices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchNotices = async () => {
      await fetch("/api/downloads")
        .then((res) => res.json())
        .then((data) => {
          data = data.sort(
            (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
          );
          setNotices(data);
        });
    };
    fetchNotices();
  }, []);

  // Get current news items
  const indexOfLastNotice = currentPage * itemsPerPage;
  const indexOfFirstNotice = indexOfLastNotice - itemsPerPage;
  const currentNotice = notices.slice(indexOfFirstNotice, indexOfLastNotice);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="container mx-auto px-4 pb-4">
        <h2 className="text-3xl font-bold mb-6 ml-4">Notices</h2>
        <Downloads notices={currentNotice} />
      </div>

      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={notices.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </>
  );
}
