async function getPrices() {
  try {
    // CoinGecko (BTC, ETH, Gold)
    const cgUrl =
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,pax-gold&vs_currencies=usd";
    const cg = await fetch(cgUrl).then(r => r.json());

    // سعر الدولار بالجنيه
    const fxUrl = "https://open.er-api.com/v6/latest/USD"; // بديل مضمون
    const fx = await fetch(fxUrl).then(r => r.json());
    console.log("📌 رد API الدولار:", fx); // ← للطباعة والمتابعة
    const usdEgp = fx.rates.EGP;

    // الذهب (جرام عيار 21)
    const goldUsdPerOunce = cg["pax-gold"].usd;
    const goldEgpPerOunce = goldUsdPerOunce * usdEgp;
    const goldEgpPerGram24 = goldEgpPerOunce / 31.1034768;
    const goldEgpPerGram21 = goldEgpPerGram24 * 0.875;

    // تحديث الصفحة
    document.getElementById("gold").textContent =
      goldEgpPerGram21.toFixed(2) + " EGP (عيار 21)";
    document.getElementById("dollar").textContent =
      usdEgp.toFixed(2) + " EGP";
    document.getElementById("bitcoin").textContent =
      "$" + cg.bitcoin.usd.toLocaleString();
    document.getElementById("ethereum").textContent =
      "$" + cg.ethereum.usd.toLocaleString();
  } catch (err) {
    console.error("❌ خطأ في جلب الأسعار:", err);
  }
}

getPrices();
setInterval(getPrices, 60000);
