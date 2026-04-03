import { networkInterfaces } from 'node:os';

const ips = [];
for (const nets of Object.values(networkInterfaces())) {
  if (!nets) continue;
  for (const net of nets) {
    if (net.family === 'IPv4' && !net.internal) {
      ips.push(net.address);
    }
  }
}

console.log('');
console.log('  【同じ Wi-Fi のスマホから】ブラウザで http を開く（https にしない）');
if (ips.length === 0) {
  console.log('  LAN の IPv4 が取れませんでした。Wi-Fi に接続してから再度 npm run dev を試してください。');
} else {
  for (const ip of ips) {
    console.log(`    http://${ip}:3020/`);
  }
}
console.log('');
console.log('  【同じ Wi-Fi が使えないとき】別ターミナルで npm run tunnel（公開URLが出ます）');
console.log('    1) このターミナルで npm run dev を起動したまま');
console.log('    2) もう一つターミナルを開き cd して npm run tunnel');
console.log('');
