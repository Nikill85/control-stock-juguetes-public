import express from 'express';
import * as _ from 'lodash';
import cors from 'cors';


const app = express();
app.use(express.json());
app.use(cors());

app.listen(3000);



console.log("El servidor esta levantado en el puerto: 3000");