import { useRef, useState } from 'react';
import classes from './Checkout.module.css';

const isEmpty = value => value.trim() === '';
const isNotFiveChars = value => value.trim().length === 5;

const Checkout = (props) => {
    const [formInputvalidity, setFormInputValidity] = useState({
        name: true,
        street: true,
        postalCode: true,
        city: true
    });

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalInputRef = useRef();
    const cityInputRef = useRef();

    const confirmHandler = (event) => {
        event.preventDefault();

        const entredName = nameInputRef.current.value;
        const entredStreet = streetInputRef.current.value;
        const entredPostal = postalInputRef.current.value;
        const entredCity = cityInputRef.current.value;

        const entredNameIsValid = !isEmpty(entredName);
        const entredStreetIsValid = !isEmpty(entredStreet);
        const entredPostalIsValid = isNotFiveChars(entredPostal);
        const entredCityIsValid = !isEmpty(entredCity);


        setFormInputValidity({
            name: entredCityIsValid,
            street: entredNameIsValid,
            postalCode: entredPostalIsValid,
            city: entredCityIsValid
        });

        const formIsValid =
            entredNameIsValid &&
            entredStreetIsValid &&
            entredPostalIsValid &&
            entredCityIsValid;

        console.log(entredNameIsValid,
            entredStreetIsValid,
            entredPostalIsValid,
            entredCityIsValid);

        if (!formIsValid) {
            return;
        }

        props.onConfirm({
            name: entredName,
            street: entredStreet,
            postal: entredPostal,
            city: entredCity
        });
    };

    const nameControlClasses = `${classes.control} ${formInputvalidity.name ? '' : classes.invalid
        }`;

    const streetControlClasses = `${classes.control} ${formInputvalidity.street ? '' : classes.invalid
        }`;

    const postalControlClasses = `${classes.control} ${formInputvalidity.postalCode ? '' : classes.invalid
        }`;

    const cityControlClasses = `${classes.control} ${formInputvalidity.city ? '' : classes.invalid
        }`;


    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={nameControlClasses}>
                <label htmlFor='name'>Your Name</label>
                <input
                    type='text'
                    id='name'
                    ref={nameInputRef}
                />
                {!formInputvalidity.name && <p>Please enter a vlid name!</p>}
            </div>
            <div className={streetControlClasses}>
                <label htmlFor='street'>Street</label>
                <input
                    type='text'
                    id='street'
                    ref={streetInputRef}
                />
                {!formInputvalidity.name && <p>Please enter a vlid name!</p>}
            </div>
            <div className={postalControlClasses}>
                <label htmlFor='postal'>Postal Code</label>
                <input
                    type='text'
                    id='postal'
                    ref={postalInputRef}
                />
                {!formInputvalidity.postalCode && <p>Please enter a vlid postal code(5 characters long)!</p>}
            </div>
            <div className={cityControlClasses}>
                <label htmlFor='city'>City</label>
                <input
                    type='text'
                    id='city'
                    ref={cityInputRef}
                />
                {!formInputvalidity.city && <p>Please enter a vlid postal city!</p>}
            </div>
            <div className={classes.actions}>
                <button type='button' onClick={props.onCancel}>
                    Cancel
                </button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    );
};

export default Checkout;

