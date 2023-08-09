import styled from "styled-components";

const Main = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    border: 1px solid #dfdfdf;  
    border-radius: 10px;
    width: ${props => props.width ? props.width : '100px'};
    height: ${props => props.height ? props.height : '70px'};
    margin: ${props => props.margin ? props.margin : '0'};

    position: relative;
`

const Title = styled.p`
    font-family: MS Sans Serif, sans-serif;
    font-size: 16px;
    position: absolute;
    top: -10px; /* ajuste o valor conforme necessário para posicionar o título na borda superior */
    left: ${props => props.left ? props.left : '0px'};
    transform: translateX(-50%);
    background-color: rgba(255, 255, 255, 0.8);
    padding: 0 10px;
    
`
const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 97%;
    height: calc(100%);
`

const Frame = ({title, children, height, width, margin, left, ref}) => {
    return (
        <Main ref={ref} height={height} width={width} margin={margin}>
            <Wrapper>
                <Title left={left}>{title}</Title>
                {children}
            </Wrapper>
        </Main>
    )
}

export default Frame