import { Router } from "express";
import {
  AllUsers,
  SingleUsers,
  AllSellers,
} from "../controllers/admin.controllers.js";

const AdminRouter = Router();

AdminRouter.get("/", (req, res) => {
  res.send("Admin Dashboard");
});

AdminRouter.get("/all-users", AllUsers);
AdminRouter.get("/single-user/:id", SingleUsers);
AdminRouter.get("/all-sellers", AllSellers);

export default AdminRouter;
