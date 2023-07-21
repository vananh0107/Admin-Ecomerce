import React from 'react';
import CustomInput from '../components/CustomInput';

const ForgotPassword = () => {
  return (
    <div className="py-5" style={{ background: '#ffd333', minHeight: '100vh' }}>
      <br />
      <br />
      <br />
      <br />
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-3">
        <h6 className="text-center">Forgot Password</h6>
        <p className="text-center">
          Please enter your register email to get reset password url
        </p>
        <form>
          <CustomInput type="text" label="Email address" id="forgot" />
          <button
            className="border-0 px-3 py-2 text-white fw-bold w-100"
            style={{ background: '#ffd333' }}
            type="submit"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
