import { Sequelize, DataTypes } from 'sequelize';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Use SQLite for local development
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, 'database.sqlite'),
    logging: false
});

// Define Models

const Customer = sequelize.define('Customer', {
    id: { type: DataTypes.STRING, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    gstin: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    balance: { type: DataTypes.FLOAT, defaultValue: 0 }
});

const Invoice = sequelize.define('Invoice', {
    id: { type: DataTypes.STRING, primaryKey: true },
    number: { type: DataTypes.STRING, allowNull: false },
    date: { type: DataTypes.STRING, allowNull: false },
    dueDate: { type: DataTypes.STRING },
    customerId: { type: DataTypes.STRING, allowNull: false },
    customerName: { type: DataTypes.STRING },
    status: { type: DataTypes.STRING, defaultValue: 'Draft' },
    subTotal: { type: DataTypes.FLOAT, defaultValue: 0 },
    taxTotal: { type: DataTypes.FLOAT, defaultValue: 0 },
    total: { type: DataTypes.FLOAT, defaultValue: 0 }
});

const InvoiceItem = sequelize.define('InvoiceItem', {
    id: { type: DataTypes.STRING, primaryKey: true },
    invoiceId: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING },
    hsn: { type: DataTypes.STRING },
    quantity: { type: DataTypes.FLOAT },
    rate: { type: DataTypes.FLOAT },
    taxRate: { type: DataTypes.FLOAT },
    amount: { type: DataTypes.FLOAT }
});

const Ledger = sequelize.define('Ledger', {
    id: { type: DataTypes.STRING, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    type: { type: DataTypes.STRING }, // Asset, Liability, Income, Expense, Equity
    balance: { type: DataTypes.FLOAT, defaultValue: 0 }
});

const Transaction = sequelize.define('Transaction', {
    id: { type: DataTypes.STRING, primaryKey: true },
    date: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING },
    amount: { type: DataTypes.FLOAT, allowNull: false },
    type: { type: DataTypes.STRING }, // Debit / Credit
    ledgerId: { type: DataTypes.STRING, allowNull: false }
});

// Relationships
Customer.hasMany(Invoice, { foreignKey: 'customerId' });
Invoice.belongsTo(Customer, { foreignKey: 'customerId' });

Invoice.hasMany(InvoiceItem, { foreignKey: 'invoiceId', as: 'items' });
InvoiceItem.belongsTo(Invoice, { foreignKey: 'invoiceId' });

Ledger.hasMany(Transaction, { foreignKey: 'ledgerId' });
Transaction.belongsTo(Ledger, { foreignKey: 'ledgerId' });

const initDb = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await sequelize.sync({ alter: true }); // Update schema if changed
        console.log('Database synchronized.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

export { sequelize, initDb, Customer, Invoice, InvoiceItem, Ledger, Transaction };
