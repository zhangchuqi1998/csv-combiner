const fs = require('fs');

const args = process.argv;

const outFile = args[args.length-1];
const writeSteram = fs.createWriteStream(outFile);

async function main() {

    for (let k = 2; k < args.length-1; k ++) {
        const readStream = fs.createReadStream(args[k], 'utf-8');

        let s = '';

        readStream.on('data', (chunk) => {
            s = chunk.toString();

            (async () => {
                let stringarr = s.split('\n');
                
                if (k == 2) {
                    let s = stringarr[0].trim() + `,filename\n`;
                } else {
                    // check if colume is equal
                }
                for (let i = 1; i < stringarr.length-1; i ++) {
                    let s = stringarr[i].trim() + `,${args[k]}\n`;
                    console.log(s);
                    const overWatermark = writeSteram.write(s);
                    if (!overWatermark) {
                        await new Promise((resolve) => 
                        writeSteram.once('drain', resolve)
                        );
                    }
                }
            
                
            })();
        })
    }

}



