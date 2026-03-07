import { useEffect, useState } from 'react';
import { getImagemByUserId, getUserByCPFAndCodUsoApi } from '../../Api';
import { useParams } from 'react-router-dom';
import Footer from '../../components/Footer';

const COLORS = {
    primary: '#1A237E',
    success: '#00C853',
    successBg: '#E8F5E9',
    text: '#374151',
    lightText: '#6B7280',
    bg: '#F3F4F6',
    white: '#FFFFFF',
    border: '#E5E7EB'
};

export default function ValidadorUEB() {
    const [imagem, setImagem] = useState('');
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const { cpf, codUso } = useParams();

    useEffect(() => {
        if (!cpf || !codUso) return;

        const carregarDadosEstudante = async () => {
            try {
                setLoading(true);
                const resUser = await getUserByCPFAndCodUsoApi({ cpf, codUso });
                const userData = resUser?.data?.data;;
                setCurrentUser(userData);

                if (userData?.id) {
                    const resImagem = await getImagemByUserId({ id: userData.id });
                    setImagem(resImagem?.data?.imagem);
                }
            } catch (error) {
                console.error("Erro ao carregar dados:", error);
            } finally {
                setLoading(false);
            }
        };

        carregarDadosEstudante();
    }, [cpf, codUso]);

    if (loading) return <div style={styles.center}>Validando credenciais...</div>;
    if (!currentUser) return <div style={styles.center}>Documento não encontrado.</div>;

    return (
        <>
            <div style={styles.pageWrapper}>
                <div style={styles.container}>
                    {/* CABEÇALHO */}
                    <div style={styles.header}>
                        <h1 style={styles.title}>Validação de CIE</h1>
                        <p style={styles.subtitle}>CARTEIRA DE IDENTIDADE ESTUDANTIL</p>
                    </div>

                    {/* STATUS */}
                    <div style={styles.statusBadge}>
                        <div style={styles.statusDot} />
                        DOCUMENTO VÁLIDO
                    </div>

                    {/* TEXTO DE ATESTAÇÃO */}
                    <div style={styles.atestacaoBox}>
                        <p style={styles.atestacaoText}>
                            A <b>UEB</b> atesta que <b>{currentUser?.nome?.toUpperCase()}</b> é estudante e encontra-se regularmente matriculado(a) no curso de <b>{currentUser?.curso}</b> na instituição <b>{currentUser?.instituicao}</b>.
                        </p>
                    </div>

                    <div style={styles.divider} />

                    {/* PERFIL */}
                    <div style={styles.profileSection}>
                        <div style={styles.photoWrapper}>
                            {imagem ? (
                                <img src={imagem} alt="Estudante" style={styles.photo} />
                            ) : (
                                <div style={styles.photoPlaceholder}>SEM FOTO</div>
                            )}
                        </div>

                        <div style={styles.infoGrid}>
                            <InfoField label="Nome Completo" value={currentUser?.nome} />
                            <InfoField label="CPF" value={formatarCPF(cpf)} />
                            <InfoField label="Data de Nascimento" value={currentUser?.dataNascimento} />
                            <InfoField label="Código de Uso" value={currentUser?.codigoUso} />
                            <InfoField label="Instituição" value={currentUser?.instituicao} />
                            <InfoField label="Emissor" value="UEB (UEB NEGOCIOS E SERVICOS LTDA)" />
                        </div>
                    </div>

                    {/* CERTIFICADO DIGITAL */}
                    <div style={styles.certHeader}>Certificado de Atributo:</div>
                    <CertificateDisplay content={textCode} />

                    <footer style={styles.footer}>
                        Validação Oficial Digital
                    </footer>
                </div>
            </div>
            <Footer />
        </>
    );
}

// COMPONENTES AUXILIARES
function InfoField({ label, value }) {
    return (
        <div style={styles.infoField}>
            <span style={styles.fieldLabel}>{label}</span>
            <span style={styles.fieldValue}>{value || '---'}</span>
        </div>
    );
}

function CertificateDisplay({ content }) {
    return (
        <div style={styles.certContainer}>
            <div style={styles.certTag}>-----BEGIN CERTIFICATE-----</div>
            <div style={styles.certScroll}>{content}</div>
        </div>
    );
}

function formatarCPF(cpf) {
    if (!cpf) return '';
    const cleanCpf = cpf.replace(/\D/g, '');
    return cleanCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

// ESTILOS CORRIGIDOS
const styles = {
    pageWrapper: { backgroundColor: COLORS.bg, minHeight: '100vh', display: 'flex', justifyContent: 'center', padding: '20px 10px' },
    container: { width: '100%', maxWidth: '450px', backgroundColor: COLORS.white, borderRadius: '20px', padding: '25px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', height: 'fit-content' },
    header: { textAlign: 'center', marginBottom: '20px' },
    title: { fontSize: '20px', color: COLORS.primary, margin: 0, fontWeight: '800' },
    subtitle: { fontSize: '10px', color: COLORS.lightText, marginTop: '4px', letterSpacing: '1px' },
    statusBadge: { backgroundColor: COLORS.successBg, color: COLORS.success, padding: '10px', borderRadius: '10px', textAlign: 'center', fontSize: '13px', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '20px' },
    statusDot: { width: 8, height: 8, borderRadius: '50%', backgroundColor: COLORS.success },
    atestacaoBox: { marginBottom: '20px' },
    atestacaoText: { fontSize: '12px', color: COLORS.text, lineHeight: '1.5', textAlign: 'left', margin: 0 },
    divider: { height: '1px', backgroundColor: COLORS.border, marginBottom: '20px' },
    profileSection: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' },
    photoWrapper: { width: '100px', height: '130px', borderRadius: '12px', overflow: 'hidden', border: `3px solid ${COLORS.white}`, boxShadow: '0 4px 10px rgba(0,0,0,0.1)' },
    photo: { width: '100%', height: '100%', objectFit: 'cover' },
    photoPlaceholder: { width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0f0f0', fontSize: '10px', color: '#999' },
    infoGrid: { width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' },
    infoField: { display: 'flex', flexDirection: 'column', borderBottom: `1px solid ${COLORS.border}`, paddingBottom: '6px' },
    fieldLabel: { fontSize: '9px', color: COLORS.lightText, textTransform: 'uppercase', fontWeight: 'bold' },
    fieldValue: { fontSize: '13px', color: COLORS.text, fontWeight: '500', marginTop: '2px' },
    certHeader: { fontSize: '13px', fontWeight: '700', marginTop: '25px', marginBottom: '8px' },
    certContainer: { backgroundColor: '#F3F4F6', padding: '12px', borderRadius: '10px', border: `1px solid ${COLORS.border}` },
    certTag: { fontSize: '9px', color: '#999', textAlign: 'center', marginBottom: '5px', fontFamily: 'monospace' },
    certScroll: { fontSize: '9px', color: '#666', wordBreak: 'break-all', fontFamily: 'monospace', maxHeight: '80px', overflowY: 'auto' },
    footer: { textAlign: 'center', fontSize: '10px', color: COLORS.lightText, marginTop: '25px' },
    center: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontFamily: 'sans-serif', color: COLORS.text }
};

const textCode = "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"