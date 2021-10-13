import mongoose from 'mongoose';
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

const uri = process.env.DB_URI;

const connectDB =
	(handler: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
		if (!uri) {
			console.log('No URI, could not connect to DB.');
			return;
		}
		if (mongoose.connections[0].readyState) {
			// use the current connection
			return handler(req, res);
		}
		//use a new connection
		await mongoose.connect(uri).catch(() => console.error('error connecting db'));
		return handler(req, res);
	};

export default connectDB;
