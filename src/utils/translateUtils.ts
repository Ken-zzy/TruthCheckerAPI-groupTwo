import { spawn } from 'child_process';
import path from 'path';

export async function translateLocally(text: string, lang: 'ig' | 'yo' | 'ha'): Promise<string> {
    return new Promise((resolve, reject) => {
        const scriptPath = path.join(__dirname, '../../translate.py');
        const process = spawn('python', [scriptPath, lang, text]);

        let output = '';
        let error = '';

        process.stdout.on('data', (data) => {
            output += data.toString();
        });

        process.stderr.on('data', (data) => {
            error += data.toString();
        });

        process.on('close', (code) => {
            if (code !== 0) {
                return reject(new Error(`Python error: ${error || output}`));
            }

            try {
                const parsed = JSON.parse(output);
                resolve(parsed.translated);
            } catch (e) {
                reject(new Error('Failed to parse Python output'));
            }
        });
    });
}
