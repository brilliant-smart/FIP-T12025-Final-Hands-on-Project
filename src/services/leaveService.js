// leaveService.js

const STORAGE_KEY = "leaveRequests";

// Helper to load leave requests from localStorage
const loadLeaveRequests = () => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
};

// Helper to save leave requests to localStorage
const saveLeaveRequests = (leaveRequests) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(leaveRequests));
};

// Get all leave requests
export const getLeaveRequests = async () => {
    return loadLeaveRequests();
};

// Add a new leave request
export const addLeaveRequest = async (leaveData) => {
    const leaveRequests = loadLeaveRequests();
    const newLeaveRequest = {
        ...leaveData,
        id: Date.now(), // Unique ID for internal use
    };
    leaveRequests.push(newLeaveRequest);
    saveLeaveRequests(leaveRequests);
    return newLeaveRequest;
};

// Update an existing leave request
export const updateLeaveRequest = async (id, updatedData) => {
    let leaveRequests = loadLeaveRequests();
    leaveRequests = leaveRequests.map((leave) =>
        leave.id === id ? { ...leave, ...updatedData } : leave
    );
    saveLeaveRequests(leaveRequests);
    return updatedData;
};

// Delete a leave request
export const deleteLeaveRequest = async (id) => {
    const leaveRequests = loadLeaveRequests().filter((leave) => leave.id !== id);
    saveLeaveRequests(leaveRequests);
    return { success: true };
};
