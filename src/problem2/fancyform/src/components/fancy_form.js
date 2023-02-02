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
import Spinner from "react-spinner-material";

function FancyForm() {
  const [ethAddress, setEthAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSuccess("");

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
      // send the token
      setSuccess(
        `Successfully sent the token amount: ${amount} to address ${ethAddress}`
      );
      setEthAddress("");
      setAmount("");
      setOtp("");
    }, Math.random() * 3000);
  };

  return (
    <div className="super-center full-height">
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
          <Alert color="danger" className="fancy-form__error small-height">
            {error}
          </Alert>
        )}
        {success && (
          <Alert color="success" className="fancy-form__success small-height">
            {success}
          </Alert>
        )}
        {!success && !error && <div className="small-height"></div>}
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
        {loading && (
          <Row className="super-center original-height fancy-form__spinner_row">
            <Spinner />
          </Row>
        )}
        {!loading && (
          <div className="original-height fancy-form__spinner_row"></div>
        )}
      </Form>
    </div>
  );
}

export default FancyForm;
