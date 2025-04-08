// employeeService.js

const STORAGE_KEY = "employees";

// Helper to load employees from localStorage
const loadEmployees = () => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
};

// Helper to save employees to localStorage
const saveEmployees = (employees) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
};

// Generate next employee ID as "001", "002", etc.
export const generateEmployeeID = () => { // ✅ Export this function
    const employees = loadEmployees();
    const ids = employees.map(emp => parseInt(emp.employeeID)).filter(id => !isNaN(id));
    const nextID = ids.length > 0 ? Math.max(...ids) + 1 : 1;
    return String(nextID).padStart(3, "0");
};

// Get all employees
export const getEmployees = async () => {
    return loadEmployees();
};

// Add new employee with auto-generated employeeID
export const addEmployee = async (employeeData) => {
    const employees = loadEmployees();

    const newEmployee = {
        ...employeeData,
        id: Date.now(), // Unique ID for internal use
        employeeID: generateEmployeeID(), // Auto-generated employeeID (e.g., "001", "002")
    };

    const updatedEmployees = [...employees, newEmployee];
    saveEmployees(updatedEmployees);
    return newEmployee;
};

// Update an existing employee
export const updateEmployee = async (id, updatedData) => {
    const employees = loadEmployees();
    const updatedEmployees = employees.map(emp =>
        emp.id === id ? { ...emp, ...updatedData } : emp
    );
    saveEmployees(updatedEmployees);
    return updatedData;
};

// Delete an employee
export const deleteEmployee = async (id) => {
    const employees = loadEmployees();
    const updatedEmployees = employees.filter(emp => emp.id !== id);
    saveEmployees(updatedEmployees);
    return { success: true };
};
