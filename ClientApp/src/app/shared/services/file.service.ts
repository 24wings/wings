import { Injectable } from '@angular/core';

@Injectable()
export class FileService {

    selectFile(): Promise<{ file: any, filename: string, fileSize: number }> {
        return new Promise(resolve => {
            var input = document.createElement("input");
            input.type = "file";
            input.onchange = function (e) {

                var file: File = Object.assign(input.files[0]);
                resolve({ file: file, filename: file.name, fileSize: file.size })
            }
            input.click();

        })

    }
}