-- Migration: Add enableEmailLogin column to Employees table
-- This allows controlling whether employees can use email/password login

ALTER TABLE "Employees" 
ADD COLUMN IF NOT EXISTS "enableEmailLogin" BOOLEAN DEFAULT true;

-- Update existing admin employee to have email login enabled
UPDATE "Employees" 
SET "enableEmailLogin" = true 
WHERE "id" = 'admin-001' AND "enableEmailLogin" IS NULL;

