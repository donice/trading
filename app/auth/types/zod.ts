import { z } from 'zod';

export const emailVerificationToken = z.object({
	fullName: z.string(),
	startDate: z.string().optional(),
	endDate: z.string().optional(),
	staffId: z.string(),
	group: z.string(),
	designation: z.string(),
	iat: z.number(),
	exp: z.number(),
	otp: z.string(),
	personalEmail: z.string().email(),
	phoneNumber: z.string().optional(),
	sharingExperties: z.string().optional(),
	currentLocation: z.string().optional(),
	password: z.string(),
});

export const alumniUserSchema = z.object({
	fullName: z.string(),
	startDate: z.string(),
	endDate: z.string(),
	verifiedEmail: z.string(),
	personalEmail: z.string().email(),
	phoneNumber: z.string(),
	sharingExperties: z.string(),
	currentLocation: z.string(),
	password: z.string(),
	role: z.enum(['alumni', 'staff(admin)', 'staff']),
	_id: z.any(),
	profileImage: z.string().optional(),
	email: z.string().email(),
});
