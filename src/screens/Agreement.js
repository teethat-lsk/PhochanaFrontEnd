import React from "react";
import "../styles/Agreement.css";
import ScrollText from "../components/ScrollText";
import ButtonLink from "../components/ButtonLink";
import agreementText from "../config/agreement";

function Agreement() {
  return (
    <div className="agreement">
      <ScrollText h="calc(78% - 40px)" w="100%">
        {agreementText}
      </ScrollText>
      <div className="agreement_button_zone">
        <ButtonLink to="/register" height="40px">
          accept
        </ButtonLink>
        <ButtonLink to="/" height="40px" backgroundColor="transparent">
          never
        </ButtonLink>
      </div>
    </div>
  );
}

export default Agreement;
