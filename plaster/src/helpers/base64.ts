const Base64Helper = {
    base64ToString: (base64: string) => {
        const binaryString = atob(base64);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++)
            bytes[i] = binaryString.charCodeAt(i);

        const decoder = new TextDecoder('utf-8');
        return decoder.decode(bytes);
    },
    strToBase64: (str: string) => {
        const encoder = new TextEncoder();
        const bytes = encoder.encode(str);
        let binaryString = '';
        for (let i = 0; i < bytes.length; i++)
            binaryString += String.fromCharCode(bytes[i]);

        return btoa(binaryString);
    }

}

export default Base64Helper;