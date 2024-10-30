import React from 'react';
import styled from 'styled-components';
import { FaFacebook, FaWhatsapp, FaTwitter, FaInstagram } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react'; // Import QRCodeCanvas

const TicketContainer = styled.div`
  display: flex;
  width: 800px;
  background: #343a40;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  font-family: 'Arial, sans-serif';
  margin: 20px;
  color: #fff;
  position: relative;
`;

const TicketLabel = styled.div`
  background-color: #ffc371;
  padding: 40px 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  writing-mode: vertical-lr;
  text-orientation: mixed;
  font-size: 18px;
  font-weight: bold;
  font-family: 'Courier New', Courier, monospace;
  color: #343a40;
  width: 80px;
  transform: rotate(180deg);
`;

const EventDetails = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const EventTitle = styled.h2`
  font-size: 28px;
  margin-bottom: 10px;
  color: #ffc371;
  font-family: 'Gabarito', sans-serif;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const InfoLabel = styled.span`
  font-weight: bold;
  color: #ff5f6d;
  font-family: 'Gabarito', sans-serif;
`;

const UniquePrice = styled.div`
  font-size: 24px;
  color: #ff5f6d;
  font-weight: bold;
  font-family: 'Gabarito', sans-serif;
`;

const DateContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
`;

const DateItem = styled.div`
  background-color: #222;
  padding: 10px;
  border-radius: 4px;
  text-align: center;
  color: #ffc371;
  font-size: 16px;
  width: 80px;
  font-family: 'Gabarito', sans-serif;
`;

const SocialIcons = styled.div`
  position: absolute;
  top: 10px;
  right: 250px;
  display: flex;
  gap: 8px;
  svg {
    color: #ffc371;
    font-size: 20px;
    cursor: pointer;
    transition: transform 0.3s;
    &:hover {
      transform: scale(1.2);
    }
  }
`;

const RightColumn = styled.div`
  width: 200px;
  background-color: white;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-left: 2px solid #ffc371;
  color: #fff;
  font-size: 18px;
  position: relative;
`;

const QRCodeStyled = styled(QRCodeCanvas)`
  width: 150px;
  height: 150px;
`;

const QRText = styled.div`
  position: absolute;
  top: 25px;
  left: 50%;
  transform: translateX(-50%);
  color: #ffc371;
  font-weight: bold;
  font-size: 26px;
`;
const QRTexts = styled.div`
  position: absolute;
  top: 220px;
  left: 50%;
  transform: translateX(-50%);
  color: grey;
  font-weight: bold;
  font-size: 26px;
`;

function EventTicket() {
  const { ticketId } = useParams(); // Retrieve ticketId from route parameters

  return (
    <TicketContainer>
      <TicketLabel>Event Ticket</TicketLabel>
      <EventDetails>
        <EventTitle>Dance Extravaganza</EventTitle>
        <Row>
          <div>
            <InfoLabel>Time :</InfoLabel> 8:00 PM - 12:00 AM
          </div>
          <UniquePrice>
            <InfoLabel>Price:</InfoLabel> ₹25
          </UniquePrice>
        </Row>
        <DateContainer>
          <DateItem>
            <InfoLabel>Day</InfoLabel> Saturday
          </DateItem>
          <DateItem>
            <InfoLabel>Date</InfoLabel> 30/01/2002
          </DateItem>
          <DateItem>
            <InfoLabel>Month</InfoLabel> October
          </DateItem>
        </DateContainer>
        <Row>
          <InfoLabel>Location</InfoLabel> The Grand Hall, NY
        </Row>
        <Row>
          <InfoLabel>More Info</InfoLabel> www.danceextravaganza.com
        </Row>
      </EventDetails>
      <SocialIcons>
        <FaFacebook />
        <FaWhatsapp />
        <FaTwitter />
        <FaInstagram />
      </SocialIcons>
      <RightColumn>
        <QRCodeStyled value={ticketId} /> {/* Generate the QR code here */}
        <QRText>Scan Here</QRText>
        <QRTexts>{ticketId}</QRTexts>
      </RightColumn>
    </TicketContainer>
  );
}

export default EventTicket;
