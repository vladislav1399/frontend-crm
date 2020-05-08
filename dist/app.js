"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require('passport');
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const finance_service_1 = __importDefault(require("./shared/services/finance.service"));
const cron = require('node-cron');
const app = express_1.default();
// Паспорт авторизация
require('./middleware/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());
app.use('/uploads', express_1.default.static('uploads'));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
// Маршруты приложения
const setting_1 = __importDefault(require("./routes/setting"));
const auth_1 = __importDefault(require("./routes/auth"));
const category_1 = __importDefault(require("./routes/category"));
const state_1 = __importDefault(require("./routes/state"));
const cash_1 = __importDefault(require("./routes/cash"));
const cashless_1 = __importDefault(require("./routes/cashless"));
const expense_1 = __importDefault(require("./routes/expense"));
const income_1 = __importDefault(require("./routes/income"));
const product_1 = __importDefault(require("./routes/product"));
const balance_1 = __importDefault(require("./routes/balance"));
const brand_1 = __importDefault(require("./routes/brand"));
const purchase_1 = __importDefault(require("./routes/purchase"));
const supplier_1 = __importDefault(require("./routes/supplier"));
const sale_1 = __importDefault(require("./routes/sale"));
const client_1 = __importDefault(require("./routes/client"));
const chat_1 = __importDefault(require("./routes/chat"));
// import trafficRoutes from './routes/traffic'
// import novaPoshtaRoutes from './routes/novaposhta'
// import beautySpaceRoutes from './routes/beautyspace/beautyspace'
// import privateBankRoutes from './routes/privatbank'
// import smsRoutes from './routes/sms'
app.use('/api/setting', setting_1.default);
app.use('/api/login', auth_1.default);
app.use('/api/category', category_1.default);
app.use('/api/product', product_1.default);
app.use('/api/state', state_1.default);
app.use('/api/cash', cash_1.default);
app.use('/api/cashless', cashless_1.default);
app.use('/api/expense', expense_1.default);
app.use('/api/income', income_1.default);
app.use('/api/balance', balance_1.default);
app.use('/api/brand', brand_1.default);
app.use('/api/purchase', purchase_1.default);
app.use('/api/supplier', supplier_1.default);
app.use('/api/sale', sale_1.default);
app.use('/api/client', client_1.default);
app.use('/api/chat', chat_1.default);
// app.use('/api/traffic', trafficRoutes);
// app.use('/api/beautyspace', beautySpaceRoutes);
// app.use('/api/private-bank', privateBankRoutes);
// app.use('/api/novaposhta', novaPoshtaRoutes);
// app.use('/api/sms', smsRoutes);
cron.schedule(`55 15 * * *`, () => { finance_service_1.default.createNewDayCashing().then(result => console.log(result)); });
exports.default = app;
