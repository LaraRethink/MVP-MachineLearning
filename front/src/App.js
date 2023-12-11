import React, { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

const predictionMap = {
  1: "Nenhum método contraceptivo",
  2: "Método contraceptivo de longo prazo",
  3: "Método contraceptivo de curto prazo",
};

function App() {
  const [formData, setFormData] = useState({
    wifeAge: "18",
    wifeEducation: "1",
    husbandEducation: "1",
    numberOfChildrenEverBorn: "0",
    wifeReligion: "1",
    wifeNowWorking: "1",
    husbandOcupation: "1",
    standardOfLivingIndex: "1",
    mediaExposure: "1",
  });
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/predict",
        formData
      );

      setError(null);
      setPrediction(response.data?.prediction);
    } catch (error) {
      setError(error);
      setPrediction(null);
    }
  };

  return (
    <Container className="p-5">
      <h1>Modelo preditor de método contraceptivo usado</h1>
      <h6>
        {" "}
        O objetivo prever qual método contraceptivo uma mulher está usando no
        momento da entrevista com base em suas características demográficas e
        socioeconômicas. Os métodos contraceptivos são categorizados em nenhum
        uso, métodos de longo prazo (como esterilização) e métodos de curto
        prazo (como pílulas anticoncepcionais).
      </h6>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col xs={12} md={6}>
            <Form.Group>
              <Form.Label>Idade da esposa:</Form.Label>
              <Form.Control
                type="number"
                name="wifeAge"
                value={formData.wifeAge}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Educação da esposa:</Form.Label>
              <Form.Select
                name="wifeEducation"
                onChange={handleChange}
                value={formData.wifeEducation}
              >
                <option value="1">Nenhuma</option>
                <option value="2">Baixa</option>
                <option value="3">Média</option>
                <option value="4">Alta</option>
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label>Educação do marido:</Form.Label>
              <Form.Select
                name="husbandEducation"
                onChange={handleChange}
                value={formData.husbandEducation}
              >
                <option value="1">Nenhuma</option>
                <option value="2">Baixa</option>
                <option value="3">Média</option>
                <option value="4">Alta</option>
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label>Número de filhos nascidos:</Form.Label>
              <Form.Control
                type="number"
                name="numberOfChildrenEverBorn"
                value={formData.numberOfChildrenEverBorn}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Esposa é islamica?</Form.Label>
              <Form.Select
                name="wifeReligion"
                onChange={handleChange}
                value={formData.wifeReligion}
              >
                <option value="1">Sim</option>
                <option value="0">Não</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
            <Form.Group>
              <Form.Label>Esposa trabalha?</Form.Label>
              <Form.Select
                name="wifeNowWorking"
                onChange={handleChange}
                value={formData.wifeNowWorking}
              >
                <option value="1">Sim</option>
                <option value="0">Não</option>
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label>Ocupação do marido:</Form.Label>
              <Form.Select
                name="husbandOcupation"
                onChange={handleChange}
                value={formData.husbandOcupation}
              >
                <option value="1">Nenhum</option>
                <option value="2">Baixo nível</option>
                <option value="3">Médio nível</option>
                <option value="4">Alto nível</option>
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label>Padrão de vida:</Form.Label>
              <Form.Select
                name="standardOfLivingIndex"
                onChange={handleChange}
                value={formData.standardOfLivingIndex}
              >
                <option value="1">Muito baixo</option>
                <option value="2">Baixo</option>
                <option value="3">Médio</option>
                <option value="4">Alto</option>
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label>Exposição na mídia:</Form.Label>
              <Form.Select
                name="mediaExposure"
                onChange={handleChange}
                value={formData.mediaExposure}
              >
                <option value="1">Baixa</option>
                <option value="0">Alta</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Button type="submit" variant="primary">
          Enviar
        </Button>
      </Form>

      <Container fluid className="my-5">
        {prediction != null ? (
          <p className="border border-success p-3">
            A predição do modelo indica que o método contraceptivo em uso é:
            <br />
            {predictionMap[prediction]}
          </p>
        ) : error != null ? (
          <p className="border border-warning p-3">
            Houve um erro: {error?.message ?? JSON.stringify(error)}
          </p>
        ) : (
          <></>
        )}
      </Container>
    </Container>
  );
}

export default App;
