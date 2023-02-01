import React, { useState } from "react";
import {
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Alert,
} from "reactstrap";
import "./fancy_form.css";

function FancyForm() {
  const [ethAddress, setEthAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!ethAddress || !amount || !otp) {
      setError("Please fill in all fields.");
      return;
    }

    if (!/^0x[a-fA-F0-9]{40}$/.test(ethAddress)) {
      setError("Invalid ETH address.");
      return;
    }

    if (!/^\d+(\.\d{1,2})?$/.test(amount)) {
      setError("Invalid amount.");
      return;
    }

    if (!/^\d{6}$/.test(otp)) {
      setError("Invalid OTP.");
      return;
    }

    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, Math.random() * 3000);
  };

  return (
    <div className="super-center">
      <Form onSubmit={handleSubmit} className="fancy-form">
        <Label>
          <h1>Send Token</h1>
        </Label>
        <FormGroup>
          <Label for="input-address">ETH Address</Label>
          <Input
            type="text"
            id="input-address"
            value={ethAddress}
            onChange={(event) => setEthAddress(event.target.value)}
            className="fancy-form__input"
          />
        </FormGroup>
        <FormGroup>
          <Label for="input-amount">Amount to send</Label>
          <Input
            type="text"
            id="input-amount"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            className="fancy-form__input"
          />
        </FormGroup>
        <FormGroup>
          <Label for="input-otp">OTP Authentication</Label>
          <Input
            type="text"
            id="input-otp"
            value={otp}
            onChange={(event) => setOtp(event.target.value)}
            className="fancy-form__input"
          />
        </FormGroup>
        {error && (
          <Alert color="danger" className="fancy-form__error">
            {error}
          </Alert>
        )}
        <Row>
          <Col xs="6" className="fancy-form__button_col">
            <Button
              className="fancy-form__clear__button"
              onClick={() => {
                setEthAddress("");
                setAmount("");
                setOtp("");
              }}
            >
              CLEAR
            </Button>
          </Col>
          <Col xs="6" className="fancy-form__button_col">
            <Button className="fancy-form__submit__button">SEND TOKENS</Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default FancyForm;
