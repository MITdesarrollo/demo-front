import Image from "next/image";
import { useRouter } from "next/navigation";

import "./styles.scss";

export default function UniqueCategory({ data, index }) {
  const router = useRouter();

  const isOdd = index % 2 !== 0;

  const btnDreamonSelect = ({ id, title, desc }) => {
    if (!id || id === -1) {
      router.push("/search");
    } else {
      router.push(`/search?categoryIds=${id}`);
    }
  };

  return (
    <div
      className="uniquePackage"
      style={
        window.innerWidth < 768
          ? {
              display: "flex",
              flexDirection: "column-reverse",
            }
          : {
              display: "flex",
              flexDirection: isOdd ? "row" : "row-reverse",
            }
      }
    >
      <div
        className="packagesInfo"
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "75%",
          }}
        >
          <h1 className="allPackagesTitle">{data.name}</h1>
          <p className="allPackagesDescription">{data.subText}</p>
          <button
            className="btnPackages"
            style={{ width: "172px" }}
            onClick={() =>
              btnDreamonSelect({
                id: data.id,
                title: data.name,
                desc: data.shortText,
              })
            }
          >
            Descubrí más
          </button>
        </div>
      </div>
      <div
        style={
          window.innerWidth < 768
            ? { flex: 1 }
            : {
                backgroundColor: "lightgrey",
                flex: 1,
                position: "relative",
                width: "500px",
                height: "500px",
              }
        }
      >
        <Image
          src={data.smallImage ?? ""}
          fill={window.innerWidth < 768 ? false : true}
          alt={data.name}
          style={{ objectFit: "cover" }}
          width={window.innerWidth < 768 ? 300 : null}
          height={window.innerWidth < 768 ? 290 : null}
        />
      </div>
    </div>
  );
}
