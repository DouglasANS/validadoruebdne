import googleplay from "../../assets/googleplay.png";

export default function GooglePlayButton() {

    const handlePlayStoreApp = () => {
        const appId = "com.linstef.uebcarteirinha"; // coloque o ID real aqui
        const url = `https://play.google.com/store/apps/details?id=${appId}`;
        window.open(url, "_blank");
    };


    return (
        <button
            onClick={handlePlayStoreApp}
            style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                width: '200px',
                background: "white",
                border: "1px solid #ddd",
                borderRadius: "14px",
                padding: "10px 18px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.12)",
                cursor: "pointer",
                transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.18)";
                e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.12)";
                e.currentTarget.style.transform = "translateY(0)";
            }}
        >
            {/* Ícone Google Play */}
            <img
                src={googleplay} // coloque o caminho da imagem aqui
                alt="Google Play"
                style={{ width: "28px", height: "28px" }}
            />

            {/* Texto */}
            <div style={{ textAlign: "left", lineHeight: "1" }}>
                <span style={{ fontSize: "10px", color: "#777" }}>GET IT ON</span>
                <br />
                <span style={{ fontSize: "16px", fontWeight: "600", color: '#333' }}>
                    Google Play
                </span>
            </div>
        </button>
    );
}
