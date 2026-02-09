/**
 * 🍽️ Thali Combo Platter - Mixed Methods Capstone
 *
 * Grand Indian Thali restaurant mein combo platter system banana hai.
 * String, Number, Array, aur Object — sab methods mila ke ek complete
 * thali banao. Yeh capstone challenge hai — sab kuch combine karo!
 *
 * Data format: thali = {
 *   name: "Rajasthani Thali",
 *   items: ["dal baati", "churma", "papad"],
 *   price: 250,
 *   isVeg: true
 * }
 *
 * Functions:
 *
 *   1. createThaliDescription(thali)
 *      - Template literal, .join(", "), .toUpperCase(), .toFixed(2) use karo
 *      - Format: "{NAME} (Veg/Non-Veg) - Items: {items joined} - Rs.{price}"
 *      - name ko UPPERCASE karo, price ko 2 decimal places tak
 *      - isVeg true hai toh "Veg", false hai toh "Non-Veg"
 *      - Agar thali object nahi hai ya required fields missing hain, return ""
 *      - Required fields: name (string), items (array), price (number), isVeg (boolean)
 *      - Example: createThaliDescription({name:"Rajasthani Thali", items:["dal","churma"], price:250, isVeg:true})
 *                 => "RAJASTHANI THALI (Veg) - Items: dal, churma - Rs.250.00"
 *
 *   2. getThaliStats(thalis)
 *      - Array of thali objects ka stats nikalo
 *      - .filter() se veg/non-veg count
 *      - .reduce() se average price
 *      - Math.min/Math.max se cheapest/costliest
 *      - .map() se saare names
 *      - Return: { totalThalis, vegCount, nonVegCount, avgPrice (2 decimal string),
 *                  cheapest (number), costliest (number), names (array) }
 *      - Agar thalis array nahi hai ya empty hai, return null
 *
 *   3. searchThaliMenu(thalis, query)
 *      - .filter() + .includes() se search karo (case-insensitive)
 *      - Thali match karti hai agar name ya koi bhi item query include kare
 *      - Agar thalis array nahi hai ya query string nahi hai, return []
 *      - Example: searchThaliMenu(thalis, "dal") => thalis with "dal" in name or items
 *
 *   4. generateThaliReceipt(customerName, thalis)
 *      - Template literals + .map() + .join("\n") + .reduce() se receipt banao
 *      - Format:
 *        "THALI RECEIPT\n---\nCustomer: {NAME}\n{line items}\n---\nTotal: Rs.{total}\nItems: {count}"
 *      - Line item: "- {thali name} x Rs.{price}"
 *      - customerName UPPERCASE mein
 *      - Agar customerName string nahi hai ya thalis array nahi hai/empty hai, return ""
 *
 * @example
 *   createThaliDescription({name:"Rajasthani Thali", items:["dal"], price:250, isVeg:true})
 *   // => "RAJASTHANI THALI (Veg) - Items: dal - Rs.250.00"
 */
export function createThaliDescription(thali) {
  if (Object.prototype.toString.call(thali) !== "[object Object]") {
    return "";
  }
  const reqProperties = ["name", "items", "price", "isVeg"];
  const recievedProperties = Object.keys(thali);

  if (recievedProperties.length !== reqProperties.length) {
    return "";
  }

  let missing = false;
  reqProperties.forEach((property) => {
    if (!recievedProperties.includes(property)) {
      missing = true;
    }
  });

  if (missing) {
    return "";
  }

  let name = thali.name.toUpperCase();
  let type = thali.isVeg ? "Veg" : "Non-Veg";
  let items = thali.items.join(", ");
  let price = thali.price.toFixed(2);

  return `${name} (${type}) - Items: ${items} - Rs.${price}`;
}

export function getThaliStats(thalis) {
  if (!Array.isArray(thalis) || thalis.length === 0) {
    return null;
  }

  const totalThalis = thalis.length;
  const vegThalis = thalis.filter((thali) => thali.isVeg);
  const nonVegThalis = thalis.filter((thali) => !thali.isVeg);
  const prices = thalis.map((thali) => Number(thali.price));
  const avgPrice = prices.reduce((avg, price, idx) => {
    return (avg * idx + price) / (idx + 1);
  });
  const cheapestThali = Math.min(...prices);

  const costliestThali = Math.max(...prices);
  const thaliNames = thalis.map((thali) => thali.name);

  return {
    totalThalis,
    vegCount: vegThalis.length,
    nonVegCount: nonVegThalis.length,
    avgPrice: avgPrice.toFixed(2),
    cheapest: cheapestThali,
    costliest: costliestThali,
    names: thaliNames,
  };
}

export function searchThaliMenu(thalis, query) {
  if (!Array.isArray(thalis) || typeof query !== "string") {
    return [];
  }

  query = query.toLowerCase();

  function search(thali) {
    if (thali.name.toLowerCase().includes(query)) {
      return true;
    }
    const items = thali.items.filter((item) => item.includes(query));
    if (items.length) {
      return true;
    }
    return false;
  }

  return thalis.filter((thali) => search(thali));
}

export function generateThaliReceipt(customerName, thalis) {
  if (
    !Array.isArray(thalis) ||
    thalis.length === 0 ||
    typeof customerName !== "string"
  ) {
    return "";
  }

  let orderItems = thalis.map((thali) => `- ${thali.name} x Rs.${thali.price}`);
  const total = thalis.reduce((currTotal, thali) => currTotal + thali.price, 0);

  return `THALI RECEIPT\n---\nCustomer: ${customerName.toUpperCase()}\n${orderItems.join(
    "\n"
  )}\n---\nTotal: Rs.${total}\nItems: ${thalis.length}`;
}
