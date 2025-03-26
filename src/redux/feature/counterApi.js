import { decodeToken } from "@/utils/auth";
import { getLanguage } from "@/utils/utils";
import {
  setAplicationUserId,
  setDreamOns,
  setLeadId,
  setShoppingCartByUser,
  setUserInfo,
  setUserEmail,
  setUserLogin,
  setDeliveryType,
} from "./counterSlice";

const API = process.env.api;
// const API = 'https://dreamon-api-dev.azurewebsites.net';

const getHeaders = () => {
  const AUTH_TOKEN = localStorage.getItem("userToken");

  const lang = getLanguage();
  const headers = {
    "Accept-Language": lang,
    Authorization: `Bearer ${AUTH_TOKEN}`,
  };
  return headers;
};

// -> Bring all categories
export async function CategoryDreamon() {
  // const token = localStorage.getItem('token');
  const AUTH_TOKEN = localStorage.getItem("userToken");

  const payload = {
    method: "GET",
    body: JSON.stringify(),
    headers: getHeaders(),
  };

  try {
    const response = await fetch(`${API}/api/category`, payload);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error CategoryDreamon: ", error);
  }
}

// -> Bring all packages
export async function PackageAll() {
  const AUTH_TOKEN = localStorage.getItem("userToken");

  const payload = {
    method: "GET",
    body: JSON.stringify(),
    headers: getHeaders(),
  };

  try {
    const response = await fetch(`${API}/api/Package/Get/0/9`, payload);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error PackageAll: ", error);
  }
}

// Register User
export async function RegisterNewUser(data) {
  const AUTH_TOKEN = localStorage.getItem("userToken");

  const payload = {
    method: "POST",
    headers: {
      ...getHeaders(),
      "Content-Type": "application/json",
      Authorization: `Bearer ${AUTH_TOKEN}`,
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(`${API}/api/Dreamer/register`, payload);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error RegisterUser: ", error);
  }
}

// Login User
export async function LoginUserDreamon(credentials) {

  const payload = {
    method: "POST",
    headers: {
      ...getHeaders(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  };

  try {
    const response = await fetch(`${API}/api/Dreamer/login`, payload);

    if (response.ok) {
      const token = await response.text();
      localStorage.setItem("userToken", token);

      return decodeToken(token);
    } else {
      // Error 400 (password or user incorrect)
      console.error("Error:", response.statusText);
      return response.ok;
    }
  } catch (error) {
    console.error("Error RegisterUser: ", error);
  }
}

// Trae el shopping cart asociado al usuario ->
export async function GetShoppingCartByDreamerGiverId(dreamerGiverId) {
  const AUTH_TOKEN = localStorage.getItem("userToken");

  const payload = {
    method: "GET",
    headers: {
      ...getHeaders(),
      "Content-Type": "application/json",
      Authorization: `Bearer ${AUTH_TOKEN}`,
    },
  };

  try {
    const response = await fetch(
      `${API}/api/ShoppingCart/GetShoppingCartByDreamerGiverId/${dreamerGiverId}`,
      payload
    );
   return response.json();
  } catch (error) {
    console.error("Error GetShoppingCartByDreamerGiverId : ", error);
  }
}

export async function CreateShoppingCart(uuid) {
  const AUTH_TOKEN = localStorage.getItem("userToken");

  const payload = {
    method: "POST",
    body: JSON.stringify(),
    headers: getHeaders(),
  };

  try {
    const response = await fetch(
      `${API}/api/ShoppingCart/CreateShoppingCartAndPersist/${uuid}`,
      payload
    );

    return response.json();

  } catch (error) {
    console.error("Error CreateShoppingCart: ", error);
  }
}

// Upsert/Update Package in ShoopingCart (step 1.1 / with user login)
export async function UpsertPackageShoopingCart(uuid, packageId, quantity) {
  const AUTH_TOKEN = localStorage.getItem("userToken");

  const payload = {
    method: "POST",
    body: JSON.stringify(),
    headers: getHeaders(),
  };

  try {
    const response = await fetch(
      `${API}/api/ShoppingCart/UpsertPackageInShoppingCart?shoppingCartId=${uuid}&packageId=${packageId}&quantity=${quantity}`,
      payload
    );

    return response.json();

  } catch (error) {
    console.error("Error CreateShoppingCart: ", error);
  }
}

export const getUserEmail = async (dispatch) => {
  const AUTH_TOKEN = localStorage.getItem("userToken");
  const payload = {
    method: "GET",
    headers: {
      ...getHeaders(),
      "Content-Type": "application/json",
      Authorization: `Bearer ${AUTH_TOKEN}`,
    },
  };
  try {
    const response = await fetch(
      `${API}/api/User/UserDTO`, payload
    );
    const data = await response.json();
    dispatch(setUserEmail(data.email));
  } catch (error) {
    console.error("Error UserDTO: ", error);
  }
}

// Remove Package from ShoopingCart
export async function RemovePackageShoppingCart(uuid, packageId) {
  const AUTH_TOKEN = localStorage.getItem("userToken");

  const payload = {
    method: "POST",
    body: JSON.stringify(),
    headers: getHeaders(),
  };

  try {
    const response = await fetch(
      `${API}/api/ShoppingCart/RemovePackageFromShoppingCart?shoppingCartId=${uuid}&packageId=${packageId}`,
      payload
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error RemovePackageShoppingCart: ", error);
  }
}

// GetFilters
export async function GetFilters() {
  const AUTH_TOKEN = localStorage.getItem("userToken");

  const payload = {
    method: "GET",
    headers: {
      ...getHeaders(),
      "Content-Type": "application/json",
      Authorization: `Bearer ${AUTH_TOKEN}`,
    },
  };

  try {
    const response = await fetch(`${API}/api/Package/GetFilters`, payload);
    const data = await response.json();
    let newData = data.map((item) => {
      let id;

      switch (item.name) {
        case "Categorías":
          id = "categoryIds";
          break;
        case "Regiones":
          id = "regionIds";
          break;
        case "Destinos":
          id = "countryIds";
          break;
        case "Ideas":
          id = "ideasIds";
          break;
        default:
          id = null;
      }

      return { ...item, id };
    });

    newData.forEach(category => {
      if (category.items && category.items.length > 0) {
          category.items.sort((a, b) => a.id - b.id);
      }
    });

    return newData;
  } catch (error) {
    console.error("Error GetFilters: ", error);
  }
}

// Set filter Search Packages
export async function GetFilterPackages(request) {
  const AUTH_TOKEN = localStorage.getItem("userToken");

  const payload = {
    method: "POST",
    headers: {
      ...getHeaders(),
      "Content-Type": "application/json",
      Authorization: `Bearer ${AUTH_TOKEN}`,
    },
    body: JSON.stringify(request),
  };

  try {
    const response = await fetch(`${API}/api/Package/GetByFilter`, payload);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error GetFilterPackages: ", error);
  }
}

// Set ShoppingCart Aplication user
export async function SetShoppingCartAplicationUser(
  shoppingCartId,
  dreamerGiverId,
  dispatch
) {
  const AUTH_TOKEN = localStorage.getItem("userToken");

  const payload = {
    method: "POST",
    body: JSON.stringify(),
    headers: getHeaders(),
  };

  try {
    const response = await fetch(
      `${API}/api/ShoppingCart/SetShoppingCartApplicationUser?shoppingCartId=${shoppingCartId}&dreamerGiverId=${dreamerGiverId}`,
      payload
    );
    const data = await response.json();

    const shoppingcart = await ShoppingCartId(data.id);
    console.log(shoppingcart, 'shoppingcart')
    dispatch(setDreamOns(shoppingcart.dreamOns));
    dispatch(setAplicationUserId(data.id));
    dispatch(setLeadId(shoppingcart.id));
  } catch (error) {
    console.error("Error SetShoppingCartAplicationUser: ", error);
  }
}

// ShoppingCartId
export async function ShoppingCartId(shoppingCartId) {
  const AUTH_TOKEN = localStorage.getItem("userToken");

  const payload = {
    method: "POST",
    body: JSON.stringify(),
    headers: getHeaders(),
  };
  try {
    const response = await fetch(
      `${API}/api/Checkout/Post/${shoppingCartId}`,
      payload
    );
    return response.json();
  } catch (error) {
    console.error("Error Shopping Cart Id: ", error);
  }
}

// Club VIP
export async function newsletterClubVip(email) {
  const AUTH_TOKEN = localStorage.getItem("userToken");

  const payload = {
    method: "POST",
    headers: {
      ...getHeaders(),
      "Content-Type": "application/json",
      Authorization: `Bearer ${AUTH_TOKEN}`,
    },
    body: JSON.stringify(email),
  };

  try {
    const response = await fetch(`${API}/api/Communications/Post`, payload);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error Club VIP: ", error);
  }
}

export async function sendContactInformation(contactInformation) {
  const AUTH_TOKEN = localStorage.getItem("userToken");

  const payload = {
    method: "POST",
    headers: {
      ...getHeaders(),
      "Content-Type": "application/json",
      Authorization: `Bearer ${AUTH_TOKEN}`,
    },
    body: JSON.stringify(contactInformation),
  };

  try {
    const response = await fetch(
      `${API}/api/Communications/ContactUs`,
      payload
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error Enviando Informacion de Contacto: ", error);
  }
}

// Crea el delivery type de cada dreamon ->
export async function CreateDeliveryTypes(deamOnIds, dreamonInfo) {
  const AUTH_TOKEN = localStorage.getItem("userToken");

  const payload = {
    method: "POST",
    headers: {
      ...getHeaders(),
      "Content-Type": "application/json",
      Authorization: `Bearer ${AUTH_TOKEN}`,
    },
    body: JSON.stringify(dreamonInfo),
  };

  try {
    const response = await fetch(`${API}/api/DeliveryType`, payload);
    if (response.ok) {
      const responseData = await response.json();

      // Inmediatamente después de crear, obtener los datos
      const deliveryTypeData = await DeliveryTypeData(responseData[0]);

      return {
        created: responseData,
        data: deliveryTypeData
      };
    }
    throw new Error(response.statusText);
  } catch (error) {
    console.error("Error CreateDeliveryTypes : ", error);
    throw error;
  }
}








// Acatualiza los datos del deliveryTyoe creado ->
export async function UpdateDeliveryTypeData(draftId, dreamonInfo) {
  const AUTH_TOKEN = localStorage.getItem("userToken");

  const payload = {
    method: "PUT",
    headers: {
      ...getHeaders(),
      "Content-Type": "application/json",
      Authorization: `Bearer ${AUTH_TOKEN}`,
    },
    body: JSON.stringify(dreamonInfo),
  };

  try {
    const response = await fetch(`${API}/api/DeliveryType`, payload);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error UpdateDeliveryTypeData : ", error);
  }
}






// Trae los datos del deliveryType creado ->
export async function DeliveryTypeData(draftId) {
  const AUTH_TOKEN = localStorage.getItem("userToken");

  const payload = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${AUTH_TOKEN}`,
    },
  };

  try {
    const response = await fetch(`${API}/api/DeliveryType/${draftId}`, payload);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error DeliveryTypeData : ", error);
  }
}

// Limpia el carrito asociado con el usuario y crea los deamon's al estado de solicitud ->
// Es necesario realizar un recorrido por cada 'shoppingCartId' y su 'leadId' unico.
export async function FinishCheckout(shoppingCartId, leadId) {
  const AUTH_TOKEN = localStorage.getItem("userToken");

  const payload = {
    method: "POST",
    headers: {
      ...getHeaders(),
      "Content-Type": "application/json",
      Authorization: `Bearer ${AUTH_TOKEN}`,
    },
  };

  try {
    const response = await fetch(
      `${API}/api/Checkout/FinishCheckout/${shoppingCartId}/${leadId}`,
      payload
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error FinishCheckout : ", error);
  }
}

// -> Reciver Dreamon code
export async function ReciverDreamonById(dreamOnCode) {
  const AUTH_TOKEN = localStorage.getItem("userToken");

  const payload = {
    method: "POST",
    headers: {
      ...getHeaders(),
      "Content-Type": "application/json",
      Authorization: `Bearer ${AUTH_TOKEN}`,
    },
  };

  try {
    const response = await fetch(
      `${API}/api/DreamOn/GetDreamOnByCode?dreamOnCode=${dreamOnCode}`,
      payload
    );

    if (!response.ok) {
      const responseBody = await response.text();
      console.error(`Error ReciverDreamonById: ${responseBody}`);
      throw new Error(responseBody);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error ReciverDreamonById:", error.message);
    return { error: error.message };
  }
}

// -> Reciver confirm Dreamon
export async function ConfirmDreamon(dreamonInfo, dreamonId) {
  const AUTH_TOKEN = localStorage.getItem("userToken");

  const payload = {
    method: "POST",
    headers: {
      ...getHeaders(),
      "Content-Type": "application/json",
      Authorization: `Bearer ${AUTH_TOKEN}`,
    },
    body: JSON.stringify(dreamonInfo),
  };

  try {
    const response = await fetch(
        `${API}/api/DreamOn/ConfirmDreamOn?idDreamOn=${dreamonId}`,
        payload
    );
    if (response.status === 200) {
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error ConfirmDreamon:", error.message);
    return false;
  }
}

// -> Set Favorite packages
export async function SetFavorityPackage(packageId, dreamerId, Status) {
  const AUTH_TOKEN = localStorage.getItem("userToken");

  const payload = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${AUTH_TOKEN}`,
    },
  };

  try {
    const response = await fetch(
      `${API}/api/Package/FavoritePackage/${packageId}/${dreamerId}/${Status}`,
      payload
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error SetFavorityPackage:", error.message);
  }
}

// -> Get Favorites Packages
export async function GetFavoritesPackages() {
  const AUTH_TOKEN = localStorage.getItem("userToken");

  const payload = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${AUTH_TOKEN}`,
    },
  };

  try {
    const response = await fetch(
      `${API}/api/Package/GetFavoritesPackages/`,
      payload
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error GetFavoritesPackages:", error.message);
  }
}

// -> Send Favorites Packages
export async function SendFavoritesPacakges(email) {
  const AUTH_TOKEN = localStorage.getItem("userToken");

  const payload = {
    method: "POST",
    headers: {
      accept: "*/*",
      Authorization: `Bearer ${AUTH_TOKEN}`,
    },
  };

  try {
    const response = await fetch(
      `${API}/api/Package/SendFavoritesPackage/${email}`,
      payload
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error SendFavoritesPacakges:", error.message);
  }
}

// -> Get All dreamon giver by user
export async function GetAllDreamonsGiver(userId) {
  const AUTH_TOKEN = localStorage.getItem("userToken");

  const payload = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${AUTH_TOKEN}`,
    },
  };

  try {
    const response = await fetch(
      `${API}/api/DreamOn/GetAllDreamOnsByDreamerGiverId/${userId}`,
      payload
    );
    return response.json();
  } catch (error) {
    console.error("Error GetAllDreamonsGiver:", error.message);
  }
}

// -> Get All dreamon reciver by user
export async function GetAllDreamonsReciver(userId) {
  const AUTH_TOKEN = localStorage.getItem("userToken");

  const payload = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${AUTH_TOKEN}`,
    },
  };

  try {
    const response = await fetch(
      `${API}/api/DreamOn/GetAllDreamOnsByDreamerReceiverId/${userId}`,
      payload
    );
    return response.json();
  } catch (error) {
    console.error("Error GetAllDreamonsReciver:", error.message);
  }
}

export async function GetPackage(packageId, guid) {
  const payload = {
    method: "GET",
    headers: getHeaders(),
  };
  const response = await fetch(
    `${API}/api/Package/Get/${packageId}?q=${guid}`,
    payload
  );
  try {
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("🚀 ~ GetPackage ~ error:", error);
  }
}

// -> Get related packages Id
export async function GetRelatedPackagesId(packageId) {
  const AUTH_TOKEN = localStorage.getItem("userToken");

  const payload = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${AUTH_TOKEN}`,
    },
  };
  const response = await fetch(
    `${API}/api/Package/GetRelatedPackages/${packageId}`,
    payload
  );
  try {
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error GetRelatedPackagesId:", error.message);
  }
}

// -> Update info profile
export async function UpdateProfile(userInfo) {
  const AUTH_TOKEN = localStorage.getItem("userToken");

  const payload = {
    method: "PUT",
    headers: {
      accept: "*/*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${AUTH_TOKEN}`,
    },
    body: JSON.stringify(userInfo),
  };

  try {
    const response = await fetch(`${API}/api/User`, payload);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error UpdateProfile:", error.message);
  }
}

export async function GetProfile() {
  const payload = {
    method: "GET",
    headers: {
      ...getHeaders(),
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(`${API}/api/User`, payload);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error GetProfile:", error.message);
  }
}

//-> Forget Password
export async function ForgotPassword(email) {
  const payload = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(
      `${API}/api/Dreamer/ForgotPassword/${email}`,
      payload
    );
    return response;
  } catch (error) {
    console.error("Error ForgotPassword:", error.message);
  }
}

// -> Reset Password
export async function ResetPassword(email, token, password) {
  try {
    const response = await fetch(
      `${API}/api/Dreamer/ResetPassword?email=${encodeURIComponent(
        email
      )}&token=${encodeURIComponent(token)}&password=${encodeURIComponent(
        password
      )}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error ResetPassword:", error.message);
  }
}

export async function UploadProfilePicture(formData) {
  try {
    const payload = {
      method: "POST",
      headers: {
        ...getHeaders(),
      },
      body: formData,
    };
    const response = await fetch(
      `${API}/api/Dreamer/UploadProfilePicture`,
      payload
    );
    return response?.status === 200;
  } catch (error) {
    console.error("Error UploadProfilePicture:", error.message);
  }
}

// -> Send Thanks
export async function SendThanks(message) {
  const AUTH_TOKEN = localStorage.getItem("userToken");

  const queryParams = new URLSearchParams({
    idDreamon: message.idDreamon,
    subject: message.subject,
    message: message.message,
  });

  const payload = {
    method: "POST",
    headers: {
      accept: "*/*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${AUTH_TOKEN}`,
    },
    body: JSON.stringify(message),
  };

  try {
    const response = await fetch(
      `${API}/api/Communications/SendThanks?${queryParams}`,
      payload
    );
    return response;
  } catch (error) {
    console.error("Error SendThanks:", error.message);
  }
}
