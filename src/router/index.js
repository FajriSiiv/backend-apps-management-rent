import express from 'express';
import { getUsers, loginLimiter, loginUser, logoutUser, registerUser, validateRegister, verifyRoute } from '../controllers/users.js';
import checkNotLoggedIn from '../middleware/checkNotLogged.js';
import { addKos } from '../controllers/kos.js';
import { authenticateUser } from '../middleware/authUser.js';
const router = express.Router();

const API_ROUTER = '/api/v1'

// USER
router.post(API_ROUTER + "/register", validateRegister, registerUser);
router.post(API_ROUTER + "/login", checkNotLoggedIn, loginUser);
router.post(API_ROUTER + "/logout", logoutUser);
router.get(API_ROUTER + "/me", verifyRoute);
router.get(API_ROUTER + "/get-user", getUsers);

// KOS
router.post(API_ROUTER + "/kos", authenticateUser, addKos);


export default router;

