const passport = require('passport');
import express, {Application} from 'express'
import bodyParser from "body-parser"
import financeService from './shared/services/finance.service'
const cron = require('node-cron');
const app: Application = express();

// Паспорт авторизация
require('./middleware/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());
app.use('/uploads', express.static('uploads'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Маршруты приложения
import settingRoutes from "./routes/setting";
import authRoutes from "./routes/auth"
import categoryRoutes from "./routes/category"
import stateRoutes from "./routes/state"
import cashRoutes from "./routes/cash"
import cashlessRoutes from "./routes/cashless"
import expenseRoutes from "./routes/expense"
import incomeRoutes from "./routes/income"
import productRoutes from './routes/product'
import balancesRoutes from './routes/balance'
import brandRoutes from './routes/brand'
import purchaseRoutes from './routes/purchase'
import supplierRoutes from './routes/supplier'
import saleRoutes from './routes/sale'
import clientRoutes from './routes/client'
import chatRoutes from './routes/chat'

// import trafficRoutes from './routes/traffic'
// import novaPoshtaRoutes from './routes/novaposhta'
// import beautySpaceRoutes from './routes/beautyspace/beautyspace'
// import privateBankRoutes from './routes/privatbank'
// import smsRoutes from './routes/sms'

app.use('/api/setting', settingRoutes);
app.use('/api/login', authRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/product', productRoutes);
app.use('/api/state', stateRoutes);
app.use('/api/cash', cashRoutes);
app.use('/api/cashless', cashlessRoutes);
app.use('/api/expense', expenseRoutes);
app.use('/api/income', incomeRoutes);
app.use('/api/balance', balancesRoutes);
app.use('/api/brand', brandRoutes);
app.use('/api/purchase', purchaseRoutes);
app.use('/api/supplier', supplierRoutes);
app.use('/api/sale', saleRoutes);
app.use('/api/client', clientRoutes);
app.use('/api/chat', chatRoutes);

// app.use('/api/traffic', trafficRoutes);
// app.use('/api/beautyspace', beautySpaceRoutes);
// app.use('/api/private-bank', privateBankRoutes);
// app.use('/api/novaposhta', novaPoshtaRoutes);
// app.use('/api/sms', smsRoutes);


cron.schedule(`53 07 * * *`, () => { financeService.createNewDayCashing().then(result => console.log(result))});

export default app;





