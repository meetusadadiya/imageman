import express from 'express';
import path from 'path';
import multer from 'multer';
import sharp from 'sharp';
import FileType from 'file-type';
import fs from 'fs';

const app = express();
let upload = multer({ dest: path.join(__dirname, '../public/img') });
app.use(express.json());
app.disable('x-powered-by');
app.disable('Content-Type');
app.get('/img/:name', async (req, res) => {
	let hash: number = req.originalUrl.split('').reduce((a, b) => {
		a = (a << 5) - a + b.charCodeAt(0);
		return a & a;
	}, 0);
	interface opt {
		width?: number | undefined;
		height?: number | undefined;
		fit: any;
	}
	let options: opt = {
		width: req.query.width ? parseInt(req.query.width) : undefined,
		height: req.query.height ? parseInt(req.query.height) : undefined,
		fit:
			req.query.width && req.query.height ? sharp.fit['fill'] : undefined,
	};
	const imgpath: string = path.join(
		__dirname,
		`../public/img/${req.params.name}/`
	);
	const cachepath: string = path.join(__dirname, `../public/cache`);

	fs.exists(imgpath, (exists) => {
		if (exists) {
			fs.exists(cachepath + '.' + hash.toString(), async (exists) => {
				if (exists) {
					let filetype = await FileType.fromFile(
						cachepath + '.' + hash.toString()
					);
					res.type(filetype!.mime);
					return res.sendFile(cachepath + '.' + hash.toString());
				} else {
					fs.readFile(imgpath, async (err, data) => {
						let buffer = await sharp(data)
							.resize(options)
							.toBuffer((err, data, info) => {
								res.type(`image/${info.format}`);
								fs.writeFile(
									cachepath + '.' + hash.toString(),
									data,
									(err) => {
										if (err) {
											console.log(err);
											return res.send('Error');
										} else {
											return res.send(data);
										}
									}
								);
							});
					});
				}
			});
		} else res.status(404).send({ message: 'Not Found' });
	});
});

app.post('/upload', upload.single('file'), async (req, res) => {
	fs.exists(
		path.join(__dirname, `../public/img/${req.body.name}`),
		(exists) => {
			if (exists) {
				fs.unlinkSync(
					path.join(__dirname, `../public/img/${req.file.filename}`)
				);
				return res.send({ message: 'Already Exists' });
			} else {
				fs.rename(
					path.join(__dirname, `../public/img/${req.file.filename}`),
					path.join(__dirname, `../public/img/${req.body.name}`),
					(err) => {
						if (err) res.send(err);
						else
							return res.send({
								mesaage: 'Success',
								url: `/img/${req.body.name}`,
							});
					}
				);
			}
		}
	);
});
let port: number =
	parseInt(process.argv[(process.argv.indexOf('port') || -2) + 1]) || 3000;
app.listen(port, () => {
	console.log('Serving on port :', port);
});
