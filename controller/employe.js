import errorHandler from "../middleware/error.js";
import Emp from "../model/employee.model.js";
import generateSixDigitNumber from "./index.js";
const EmployeData = {
  CreateEmploye: async (req, res) => {
    try {
      const { name, joiningDate, salary } = req.body;
      if (!name || !joiningDate || !salary) {
        return res.status(400).json({ message: "Invalid Request Employe" });
      }
      const employeeId = generateSixDigitNumber();
      const createEmp = await Emp.create({
        name,
        employeId: employeeId,
        joiningDate,
        salary,
      });
      const savedEmployee = await createEmp.save();
      res.status(201).json(savedEmployee);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  GetAllEmploye: async (req, res) => {
    try {
      const allEmployees = await Emp.find({
        employeId: { $ne: null },
      });

      if (allEmployees.length === 0) {
        return res.status(404).json({ message: "No employees found." });
      }
      res.status(200).json(allEmployees);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  UpdateEmploye: async (req, res) => {
    try {
      const { name, salary } = req.body;
      const { employeId } = req.params;
      const updatedEmployee = await Emp.findOneAndUpdate(
        employeId,
        { name, salary },
        { new: true }
      );

      console.log(updatedEmployee, "iiiiiiiiiiiiiii");

      if (!updatedEmployee) {
        return res.status(404).json({ message: "Employee not found." });
      }
      res
        .status(200)
        .json({ message: `Employe UpdateSuccessfully${updatedEmployee}` });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  DeleteEmploye: async (req, res) => {
    try {
      const { employeId } = req.params;
      const deletedEmployee = await Emp.findOneAndDelete(employeId);

      console.log(deletedEmployee);

      if (!deletedEmployee) {
        return res.status(404).json({ message: "Employee not found." });
      }
      res
        .status(200)
        .json({ message: "Employee successfully deleted.", deletedEmployee });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default EmployeData;
