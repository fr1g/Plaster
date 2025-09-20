import AddressComponent from "../classes/AddressComponent";

export default function tryGetAddrComp(text: string): null | AddressComponent[] {
    const regex = /(\((?:\d{1,3}\.){3}\d{1,3}\)|\[[^\]]+\]|[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)(?::(\d{1,5}))?/g;
    const matches: AddressComponent[] = [];
    let match;

    while ((match = regex.exec(text)) !== null) {
        let type: 'IPv4' | 'IPv6' | 'Domain' | 'None', value, domainComponent, port;
        const fullMatch = match[0];

        // 确定匹配的类型
        if (fullMatch.startsWith('(')) {
            type = 'IPv4';
            value = fullMatch.replace(/[()]/g, '');
        } else if (fullMatch.startsWith('[')) {
            type = 'IPv6';
            value = fullMatch.replace(/[\[\]]/g, ''); // eslint-disable-line
        } else if (!fullMatch.includes(".")) {
            continue;
        } else {
            type = 'Domain';
            value = fullMatch;
        }

        // 提取端口号（如果存在）
        if (match[1]) {
            domainComponent = match[1];
            try {
                port = parseInt(fullMatch.replace(domainComponent, ""));
            } catch (ex) { // idiot eslint
                console.log(ex)
                port = null;
            }
            value = value!.replace(/:\d+$/, '');
        }

        matches.push(new AddressComponent(type, value, port || null))

    }

    return matches.length > 0 ? matches : null;
}
