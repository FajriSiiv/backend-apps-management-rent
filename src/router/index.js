import express from 'express';
import { getUsers, loginLimiter, loginUser, logoutUser, registerUser, validateRegister, verifyRoute } from '../controllers/users.js';
import checkNotLoggedIn from '../middleware/checkNotLogged.js';
import { addKos, deleteKos, getAllKos, getKosById, updateKosById } from '../controllers/kos.js';
import { authenticateUser } from '../middleware/authUser.js';
import { bookingKos } from '../controllers/booking.js';
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
router.get(API_ROUTER + '/kos', getAllKos)
router.get(API_ROUTER + '/kos/:id', getKosById)
router.put(API_ROUTER + '/kos/:id', authenticateUser, updateKosById)
router.delete(API_ROUTER + '/kos/:id', authenticateUser, deleteKos)

// BOOKING
router.post(API_ROUTER + '/booking', authenticateUser, bookingKos)

export default router;

