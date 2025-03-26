import Image from "next/image";
import formatDateString from "@/utils/utils";
import ContentInfoSection from "@/components/contentInfo";

import "./styles.scss";

export default function ReciverCard({ item, reciverCode, setStep }) {
  const api = process.env.apiImages;
  const inputString = reciverCode;

  const parts = [];
  for (let i = 0; i < inputString?.length; i += 4) {
    parts.push(inputString.substring(i, i + 4));
  }
  const resultCode = parts.join("  ");

  const formattedDateString = formatDateString(item?.endDate);

  const infoContentDreamon = [
    {
      icon: `${api}/[icon]_box.svg`,
      title: "¿Qué incluye la experiencia?",
      content: item?.description,
    },
    {
      icon: `${api}/[giver]_importantInformation.svg`,
      title: "¿Qué necesito saber?",
      content: item?.information,
    },
    {
      icon: `${api}/[icon]_location.svg`,
      title: "Ubicación",
      content: item?.address,
      latitude: item?.latitude,
      longitude: item?.longitude,
    },
  ];

  return (
    <div className="reciverCard-container">
      <div className="reciverCard">
        <Image
          className="reciverCard_img"
          src={item?.image}
          width={
            window !== "undefined" && window.innerWidth <= 768 ? 380 : 484.55
          }
          height={
            window !== "undefined" && window.innerWidth <= 768 ? 300 : 230.09
          }
          objectFit="cover"
          alt="bg_package"
        />
        <div className="step2_content">
          <section className="step2_content_info">
            <h2 className="step2_infoTitle">Acerca:</h2>
            <div className="step2_imgInfo" style={{ marginBottom: "7px" }}>
              <Image
                src={`${api}/[icon]_capacity.svg`}
                width={15}
                height={9}
                alt="people"
              />
              <p className="step2_infoCapacity">
                Para {item?.paxNumber} personas
              </p>
            </div>
            <div className="step2_imgInfo">
              <Image
                src={`${api}/[icon]_calendary.svg`}
                width={16}
                height={12}
                alt="calendar"
              />
              <p className="step2_infoCalendar">
                Válido hasta:{" "}
                <span style={{ fontWeight: "500" }}>{formattedDateString}</span>
              </p>
            </div>
          </section>
          <section className="step2_reciverInfo">
            <h2 className="step2_reciverInfo_title">Código del regalo:</h2>
            <h2 className="step2_reciverCode">{resultCode}</h2>
            <button
              className="btnRadien confirm-step2"
              onClick={() => setStep(3)}
            >
              Confirmá tu regalo
            </button>
          </section>
        </div>
      </div>
      {window.innerWidth <= 769 && (
        <div className="step2_infoGeneral">
          <h3 className="step2_infoGeneral_title">
            ¿Queres sumar noches o experiencias?
          </h3>
          <div style={{ display: "flex" }}>
            <Image
              src={`${api}/[icon]_contact.svg`}
              width={11.76}
              height={11.78}
              alt="contact"
              style={{ marginRight: "10px" }}
            />
            <p className="step2_infoGeneral_contact">
              <span
                style={{
                  color: "#ed8067",
                  cursor: "pointer",
                  fontWeight: "500",
                }}
                onClick={() => router.push("/contacto")}
              >
                Contactanos
              </span>{" "}
              y personalizamos tu Dreamon
            </p>
          </div>
          <p className="step2_infoGeneral_info">
            *Se puede sumar solo 3 experiencias por cada 5 noches.
          </p>
        </div>
      )}

      <section className="reciverCard_infoSection">
        {infoContentDreamon?.map((item, index) => (
          <ContentInfoSection key={index} data={item} />
        ))}
      </section>
    </div>
  );
}
