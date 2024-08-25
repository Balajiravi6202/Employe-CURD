import express, { Router } from "express";
import userController from "../controller/user.controller.js";
import authenticateToken from "../middleware/auth.js";
import EmployeData from "../controller/employe.js";

const routes = express.Router();

routes.post("/user", userController.UserHand);
routes.post("/login", userController.login);
routes.get("/profile", authenticateToken, (req, res) => {
  res.status(200).json({ message: `Welcome ${req.user.username}!` });
});

routes.post("/employe", EmployeData.CreateEmploye);
routes.get("/allemploye", EmployeData.GetAllEmploye);
routes.put("/updateemp", EmployeData.UpdateEmploye);
routes.delete("/deleteemp", EmployeData.DeleteEmploye);

export default routes;
