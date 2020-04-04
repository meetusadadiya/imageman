import glob from 'glob';
import path from 'path';
import fs from 'fs';

console.log('Cleaning cache...');

glob(path.join(__dirname, '../public/cache*'), (err, files) => {
	if (err) console.log(err);
	else {
		for (let file of files) {
			fs.unlink(file, (err) => {
				if (err) console.log(err);
			});
		}
		console.log('Cache cleaned successfully');
	}
});
