import axios from "axios";

const API_URL = "https://your-backend-api.com/attendance"; // Replace with your actual API

// Fetch all attendance records
export const getAttendanceRecords = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

// Add a new attendance record
export const addAttendanceRecord = async (attendanceData) => {
    const response = await axios.post(API_URL, attendanceData);
    return response.data;
};

// Update an existing attendance record
export const updateAttendanceRecord = async (id, updatedData) => {
    const response = await axios.put(`${API_URL}/${id}`, updatedData);
    return response.data;
};

// Delete an attendance record
export const deleteAttendanceRecord = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};
