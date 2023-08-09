export function mask(type, value){
    let fValue;
    if(value){
        switch(type){
            case undefined:
                return value;
            case 'CPFCNPJ':
                fValue = value.replace(/[^0-9]/g, '');
                if(fValue.length === 11){
                    return `${fValue.substring(0, 3)}.${fValue.substring(3, 6)}.${fValue.substring(6, 9)}-${fValue.substring(9)}`;
                }
                else if(fValue.length === 14){
                    return `${fValue.substring(0, 2)}.${fValue.substring(2, 5)}.${fValue.substring(5, 8)}/${fValue.substring(8, 12)}.${fValue.substring(12)}`;
                }else{
                    return fValue;
                }
            case 'CEP':
                fValue = value.replace(/[^0-9]/g, '');
                if(fValue.length === 8){
                    return `${fValue.substring(0, 5)}-${fValue.substring(5)}`;
                }else{
                    return fValue
                }
            case 'TelFixo':
                fValue = value.replace(/[^0-9]/g, '');
                if(fValue.length === 8){
                    return `${fValue.substring(0, 5)}-${fValue.substring(5)}`;
                }else if(fValue.length === 10){
                    return `(${fValue.substring(0, 2)}) ${fValue.substring(2, 6)}-${fValue.substring(6)}`;
                }else{
                    return fValue
                }
            case 'TelCel':
                fValue = value.replace(/[^0-9]/g, '');
                if(fValue.length === 8){
                    return `${fValue.substring(0, 4)}-${fValue.substring(4)}`;
                }else if(fValue.length === 9){
                    return `${fValue.substring(0, 5)}-${fValue.substring(5)}`;
                }else if(fValue.length === 10){
                    return `(${fValue.substring(0, 2)}) ${fValue.substring(2, 6)}-${fValue.substring(6)}`;
                }else if(fValue.length === 11){
                    return `(${fValue.substring(0, 2)}) ${fValue.substring(2, 7)}-${fValue.substring(7)}`;
                }else{
                    return fValue
                }
            default:
                return value
        }   
    }
}

export function cleanMask(value){
    let valueMask = value
    valueMask = valueMask.replace(' ', '')
    valueMask = valueMask.replace('(', '')
    valueMask = valueMask.replace(')', '')
    valueMask = valueMask.replace('.', '')
    valueMask = valueMask.replace('-', '')
    return valueMask
}

export function handleSituacao(Situacao){
    switch(Situacao){
        case 'A':
            return 'ATIVO'
        case 'C':
            return 'CANCELADO'
        case 'B':
            return 'BLOQUEADO'
        default:
            return Situacao
    }
}

export const handleColorRowGrade = (index, selectedRow) => {
    if(index === selectedRow){
        return '#BBCAEF'
    }else if(index % 2 === 0){
        return '#ffffff'
    }else{
        return '#E9E8E8'
    }
}

export const handleBlurPercentualMaximo = (value, dispatch, type) => {
    if(value > 99.99){
        dispatch({type:type, payload:'99.99'});
    }else{
        dispatch({type:type, payload:value === '' || value === null ? null: parseFloat(value).toFixed(2)});
    }
};

export const numberFormatter = (value) => {
    const formattedNumber = value.toLocaleString('pt-BR', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    
    return formattedNumber;
}

export function formatarData(data) {
    const partes = data.split('/');

    const novaData = new Date(`${partes[1]}/${partes[0]}/${partes[2]}`);

    const ano = novaData.getFullYear();
    const mes = novaData.getMonth() + 1; 
    const dia = novaData.getDate();

    const dataFormatada = `${ano}-${mes.toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')}`;

    return dataFormatada;
}

export const convertBinaryToImage = (array) => {
    const uint8Array = new Uint8Array(array);
    const blob = new Blob([uint8Array], { type: 'image/jpeg' });
    const photoUrl = URL.createObjectURL(blob);
    return photoUrl
}

export const arrayBufferToHexString = (arrayBuffer) => {
    const uint8Array = new Uint8Array(arrayBuffer);
    let hexString = '';
    for (let i = 0; i < uint8Array.length; i++) {
        let hex = uint8Array[i].toString(16);
        if (hex.length === 1) {
        hex = '0' + hex;
    }
    hexString += hex;
    }
    return hexString.toUpperCase();
};