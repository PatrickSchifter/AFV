import styled from "styled-components";
import { FaUpload, FaCamera, FaExpand } from "react-icons/fa";
import { AiOutlineCloudUpload, AiOutlineCamera, AiOutlineCloseCircle } from "react-icons/ai";
import { useState, useRef } from "react";

import PopUpSecondary from "../PopUpSecondary";
import ButtonEnviar from '../../components/ButtonEnviar';
import ButtonCancelar from '../../components/ButtonCancelar';

const Main = styled.div`
    display: ${props => props.show ? 'flex' : 'none'};
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    height: 40px;
    background-color: #F8F9FA;  
    border-top: 1px solid #E9ECEF;
    position: absolute;
    top: 77%;
    left: 0%;
`
const Upload = styled(FaUpload)`
    color: #bdbdbd;

    &:hover{
        color: #696969
    }
`

const Camera = styled(FaCamera)`
color: #bdbdbd;

&:hover{
    color: #696969
}
`

const Expand = styled(FaExpand)`
color: #bdbdbd;

&:hover{
    color: #696969
}
`

const MainPopUp = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 80%;
`

const ContainerCenter = styled.div`
    display:flex;
    height: 80px;
    width: 100%;
`

const InfoPopUp = styled.h1`
    font-weight: 100;
`

const ContainerButtons = styled.div`
    display: flex;
    border-left: 1px solid #E9ECEF;
    width: 75%;
`

const ContainerButton = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    width: 33%;
    cursor: pointer;
    font-weight: 300;

`
const UploadPopUp = styled(AiOutlineCloudUpload)`
    color: black;
    height: 70%;
    width: 100%;
`

const CameraPopUp = styled(AiOutlineCamera)`
    color: black;
    height: 70%;
    width: 100%;
`

const RemovePopUp = styled(AiOutlineCloseCircle)`
    color: black;
    height: 70%;
    width: 100%;
`

const ContainerImage = styled.div`
`

const ContainerCenterUploaded = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`

const ContainerInfoFile = styled.div`
    width: 60%;
    margin-left: 20px;
`

const ContainerActionButtons = styled.div`
    display: flex;
`

const MenuUploadImage = ({show, dispatch, setShowMenuImg}) => {

    const [openPopUp, setOpenPopUp] = useState(false);
    const fileInputRef = useRef(null);
    const [srcImg, setSrcImg] = useState('');
    const [fileUploaded, setFileUploaded] = useState(false);
    const [fileInfo, setFileInfo] = useState(null)

    const handleClickUpload = () => {
        setOpenPopUp(true);
    }

    const handleFileInputChange = async () => {
        const file = await fileInputRef.current.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSrcImg(reader.result);
                setFileUploaded(true);
                setFileInfo(file);
            };
            reader.readAsDataURL(file);
        }
    }

    const handleClickCancelar = () => {
        setFileUploaded(false);
        setSrcImg('');
        setFileInfo(null);
    }

    const handleClickEnviar = () => {

        fetch(srcImg)
        .then(response => response.blob())
        .then(blob => {
            const reader = new FileReader();
            reader.onloadend = () => {
            const arrayBuffer = reader.result; 
            dispatch({type: 'setFoto', payload: arrayBuffer});
            };
            reader.readAsArrayBuffer(blob);
        })
        .catch(error => {
            console.error('Erro ao obter a imagem:', error);
        });

        setFileUploaded(false);
        setSrcImg('');
        setFileInfo(null);
        setOpenPopUp(false);
    }

    const handleClickRomover = () => {
        dispatch({type: 'setFoto', payload: null});
        setOpenPopUp(false);
    }

    return (
        <>
            <Main show={show}>
                <Upload onClick={handleClickUpload} />
                <Camera />
                <Expand />
            </Main>
            <PopUpSecondary openPopUp={openPopUp} setOpenPopUp={setOpenPopUp} width={'600px'} height={'306px'}>
                <MainPopUp>
                    {!fileUploaded ? 
                    <ContainerCenter>
                        <InfoPopUp>
                            Enviar Arquivo
                        </InfoPopUp>
                        <ContainerButtons>
                            <ContainerButton>
                                <label htmlFor="fileInput">
                                    <UploadPopUp />  
                                    <p>Upload</p>
                                </label>                          
                                <input
                                    id="fileInput"
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileInputChange}
                                    style={{ display: 'none', cursor: 'pointer' }}
                                />
                            </ContainerButton>
                            <ContainerButton><CameraPopUp /><p>Webcam</p></ContainerButton>
                            <ContainerButton onClick={handleClickRomover}><RemovePopUp /><p>Remover</p></ContainerButton>
                        </ContainerButtons>
                    </ContainerCenter>
                    : 
                    <ContainerCenterUploaded>
                        <ContainerImage>
                            <img src={srcImg} style={{minWidth: '100px', minHeight:'100px', maxWidth:'200px', maxHeight:'200px'}} />
                        </ContainerImage>
                        <ContainerInfoFile>
                            <p>{fileInfo.name.length > 30 ? fileInfo.name.substring(0, 30) + '...': fileInfo.name}</p>
                            <p>Tamanho: {parseInt(fileInfo.size * 0.001)} KB</p>
                            <p>Tipo: {fileInfo.type}</p>
                            <ContainerActionButtons>
                                <ButtonCancelar onClick={handleClickCancelar} />
                                <ButtonEnviar onClick={handleClickEnviar} />
                            </ContainerActionButtons>
                        </ContainerInfoFile>
                    </ContainerCenterUploaded>}
                </MainPopUp>
            </PopUpSecondary>
        </>
    )
}

export default MenuUploadImage