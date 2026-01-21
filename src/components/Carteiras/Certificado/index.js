import { useFomaularioStorage } from '../../../storage'

export default function Certificado() {
    const { userData } = useFomaularioStorage(state => state.dados)

    const textCode = 'MIID7TCCAtUCAQEwgYwYJYwfaR7MHkxCzAJBgNBAYTAkJSMRMwEQYDVQQKDApJQ1AtQnJhc2lsMTwNAYDVQQDLC1VTklTbTYBCUkFTSUxFSVJBIERPUyBU1VRFEFOVEFINFQ1OVREFSSNVUNQVMxHTAbBNVBAMMFFNVmZmlHeUFdHuZXMgTgWyYy1ZAgBEoHDMIHApIGMlG96MOswCQVDOQGGEWJcUEwmTBEG1UECgwkSQMNLUJyYNXpbDEXDQWGB8A1UEcwMBGTQxMjESNTcwMDAxMDkDjAMBgnYBAwsMBV2BTEIMRswCQYDVQQGEwJCUjAnNBz2e5gN5VBMRYPZEGMxGDAWGBn0WNJASSJMD0FDIF2BTEILEJSQVN2TDERn0GNDAQBgUUEwJBBQUlq0U8gUgUBUWEV1ZAgRNSRVNUBQUBTIFQUJBFTRUYNtKRBdUTKFITFVMATGCSwFDCBg0TIFAOXJATUp+FGMCJUzDo1AwJzBgYAlWNTi2NgPMjQJTANMzM2EyMGQtMThhMy0MWFlLWI3NmUtMDADAxNjgyMGFMOTASBgNVHMEQwQwAjALBgNVHQ8EBAMCBeAwDQYJKoZIhvNAQEBBQADggEBADKJgMJELIfq9BLfaNpbm4wgNlbyWBChGTxZb7tR2wj9C4CAgI4CAgIASCW22TYKP43AgASDICDVTRASSDAgIBM354SDACA'

    const {
        nome = '',
        /* escolaridade = '', */
        instituicao = '',
        curso = '',
       /*  rg = '', */
        codigoUso = '',
        imagem = '',
        cpf = '',
        dataNascimento = '',
    } = Array.isArray(userData) ? userData[0] || {} : userData || {}

    const text = ` atesta que ${nome?.toUpperCase()} é estudante e está regularmente matrículado(a) em ${curso} na instituição ${instituicao}.`
    const text2 = 'MeiaEstudante.org.br não se responsabiliza por nenhum tipo de irregularidade na matrícula.'
    const valiText = 'Validação de CIE (Carteira de Identidade Estudantil)'

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            maxWidth: '500px',
            backgroundColor: '#f9fafb',
            padding: '10px',
            /*  borderRadius: '10px',
             boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', */
            fontFamily: 'sans-serif',
            margin: '20px 5px',
            boxSizing: 'border-box',
        }}>
            <h3 style={{
                fontSize: '20px',
                color: '#8BD5EF',
                marginBottom: '15px',
                fontWeight: '600',
            }}>{valiText}</h3>

            <div style={{
                backgroundColor: '#E1F5EC',
                padding: '10px',
                borderRadius: '8px',
                border: '2px solid #b8ebcd',
                textAlign: 'center',
                marginBottom: '20px',
            }}>
                <h3 style={{
                    fontSize: '12px',
                    color: '#00ab3e',
                    margin: 0,
                    fontWeight: '600',
                }}>
                    DOCUMENTO VÁLIDO
                </h3>
            </div>

            <div style={{
                fontSize: '12px',
                color: '#333',
                textAlign: 'left',
                marginBottom: '20px',
                lineHeight: '1.5',
            }}>
                <b>UEB</b>{text}<br />
                {text2}
            </div>
            <div style={{ width: '100%', borderBottom: '2px solid #3939391a' , marginBottom: '20px'}}></div>
            <div style={{
                backgroundColor: '#F9FAFB',
                /* borderRadius: '8px', */
                padding: '5px',
                /* border: '1px solid #E5E7EB', */
                width: '100%',
                boxSizing: 'border-box',
                marginBottom: '20px'
            }}>


                <div style={{
                    display: 'flex',
                    gap: '8px',
                    /* alignItems: 'flex-start' */
                    flexDirection: 'column-reverse',
                }}>
                    {imagem && (
                        <img
                            src={imagem}
                            alt="Foto do estudante"
                            style={{
                                alignSelf: 'center',
                                width: '70px',
                                height: '90px',
                                objectFit: 'cover',
                                borderRadius: '8px',
                                border: '1px solid #ccc',
                            }}
                        />
                    )}

                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div style={{
                            fontWeight: '600',
                            fontSize: '14px', 
                            color: '#111'
                        }}>Dados do estudante:</div>
                        <InfoField label="Nome:" value={nome} />
                        <InfoField label="Instituição:" value={instituicao} />
                        <InfoField label="Curso:" value={curso} />
                        <InfoField label="CPF:" value={formatarCPF(cpf)} />
                        <InfoField label="Data de Nascimento:" value={dataNascimento} />
                        <InfoField label="Código de uso:" value={codigoUso} />
                        <InfoField label="Emissor:" value="UEB" />
                    </div>
                </div>
            </div>

            <div style={{
                fontSize: '14px',
                color: '#111',
                fontWeight: '600',
                marginBottom: '10px'
            }}>
                Certificado de Atributo:
            </div>

            <CertificateDisplay title={'-----BEGIN CERTIFICATE-----'} content={textCode} />
        </div>
    )
}

function InfoField({ label, value }) {
    return (
        <div style={{ display: 'flex' }}>
            <h4 style={{
                width: '100%',
                fontSize: '12px',
                fontFamily: 'Roboto',
                fontWeight: '400'
            }}><b style={{ marginRight: '2px' }}>{label}</b>{value}</h4>
        </div>
    )
}

function formatarCPF(cpf) {
    // Remove tudo que não for número
    cpf = cpf.replace(/\D/g, '');

    // Aplica a máscara
    return cpf
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

const CertificateDisplay = ({ title, content }) => {
    return (
        <div style={{
            width: '100%',
            boxSizing: 'border-box',
            backgroundColor: '#EAEFF5',
            padding: '20px',
            borderRadius: '8px',
            /* border: '1px solid #ccc', */
            fontFamily: 'monospace',
            fontSize: '11px',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            overflow: 'auto',
            color: '#333',
        }}>
            <div style={{
                fontWeight: 'bold',
                marginBottom: '10px',
                color: '#ababab',
                textAlign: 'center',
            }}>
                {title}
            </div>
            <div>
                {content}
            </div>
        </div>
    )
}
