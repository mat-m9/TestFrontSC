//window.BlazorDownloadFile = {
//    saveAsFile: function (filename, data) {
//        const blob = new Blob([data]);
//        if (navigator.msSaveBlob) {
//            navigator.msSaveBlob(blob, filename);
//        } else {
//            const link = document.createElement('a');
//            const url = URL.createObjectURL(blob);
//            link.href = url;
//            link.setAttribute('download', filename);
//            document.body.appendChild(link);
//            link.click();
//            document.body.removeChild(link);
//            URL.revokeObjectURL(url);
//        }
//    }
//}

function BlazorDownloadFile(filename, contentType, content) {

    converted = uint8ArrayToString(content)
    // Blazor marshall byte[] to a base64 string, so we first need to convert the string (content) to a Uint8Array to create the File
    const data = base64DecToArr(converted);

    // Create the URL
    const file = new File([data], filename, { type: contentType });
    const exportUrl = URL.createObjectURL(file);

    // Create the <a> element and click on it
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.href = exportUrl;
    a.download = filename;
    a.target = "_self";
    a.click();

    // We don't need to keep the url, let's release the memory
    // On Safari it seems you need to comment this line... (please let me know if you know why)
    URL.revokeObjectURL(exportUrl);
    a.remove();
}


function uint8ArrayToString(uint8Array) {
    var encodedString = String.fromCharCode.apply(null, uint8Array);
    return decodeURIComponent(escape(encodedString));
}




// Convert a base64 string to a Uint8Array. This is needed to create a blob object from the base64 string.
// The code comes from: https://developer.mozilla.org/fr/docs/Web/API/WindowBase64/D%C3%A9coder_encoder_en_base64
function b64ToUint6(nChr) {
    return nChr > 64 && nChr < 91 ? nChr - 65 : nChr > 96 && nChr < 123 ? nChr - 71 : nChr > 47 && nChr < 58 ? nChr + 4 : nChr === 43 ? 62 : nChr === 47 ? 63 : 0;
}

function base64DecToArr(sBase64, nBlocksSize) {
    var
        sB64Enc = sBase64.replace(/[^A-Za-z0-9\+\/]/g, ""),
        nInLen = sB64Enc.length,
        nOutLen = nBlocksSize ? Math.ceil((nInLen * 3 + 1 >> 2) / nBlocksSize) * nBlocksSize : nInLen * 3 + 1 >> 2,
        taBytes = new Uint8Array(nOutLen);

    for (var nMod3, nMod4, nUint24 = 0, nOutIdx = 0, nInIdx = 0; nInIdx < nInLen; nInIdx++) {
        nMod4 = nInIdx & 3;
        nUint24 |= b64ToUint6(sB64Enc.charCodeAt(nInIdx)) << 18 - 6 * nMod4;
        if (nMod4 === 3 || nInLen - nInIdx === 1) {
            for (nMod3 = 0; nMod3 < 3 && nOutIdx < nOutLen; nMod3++, nOutIdx++) {
                taBytes[nOutIdx] = nUint24 >>> (16 >>> nMod3 & 24) & 255;
            }
            nUint24 = 0;
        }
    }
    return taBytes;
}


//function BlazorDownloadFile(filename, contentType, data) {

//    // Create the URL
//    const file = new File([data], filename, { type: contentType });
//    const exportUrl = URL.createObjectURL(file);

//    // Create the <a> element and click on it
//    const a = document.createElement("a");
//    document.body.appendChild(a);
//    a.href = exportUrl;
//    a.download = filename;
//    a.target = "_self";
//    a.click();

//    // We don't need to keep the url, let's release the memory
//    // On Safari it seems you need to comment this line... (please let me know if you know why)
//    URL.revokeObjectURL(exportUrl);
//    a.remove();
//}

