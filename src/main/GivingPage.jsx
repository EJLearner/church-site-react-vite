import React, {useState} from 'react';
import styled from 'styled-components';

import choir from '../assets/images/choir.jpg';

import MainMenubar from './commonComponents/MainMenubar';
import PlainButton from './commonComponents/PlainButton';
import Select from './commonComponents/Select';
import SelectState from './commonComponents/SelectState';
import Textbox from './commonComponents/Textbox';

const StyledGivingPage = styled.div`
  background-color: var(--top-content-background);
  min-height: 100%;

  .content {
    color: var(--top-content-text);
    padding-top: 32px;
    padding-bottom: var(--page-bottom-padding);
  }

  h1 {
    font-weight: normal;
    line-height: 120%;
    margin: 0 320px 16px;
    text-align: center;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .input-fields {
    display: flex;

    margin-bottom: 32px;

    select {
      background-color: white;
    }
  }

  .add-another {
    min-height: 40px;
  }

  .donate-button {
    background-color: var(--accent-background);
    border-radius: 4px;
    color: var(--accent-content);
    letter-spacing: 2px;
    text-align: center;
    font-size: 16px;
    padding: 8px;
    text-transform: uppercase;
    width: 250px;
  }
`;

const USE_TEST_DATA = false;

const testUserInfo = {
  address1: 'My Address',
  address2: 'Address Line 2',
  city: 'City',
  email: 'test@somethwere.com',
  first_name: 'First',
  last_name: 'Last',
  night_phone_a: '4109440396',
  state: 'MD',
  zip: '21216',
};

const donationTypeOptions = [
  {label: 'Tithes', value: 'tithes'},
  {label: 'Capital Campaign', value: 'capital-campaign'},
  {label: 'Audio/Visual Ministry', value: 'audovisual'},
  {label: 'General Offering', value: 'general'},
  {label: 'Benevolence', value: 'benevolence'},
  {label: 'Building Fund', value: 'building'},
  {label: 'Outreach', value: 'outreach'},
  {label: 'Missions', value: 'missions'},
  {label: 'Sunday School', value: 'sunday-school'},
  {label: 'Donation', value: 'donation'},
  {label: 'William Bryant Scholarship Fund', value: 'scholarship'},
  {label: 'Youth Ministry', value: 'youth'},
];

const initialDonationTypeInfo = donationTypeOptions.map((option, index) => {
  return index
    ? {}
    : {amount: USE_TEST_DATA ? '10.00' : undefined, type: option.value};
});

const getCurrentSelectOptions = (selectedValue, amounts) => {
  return donationTypeOptions.filter((option) => {
    const selectedByThisSelect = option.value === selectedValue;
    const selectedValues = amounts.map(({type}) => type).filter(Boolean);
    const selectedByAnySelect = selectedValues.includes(option.value);

    return selectedByThisSelect || !selectedByAnySelect;
  });
};

const GivingPage = () => {
  const [userInfo, setUserInfo] = useState(USE_TEST_DATA ? testUserInfo : {});
  const [amounts, setAmounts] = useState(initialDonationTypeInfo);

  const setUserInfoProp = (value, id) => {
    setUserInfo((currentUserInfo) => ({...currentUserInfo, [id]: value}));
  };

  const setPaymentInfo = (value, index, prop) => {
    setAmounts((currentPaymentInfo) => {
      if (!currentPaymentInfo[index]) {
        currentPaymentInfo[index] = {};
      }
      currentPaymentInfo[index][prop] = value;

      return [...currentPaymentInfo];
    });
  };

  const setPaymentAmount = (value, index) => {
    setAmounts((currentPaymentInfo) => {
      currentPaymentInfo[index].amount = value;

      return [...currentPaymentInfo];
    });
  };

  const renderStateSelect = (id, options = {}) => {
    const {hasLineBreak = true} = options;

    return (
      <>
        <SelectState
          id={id}
          onChange={(value) => setUserInfoProp(value, id)}
          value={userInfo[id] ?? ''}
        />

        {hasLineBreak && <br />}
      </>
    );
  };

  const renderTextbox = (id, label, options = {}) => {
    const {hasLineBreak = true, type, required, size = 40} = options;

    return (
      <>
        <Textbox
          id={id}
          label={label}
          onChange={(value) => setUserInfoProp(value, id)}
          required={required}
          size={size}
          type={type}
          value={userInfo[id] ?? ''}
        />

        {hasLineBreak && <br />}
      </>
    );
  };

  const renderPaymentAmount = (index, required) => {
    const currentNumber = index + 1;

    return (
      <>
        <Textbox
          id={`amount_${currentNumber}`}
          label="Amount"
          onChange={(value) => setPaymentAmount(value, index)}
          required={required}
          size={40}
          value={amounts[index].amount ?? ''}
        />
        <br />
      </>
    );
  };

  const renderPaymentboxes = (paymentInfo) => {
    return paymentInfo
      .filter((paymentItem) => paymentItem.type)
      .map((paymentItem, index) => {
        const currentNumber = index + 1;
        const droplistId = `item_name_${currentNumber}`;

        const dropListOptions = getCurrentSelectOptions(
          paymentItem.type,
          amounts,
        );

        return (
          <div className="" key={index}>
            {renderPaymentAmount(index, true)}
            <Select
              id={droplistId}
              label="Giving Type"
              onChange={(value) => setPaymentInfo(value, index, 'type')}
              options={dropListOptions}
              value={paymentItem.type}
            />
          </div>
        );
      });
  };

  const addPaymentOption = (firstUnusedType, event) => {
    const unusedPaymentItemIndex = amounts.findIndex((amount) => !amount.type);
    setPaymentInfo(firstUnusedType, unusedPaymentItemIndex, 'type');

    event.preventDefault();
  };

  const renderHiddenTextbox = (name, value) => {
    return <input name={name} type="hidden" value={value} />;
  };

  const usedTypes = amounts.map((amount) => amount.type).filter(Boolean);
  const firstUnusedType = donationTypeOptions.find(
    (option) => !usedTypes.includes(option.value),
  )?.value;

  const renderTithingFields = () => {
    return (
      <>
        {renderHiddenTextbox('cmd', '_cart')}
        {renderHiddenTextbox('upload', '1')}
        {renderPaymentboxes(amounts)}

        {Boolean(firstUnusedType) && (
          <PlainButton
            className="add-another"
            onClick={(event) => addPaymentOption(firstUnusedType, event)}
          >
            + Add another donation type
          </PlainButton>
        )}
      </>
    );
  };

  const boxNum = userInfo.box;

  return (
    <StyledGivingPage>
      <MainMenubar imageSource={choir} />
      <div className="content">
        <h1>
          Thank you for your commitment to City Temple and for your
          contribution. To make a donation, please submit the form below.
        </h1>
        <form
          action="https://www.paypal.com/cgi-bin/webscr"
          method="post"
          name="validform"
        >
          <div className="input-fields">
            <div className="left-side">
              {renderTextbox('first_name', 'First Name')}
              {renderTextbox('last_name', 'Last Name')}
              {renderTextbox('address1', 'Street Address')}
              {renderTextbox('address2', 'Street Address cont.')}
              {renderTextbox('city', 'City', {hasLineBreak: false, size: 13})}
              {renderStateSelect('state', {hasLineBreak: false})}
              {renderTextbox('zip', 'Zipcode', {size: 11})}
              {renderTextbox('email', 'Email', {required: true, type: 'email'})}
            </div>
            <div className="right-side">
              {renderTextbox('box', 'Box #')}
              {boxNum && renderHiddenTextbox('custom', `Box: ${boxNum}`)}
              {renderHiddenTextbox('business', 'giving@thecitytemple.org')}
              {renderHiddenTextbox('return', 'https://www.thecitytemple.org')}
              {renderHiddenTextbox(
                'cancel_return',
                'https://www.thecitytemple.org',
              )}
              {renderHiddenTextbox('no_shipping', '1')}
              {renderTithingFields()}
            </div>
          </div>
          <div>
            <PlainButton
              className="donate-button"
              name="submit"
              type="submit"
              value="Continue"
            >
              Donate Now
            </PlainButton>
          </div>
        </form>
      </div>
    </StyledGivingPage>
  );
};

export default GivingPage;
