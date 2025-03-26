// Price Total Packages ->
export const calculateTotalPrice = (packages, shoppingCartPackages) => {
  // Inicializar la variable para almacenar el precio total
  let totalPrice = 0;

  // Recorrer los elementos del carrito
  shoppingCartPackages.forEach((cartPackage) => {
    // Encontrar el paquete correspondiente en el array de packages
    const matchingPackage = packages.find(
      (pkg) => pkg.id === cartPackage.packageId
    );

    // Si se encuentra el paquete correspondiente, calcular el precio total y sumarlo
    if (matchingPackage) {
      totalPrice += matchingPackage.price * cartPackage.quantity;
    }
  });

  return totalPrice;
};
//

// Format Currency ->
export const formatCurrency = (amount) => {
  return amount?.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

// TODO: refactor must use formatCurrency func
export const formattedRange = (rang) => {
  return rang.map((value) =>
    value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
  );
};
//

// Format Date ->
export default function formatDateString(inputDateString) {
  const inputDate = new Date(inputDateString);

  const day = inputDate.getDate();
  const month = inputDate.getMonth() + 1; // Meses son de 0 a 11 en JavaScript
  const year = inputDate.getFullYear();

  // Formatea los componentes de la fecha con ceros a la izquierda si es necesario
  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;

  // Crea la cadena formateada en el formato deseado
  const formattedDateString = `${formattedDay}/${formattedMonth}/${year}`;

  return formattedDateString;
}

export const noop = () => {};

export const setLanguage = (language) => {
  localStorage.setItem('language', language);
};

export const getLanguage = () => {
  const localStorageLanguage = localStorage.getItem('language');
  const language = localStorageLanguage || window.navigator.language;
  return language;
};

// Generate avatar account ->
export async function avatarAccount() {
  const url =
    'https://funky-pixel-avatars.p.rapidapi.com/api/v1/avatar/generate/user?g=male&uname=kusingh&fe=gif';
  const payload = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'SIGN-UP-FOR-KEY',
      'X-RapidAPI-Host': 'funky-pixel-avatars.p.rapidapi.com',
    },
  };

  try {
    const response = await fetch(url, payload);
    const result = await response.text();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}
