-- AlterTable
ALTER TABLE "User" ADD COLUMN     "otp" VARCHAR(6),
ADD COLUMN     "otpExpiresAt" TIMESTAMP(6),
ADD COLUMN     "otpVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "tokens" JSON;
