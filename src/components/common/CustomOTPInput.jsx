import React, { useState } from 'react';

const CustomOtpInput = ({ numInputs = 6, onChange }) => {
  const [otp, setOtp] = useState(Array(numInputs).fill(''));

  const handleChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value.substring(0, 1); // Only take the first character
    setOtp(newOtp);
    onChange(newOtp.join(''));

    // Move to the next input
    if (value && index < numInputs - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index]) {
      if (index > 0) {
        document.getElementById(`otp-input-${index - 1}`).focus();
      }
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      {otp.map((value, index) => (
        <input
          key={index}
          id={`otp-input-${index}`}
          type="text"
          value={value}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          style={{
            width: '50px',
            height: '50px',
            margin: '0 5px',
            fontSize: '24px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            textAlign: 'center',
          }}
          maxLength={1} // Only allow one character
        />
      ))}
    </div>
  );
};

export default CustomOtpInput