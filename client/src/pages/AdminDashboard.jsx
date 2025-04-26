import React, { useEffect, useRef, useState } from 'react';
import axios from '../axios';
import { Bar } from 'react-chartjs-2';
import { CSVLink } from 'react-csv';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ToastContainer, toast } from 'react-toastify';
import { DateRange } from 'react-date-range';
import { format } from 'date-fns';
import LoadingSpinner from '../components/LoadingSpinner';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import 'react-toastify/dist/ReactToastify.css';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [monthlyData, setMonthlyData] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(new Date().setDate(new Date().getDate() - 30)),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 5;
  const dashboardRef = useRef(null);

  useEffect(() => {
    fetchBookings();
    const interval = setInterval(fetchBookings, 20000); // 🔥 Auto-refresh every 20s
    return () => clearInterval(interval);
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get('/bookings');
      setBookings(res.data);
      setLoading(false);

      const monthlyCounts = Array(12).fill(0);
      res.data.forEach((booking) => {
        const month = new Date(booking.date).getMonth();
        monthlyCounts[month]++;
      });

      setMonthlyData({
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Bookings per Month',
            data: monthlyCounts,
            backgroundColor: 'rgba(59, 130, 246, 0.7)',
          },
        ],
      });
    } catch (err) {
      console.error('Failed to fetch bookings', err);
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`/bookings/${id}/status`, { status: newStatus });
      fetchBookings();
      toast.success('Booking status updated successfully!');
    } catch (err) {
      console.error('Failed to update status', err);
      toast.error('Failed to update booking status');
    }
  };

  const handleDeleteBooking = async (id) => {
    if (!window.confirm('Are you sure you want to delete this booking?')) return;
    try {
      await axios.delete(`/bookings/${id}`);
      fetchBookings();
      toast.success('Booking deleted successfully!');
    } catch (err) {
      console.error('Failed to delete booking', err);
      toast.error('Failed to delete booking');
    }
  };

  const handleExportPDF = () => {
    const input = dashboardRef.current;
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('dashboard.pdf');
      toast.success('Dashboard exported as PDF!');
    });
  };

  const filteredBookings = bookings
    .filter(b => b.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(b => (statusFilter === 'All' ? true : b.status === statusFilter))
    .filter(b => {
      const bookingDate = new Date(b.date);
      const start = dateRange[0].startDate;
      const end = dateRange[0].endDate;
      return bookingDate >= start && bookingDate <= end;
    });

  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = filteredBookings.slice(indexOfFirstBooking, indexOfLastBooking);
  const totalPages = Math.ceil(filteredBookings.length / bookingsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  const pendingCount = bookings.filter(b => b.status === 'Pending').length;
  const approvedCount = bookings.filter(b => b.status === 'Approved').length;
  const completedCount = bookings.filter(b => b.status === 'Completed').length;

  const csvHeaders = [
    { label: "Name", key: "name" },
    { label: "Email", key: "email" },
    { label: "Pickup Location", key: "pickupLocation" },
    { label: "Dropoff Location", key: "dropoffLocation" },
    { label: "Date", key: "date" },
    { label: "Status", key: "status" },
    { label: "Message", key: "message" },
  ];

  return (
    <div className="min-h-screen p-8 bg-gray-100" ref={dashboardRef}>
      <ToastContainer position="top-center" />
      <h1 className="text-4xl font-bold text-center mb-10">Admin Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
        {/* Pending */}
        <div className="bg-yellow-100 p-6 rounded-lg text-center shadow">
          <h3 className="text-xl font-bold text-yellow-700">Pending</h3>
          <p className="text-3xl font-extrabold">{pendingCount}</p>
        </div>
        {/* Approved */}
        <div className="bg-blue-100 p-6 rounded-lg text-center shadow">
          <h3 className="text-xl font-bold text-blue-700">Approved</h3>
          <p className="text-3xl font-extrabold">{approvedCount}</p>
        </div>
        {/* Completed */}
        <div className="bg-green-100 p-6 rounded-lg text-center shadow">
          <h3 className="text-xl font-bold text-green-700">Completed</h3>
          <p className="text-3xl font-extrabold">{completedCount}</p>
        </div>
      </div>

      {/* Search + Filters + Export */}
      <div className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by Customer Name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-4 py-2 rounded w-full md:w-1/4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border px-4 py-2 rounded w-full md:w-1/6 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Completed">Completed</option>
        </select>
        <button
          onClick={() => setShowDatePicker(!showDatePicker)}
          className="bg-gray-600 text-white px-4 py-2 rounded shadow hover:bg-gray-700"
        >
          {`${format(dateRange[0].startDate, 'MMM dd')} - ${format(dateRange[0].endDate, 'MMM dd')}`}
        </button>

        <div className="flex flex-wrap gap-2">
          <CSVLink
            data={filteredBookings}
            headers={csvHeaders}
            filename="bookings.csv"
            className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
          >
            Export CSV
          </CSVLink>
          <button
            onClick={handleExportPDF}
            className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700"
          >
            Export PDF
          </button>
        </div>
      </div>

      {showDatePicker && (
        <div className="flex justify-center mb-6">
          <DateRange
            editableDateInputs
            onChange={(item) => setDateRange([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={dateRange}
            className="shadow-lg rounded"
          />
        </div>
      )}

      {/* Bookings Table */}
      {loading ? (
        <LoadingSpinner />
      ) : bookings.length === 0 ? (
        <div className="text-center text-gray-500">No bookings found.</div>
      ) : (
        <>
          <div className="overflow-x-auto w-full">
            <table className="min-w-full bg-white rounded shadow-lg">
              <thead>
                <tr className="bg-blue-800 text-white">
                  <th className="py-3 px-6 text-left">Name</th>
                  <th className="py-3 px-6 text-left">Pickup</th>
                  <th className="py-3 px-6 text-left">Dropoff</th>
                  <th className="py-3 px-6 text-left">Date</th>
                  <th className="py-3 px-6 text-left">Status</th>
                  <th className="py-3 px-6 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentBookings.map((booking) => (
                  <tr key={booking._id} className="border-b">
                    <td className="py-4 px-6">{booking.name}</td>
                    <td className="py-4 px-6">{booking.pickupLocation}</td>
                    <td className="py-4 px-6">{booking.dropoffLocation}</td>
                    <td className="py-4 px-6">{new Date(booking.date).toLocaleDateString()}</td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        booking.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : booking.status === 'Approved'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 flex flex-wrap gap-2">
                      <select
                        value={booking.status}
                        onChange={(e) => handleStatusChange(booking._id, e.target.value)}
                        className="border rounded px-2 py-1"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Completed">Completed</option>
                      </select>
                      <button
                        onClick={() => handleDeleteBooking(booking._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-gray-700 font-semibold">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>

          {/* Chart */}
          <div className="bg-white p-6 rounded shadow-lg mt-10 w-full overflow-x-auto">
            <h2 className="text-2xl font-bold mb-4 text-center">Monthly Booking Analytics</h2>
            <Bar
              data={monthlyData}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: 'top' },
                  title: { display: true, text: 'Bookings Overview (Monthly)' },
                },
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
