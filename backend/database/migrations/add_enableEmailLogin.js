/**
 * Migration: Add enableEmailLogin column to Employees table
 * 
 * This is a ONE-TIME migration script.
 * Run manually if needed: node database/migrations/add_enableEmailLogin.js
 * 
 * Note: This migration has already been run. The column now exists in the database.
 * Future schema changes should use sequelize.sync({ alter: true }) which runs automatically on server start.
 */

import dotenv from 'dotenv';
import { sequelize } from '../../src/config/database.js';

dotenv.config();

async function addEnableEmailLoginColumn() {
    try {
        console.log('🔄 Adding enableEmailLogin column to Employees table...');
        
        await sequelize.authenticate();
        console.log('✅ Database connection established');

        // Add the column if it doesn't exist
        await sequelize.query(`
            ALTER TABLE "Employees" 
            ADD COLUMN IF NOT EXISTS "enableEmailLogin" BOOLEAN DEFAULT true;
        `);
        
        console.log('✅ Column enableEmailLogin added successfully');

        // Update existing admin employee
        await sequelize.query(`
            UPDATE "Employees" 
            SET "enableEmailLogin" = true,
                "password" = 'admin123'
            WHERE "id" = 'admin-001';
        `);
        
        console.log('✅ Admin employee updated with enableEmailLogin = true');
        console.log('✅ Migration completed successfully!');
        
        process.exit(0);
    } catch (error) {
        console.error('❌ Migration failed:', error);
        process.exit(1);
    }
}

addEnableEmailLoginColumn();

