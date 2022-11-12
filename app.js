const fs = require('fs');

const args = process.argv;
const outFile = args[args.length-1];
const writeSteram = fs.createWriteStream(outFile);

function fetachFileName(sourseFile) {
    if (sourseFile.slice(-4) !== ".csv") return false;
    let fileName = sourseFile.substring(sourseFile.lastIndexOf("/"));
    if (fileName[0] === '/') fileName = fileName.substring(1, fileName.length);
    return fileName;
}

async function appendCSV(sourseFile, firstFile) {
    const readStream = fs.createReadStream(sourseFile, 'utf-8');
    const fileName = fetachFileName(sourseFile);
    let s = '';

    readStream.on('error', function(err) {
        console.log("no such file");
    });

    readStream.on('data', (chunk) => {
        s = chunk.toString();

        (async () => {
            let stringarr = s.split('\n');

            if (firstFile) {
                let s = stringarr[0].trim() + `,filename\n`;
                const overWatermark = writeSteram.write(s);
                if (!overWatermark) {
                    await new Promise((resolve) => writeSteram.once('drain', resolve)
                    );
                }
            } else {
                // check if colume is equal
            }

            for (let i = 1; i < stringarr.length - 1; i++) {
                let s = stringarr[i].trim() + `,${fileName}\n`;
                const overWatermark = writeSteram.write(s);
                if (!overWatermark) {
                    await new Promise((resolve) => writeSteram.once('drain', resolve)
                    );
                }
            }


        })();
    })
}

(async() => {

    await appendCSV(args[2], true);
    for (let k = 3; k < args.length-1; k ++) await appendCSV(args[k], false);
    writeSteram.end;
})();


