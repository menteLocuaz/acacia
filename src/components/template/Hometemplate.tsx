import styled from "styled-components";

export function Home() {
    return (
        <Container>
            <h1>home template</h1>
        </Container>
    )

}

const Container = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    height:100vh;
    overflow:hidden;
    background-color:${({ theme }) => theme.bg.total};
    color:${({ theme }) => theme.text.primary};
    width: 100%;
`