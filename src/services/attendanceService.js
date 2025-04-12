const STORAGE_KEY = "attendanceRecords";

// Helper to load attendance records from localStorage
const loadAttendanceRecords = () => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
};

// Helper to save attendance records to localStorage
const saveAttendanceRecords = (records) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
};

// Fetch all attendance records
export const getAttendanceRecords = async () => {
    return loadAttendanceRecords();
};

// Add a new attendance record
export const addAttendanceRecord = async (attendanceData) => {
    const records = loadAttendanceRecords();
    const newRecord = {
        ...attendanceData,
        id: Date.now(), // Unique ID for the record
    };
    records.push(newRecord);
    saveAttendanceRecords(records);
    return newRecord;
};

// Update an existing attendance record
export const updateAttendanceRecord = async (id, updatedData) => {
    const records = loadAttendanceRecords();
    const updatedRecords = records.map((record) =>
        record.id === id ? { ...record, ...updatedData } : record
    );
    saveAttendanceRecords(updatedRecords);
    return updatedData;
};

// Delete an attendance record
export const deleteAttendanceRecord = async (id) => {
    const records = loadAttendanceRecords();
    const updatedRecords = records.filter((record) => record.id !== id);
    saveAttendanceRecords(updatedRecords);
    return { success: true };
};
