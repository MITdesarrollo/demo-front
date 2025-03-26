import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Switch } from "@mui/joy";
import { ConfirmDreamon } from "@/redux/feature/counterApi";
import { setReciverDreamon } from "@/redux/feature/counterSlice";
import { useDispatch } from "react-redux";

import "./styles.scss";

export default function ReciverForm({ dreamonId, userInfo }) {
  const [approve, setApprove] = useState(false);
  const [touchedFields, setTouchedFields] = useState([]);

  const userEmail =
    userInfo?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];

  const [formData, setFormData] = useState({
    id: 0,
    name: userInfo.FirstName || "",
    email: userEmail || "",
    phone: userInfo.MobilePhone || "",
    document: "",
    tentativeFrom: "",
    tentativeTo: "",
    hasCompanion: false,
    nameCompanion: "",
    documentCompanion: "",
    additionalInfo: "",
    acceptTermsConditions: false,
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    phone: "",
    document: "",
    tentativeFrom: "",
    tentativeTo: "",
    nameCompanion: "",
    documentCompanion: "",
    additionalInfo: "",
    acceptTermsConditions: "",
  });

  const api = process.env.apiImages;
  const router = useRouter();
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    const { name, value, required } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    // Marcar el campo como tocado
    if (!touchedFields.includes(name)) {
      setTouchedFields([...touchedFields, name]);
    }
  };

  const MAX_CHARACTERS = 300;

  const isFieldRequired = (fieldName) => {
    // Lista de campos requeridos
    const requiredFields = ["name", "email", "phone", "document"];

    // Verificar si el campo actual es requerido
    return requiredFields.includes(fieldName);
  };

  const isError = (fieldName) => {
    // Verificar si el campo está vacío y ha sido tocado
    return touchedFields.includes(fieldName) && !formData[fieldName];
  };

  const handleMessageChange = (event) => {
    const inputText = event.target.value;

    if (inputText.length <= MAX_CHARACTERS) {
      setFormData({
        ...formData,
        additionalInfo: inputText,
      });
    }
  };

  const handleCheckBox = (event) => {
    setApprove(!approve);
    setFormData({
      ...formData,
      acceptTermsConditions: !approve,
    });
  };

  const handleCheckHasCompanion = () => {
    setFormData({
      ...formData,
      hasCompanion: !formData.hasCompanion,
    });
    if (!formData.hasCompanion) {
      delete formErrors.nameCompanion;
      delete formErrors.documentCompanion;
    }

    setFormErrors(formErrors);

    setFormData({
      ...formData,
      hasCompanion: !formData.hasCompanion,
      nameCompanion: "",
      documentCompanion: "",
    });
  };

  const handledSendConfirm = async () => {
    try {
      setTouchedFields(["name", "email", "phone", "document"]);

      const hasErrors = Object.keys(formData).some(
          (fieldName) => isFieldRequired(fieldName) && !formData[fieldName]
      );

      if (hasErrors === true) {
        console.log("Form has errors:", hasErrors);
        return;
      }

      const result = await ConfirmDreamon(formData, dreamonId);

      if (result) {
        dispatch(setReciverDreamon(null));
        router.push("/");
      } else {
        console.error('Failed to confirm dreamon');
        // Aquí podrías mostrar un mensaje de error al usuario
      }
    } catch (error) {
      console.error('Error in handledSendConfirm:', error);
      // Manejar el error apropiadamente
    }
  };

  return (
    <section className="step3">
      <div className="step3_left">
        <div className="step3_left_form">
          <div className="step3_formTitle">
            <Image
              src={`${api}/[icon]_shieldx2.png`}
              alt="shield"
              width={27}
              height={27}
              style={{ marginRight: "12px" }}
            />
            <p>Tus datos estan seguros con nosotros</p>
          </div>
          <div className="step3_inputsForm">
            <input
              className={`inputs${isError("name") ? "error" : ""}`}
              placeholder="Nombre completo*"
              required
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            <input
              className={`inputs${isError("email") ? "error" : ""}`}
              placeholder="Correo electrónico*"
              required
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <input
              className={`inputs${isError("phone") ? "error" : ""}`}
              placeholder="Número de contacto*"
              required
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
            <input
              className={`inputs${isError("document") ? "error" : ""}`}
              placeholder="DNI o Pasaporte*"
              required
              name="document"
              value={formData.document}
              onChange={handleInputChange}
            />
            <p className="step3_inputTitle">Fechas tentativas de viaje</p>
            <div>
              <input
                className={`inputs${isError("tentativeFrom") ? "error" : ""}`}
                name="tentativeFrom"
                type="date"
                value={formData.tentativeFrom}
                onChange={handleInputChange}
                onFocus={(e) => e.target.showPicker()}
              />
              <input
                className={`inputs${isError("tentativeTo") ? "error" : ""}`}
                placeholder="Hasta"
                name="tentativeTo"
                type="date"
                value={formData.tentativeTo}
                onChange={handleInputChange}
                onFocus={(e) => e.target.showPicker()}
              />
            </div>
            <div className="step3_select">
              <p className="step3_inputTitle">¿Vas con acompañante?</p>
              <div className="step3_select_yesOrNo">
                <p>{formData.hasCompanion ? "Si" : "No"}</p>
                <Switch
                  color={!formData.hasCompanion ? "neutral" : "success"}
                  variant="solid"
                  sx={{
                    "--Switch-trackHeight": "10px",
                    "--Switch-trackWidth": "23px",
                    "--Switch-thumbSize": "10px",
                  }}
                  onChange={handleCheckHasCompanion}
                />
              </div>
            </div>
            <input
              className={`inputs${
                formData.hasCompanion
                  ? formErrors.nameCompanion
                    ? "error"
                    : ""
                  : ""
              }`}
              placeholder="Nombre completo del acompañante*"
              required
              name="nameCompanion"
              value={formData.nameCompanion}
              onChange={handleInputChange}
              disabled={!formData.hasCompanion}
            />
            <input
              className={`inputs${
                formData.hasCompanion
                  ? formErrors.documentCompanion
                    ? "error"
                    : ""
                  : ""
              }`}
              placeholder="DNI o Pasaporte del acompañante*"
              required
              name="documentCompanion"
              value={formData.documentCompanion}
              onChange={handleInputChange}
              disabled={!formData.hasCompanion}
            />
            <p className="step3_inputTitle">Más información</p>
            <textarea
              className="inputsMessage"
              placeholder="¿Querés sumar noches? ¿Querés cambiar tu experiencia? Contanos..."
              type="text"
              name="additionalInfo"
              value={formData.additionalInfo}
              onInput={handleMessageChange}
              style={{ margin: "0" }}
            />
            <p
              className="shipping_confirm_max"
              style={{ marginBottom: "15px", color: "#8B8B8B" }}
            >{`${
              MAX_CHARACTERS - formData.additionalInfo.length
            } caracteres restantes`}</p>
            <div>
              <label className="checkbox" style={{ marginBottom: "15px" }}>
                <input
                  className="checkbox_input"
                  type="checkbox"
                  checked={approve}
                  onChange={handleCheckBox}
                />
                <p
                  className="terminosYCondiciones"
                  style={{ color: "#262633" }}
                >
                  Entiendo y acepto los{" "}
                  <span
                    onClick={() =>
                      window.open("/terminosycondiciones", "_blank")
                    }
                    style={{ color: "#ecbf52", cursor: "pointer" }}
                  >
                    Términos y condiciones
                  </span>
                </p>
              </label>
              <button
                className="btnRadien"
                disabled={!approve}
                style={!approve ? { background: "#e4e3e2" } : null}
                onClick={handledSendConfirm}
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="step3_right">
        <h3>Sede Central</h3>
        <p>Direccion Av. Juramento 1805, C1428 CABA</p>
        <div className="step3_rightBorder" />
        <h3>Oficina</h3>
        <p>+54 9 11 5256-5050</p>
        <div className="step3_rightBorder" />
        <h3>WhatsApp</h3>
        <p>+54 9 11 5256-5050</p>
        <div className="step3_rightBorder" />
        <h3>Email</h3>
        <p>info@dreamon.gift</p>
      </div>
    </section>
  );
}
