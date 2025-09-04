import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  loginUserController,
  logoutUserController,
  refreshUserSessionController,
  registerUserController,
  sendResetEmailController,
} from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';
import { registerSchema } from '../validation/registerSchema.js';
import { Router } from 'express';
import { loginSchema } from '../validation/loginSchema.js';
import { requestResetEmailSchema } from '../validation/requestResetEmailSchema.js';

const router = Router();

// Реєстрація
router.post(
  '/register',
  validateBody(registerSchema),
  ctrlWrapper(registerUserController),
);

// Логін користувача
router.post(
  '/login',
  validateBody(loginSchema),
  ctrlWrapper(loginUserController),
);

// Оновлення сесії (access token через refresh token)
router.post('/refresh', ctrlWrapper(refreshUserSessionController));

// Логаут користувача
router.post('/logout', ctrlWrapper(logoutUserController));

// requestResetToken
router.post(
  '/send-reset-email',
  validateBody(requestResetEmailSchema),
  ctrlWrapper(sendResetEmailController),
);

export default router;
