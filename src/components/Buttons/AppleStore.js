import applelogo from "../../assets/applelogo.png";

export default function AppleStoreButton() {

    const handleAppStoreApp = () => {
        const appId = "id6755449524"; // coloque o ID real aqui
        const url = `https://apps.apple.com/br/app/ueb-carteirinha-de-estudante/${appId}`;
        window.open(url, "_blank");
    };



    return (
        <button
            onClick={handleAppStoreApp}
            style={{
                display: "flex",
                width: '200px',
                alignItems: "center",
                gap: "10px",
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
            {/* Ícone App Store */}
            <img
                src={applelogo} // coloque o caminho da imagem aqui
                alt="App Store"
                style={{ width: "28px", height: "28px" }}
            />

            {/* Texto */}
            <div style={{ textAlign: "left", lineHeight: "1" }}>
                <span style={{ fontSize: "10px", color: "#777" }}>Download on the</span>
                <br />
                <span style={{ fontSize: "16px", fontWeight: "600", color: '#333' }}>
                    App Store
                </span>
            </div>
        </button>
    );
}
