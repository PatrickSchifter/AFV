import GradeClienteEndereco from '../GradeClienteEndereco';
import styled from 'styled-components';

const Main = styled.div`
    display: flex;
    justify-content: flex-start;
    width: 100%;
`

const ClienteEnderecos = ({IDCliente}) => {
    return (
        <Main>
            <GradeClienteEndereco IDCliente={IDCliente} />
        </Main>

    )
}

export default ClienteEnderecos;