import { CheckOtpFrom, SendOtpForm } from "@/components";
import { useState } from "react";

function AuthPage() {
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState("");
  return (
    <div>
      {step === 1 && <SendOtpForm setStep={setStep} setMobile={setMobile} mobile={mobile} />}
      {step === 2 && <CheckOtpFrom mobile={mobile} setStep={setStep} />}
    </div>
  );
}

export { AuthPage };
