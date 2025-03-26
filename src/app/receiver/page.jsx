"use client";

import { useEffect, useState } from "react";
import CartSession from "@/components/cartSession";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import ClubVip from "@/components/clubVip";
import Image from "next/image";
import ReciberCard from "@/components/reciber/components/reciberCode";
import ReciverCard from "./components/reciverCard";
import VideoPackage from "@/components/video";
import ReciverForm from "./components/reciverForm";
import ReciberThanks from "@/components/popup/reciberThanks";
import MessageGiver from "@/components/popup/messageGiver";
import Modal from "@mui/material/Modal";

import "./styles.scss";

export default function Reciber() {
  const [step, setStep] = useState(0);
  const [reciverThanks, setReciverThanks] = useState(false);
  const [viewMessage, setViewMessage] = useState(true);
  const router = useRouter();

  const api = process.env.apiImages;
  const userActive = useSelector((state) => state.counter.user);

  const userInfo = userActive?.info;
  const dataReciver = userActive?.reciver;

  const reciverPackages = dataReciver?.package;
  const reciverMessage = dataReciver?.deliveryType?.deliveryMessage;

  const firstPackage = dataReciver?.package;

  useEffect(() => {
    if (userActive.login && userActive.reciver !== null) {
      setStep(2);
    } else if (userActive.login) {
      setStep(1);
    } else {
      setStep(0);
    }
  }, [userActive.login, userActive.reciver]);

  return (
    <>
      <main
        className={`reciber_dreamon${
          step === 2 ? " reciber_dreamon_step2" : ""
        }`}
        style={step === 3 ? { padding: "208px 0 0 0 " } : null}
      >
        <div className="reciber_dreamon_title">
          <div className="reciber_dremon_steps">
            <p
              className="resciber_step01"
              style={
                step === 1
                  ? { color: "#ed8067", textDecoration: "underline" }
                  : null
              }
              // onClick={() => setStep(1)}
            >
              Paso 1 - Ingresar
            </p>
            {
              window.innerWidth >= 769 && (
                <span>&nbsp;/&nbsp;</span>
              )
            }
            <p
              className="resciber_step02"
              style={
                step === 2
                  ? { color: "#fff", textDecoration: "underline" }
                  : null
              }
              // onClick={() => setStep(2)}
            >
              Paso 2 - Abrí tu Dreamon
            </p>
            {
              window.innerWidth >= 769 && (
                <span>&nbsp;/&nbsp;</span>
              )
            }
            <p
              className="resciber_step03"
              style={
                step === 3
                  ? { color: "#ed8067", textDecoration: "underline" }
                  : null
              }
              // onClick={() => setStep(3)}
            >
              Paso 3 - Completar formulario
            </p>
          </div>
          <h1
            className="reciber_title"
            style={step === 2 ? { color: "#fff", textAlign: "center" } : null}
          >
            {step === 0 ? (
              "Una experiencia única te espera"
            ) : step === 1 ? (
              "Te hicieron un regalo"
            ) : step === 2 ? (
              <div>
                <p>Felicidades {userInfo?.FirstName},</p>
                <p>
                  ¡{dataReciver?.dreamerGiver?.name} te hizo un regalo único!
                </p>
              </div>
            ) : step === 3 ? (
              "Estas a punto de vivir una experiencia inolvidable"
            ) : (
              "Texto por defecto"
            )}
          </h1>
          <div className="reciber_subTitle">
            {step === 0 ? (
              "Inicia sesión o regístrate para abrir tu regalo."
            ) : step === 1 ? (
              "Alguien quiere que vivas una experiencia inolvidable."
            ) : step === 2 ? (
              <div>
                <p className="step2_Subtitle">
                  Tu Dreamon ha sido{" "}
                  <span style={{ fontWeight: "500" }}>activado</span>. Confirma
                  tu regalo y nos pondremos en contacto con vos para ayudarte en
                  todo el proceso.
                </p>
              </div>
            ) : step === 3 ? (
              "Completá el formulario y en breve nos pondremos en contacto para hacerla realidad."
            ) : (
              "Texto por defecto"
            )}
          </div>
          {step === 2 && (
            <div className="step2_buttons">
              <button
                className="step2_btn1"
                onClick={() => setReciverThanks(!reciverThanks)}
              >
                Agradacele a {dataReciver?.dreamerGiver?.name}
              </button>
              <button className="step2_btn2" onClick={() => setStep(3)}>
                Confirmá tu regalo
              </button>
            </div>
          )}
        </div>
        {!userActive.login ? (
          <section className="reciber_session">
            <CartSession />
          </section>
        ) : step === 1 ? (
          <div className="reciber_step01_content">
            <ReciberCard setStep={setStep} />
            <Image
              src={`${api}/[reciber]_giftCard.png`}
              alt="giftCard"
              width={
                window !== "undefined" && window.innerWidth <= 768
                  ? 380
                  : 484.55
              }
              height={
                window !== "undefined" && window.innerWidth <= 768
                  ? 300
                  : 400.09
              }
              objectFit="cover"
            />
          </div>
        ) : null}
      </main>
      {step === 2 && (
        <div className="step2">
          <div
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                height: 450,
                position: "absolute",
                top: -200,
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {firstPackage?.video ? (
                <VideoPackage
                  url={firstPackage.video}
                  imageFallback={firstPackage.image}
                />
              ) : null}
            </div>
          </div>
          <section className="step2_content">
            <div className="step2_contentLeft">
              <div>
                <h1>{dataReciver?.name}</h1>
                <p style={{ marginTop: "20px", marginBottom: "20px" }}>
                  {dataReciver?.description}
                </p>
                <ReciverCard
                  item={reciverPackages}
                  index={0}
                  key={0}
                  reciverCode={dataReciver?.code}
                  setStep={setStep}
                />
              </div>
            </div>
            <div className="step2_contentRight">
              {/* <div className='step2_compartir'>
                <Image
                  src={`${api}/[icon]_share.svg`}
                  alt='share'
                  width={20.12}
                  height={18.98}
                  style={{ marginBottom: '9px' }}
                />
                <p>Compartir</p>
              </div> */}
              {window.innerWidth >= 769 && (
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
            </div>
          </section>
        </div>
      )}
      {step === 3 && (
        <ReciverForm dreamonId={dataReciver?.id} userInfo={userInfo} />
      )}
      <Modal
        open={reciverThanks}
        onClose={() => setReciverThanks(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ReciberThanks
          setReciverThanks={setReciverThanks}
          reciverThanks={reciverThanks}
        />
      </Modal>
      {reciverMessage?.length > 0 && viewMessage === true ? (
        <MessageGiver
          message={reciverMessage}
          setViewMessage={setViewMessage}
          userGiver={dataReciver?.dreamerGiver?.name}
        />
      ) : null}
      <ClubVip />
    </>
  );
}
