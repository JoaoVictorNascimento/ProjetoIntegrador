import React,
{
    useCallback, useRef, useState,
    useEffect,
} from 'react';

import {
    Button, message,
} from 'antd';
import Recaptcha from 'react-recaptcha-that-works';
import { connect } from 'react-redux';

import Alert from '../components/Alert';
import BoxContainer from '../components/BoxContainer';
import Form from '../components/Form';
import Input from '../components/Input';
import SpinnerOverlay from '../components/SpinnerOverlay';
import { extractRequestError } from '../helpers/error-helper';
import { wrapForm } from '../helpers/form-helper';
import { validatePassword } from '../helpers/validations';
import useAxios from '../hooks/use-axios';
import thunks from '../redux/thunks';

import styles from './LoginPage.module.scss';

const LoginPage = ({
    history, setAuthenticationData,
    handleSubmit, form,
}) => {
    const axios = useAxios();

    const onSubmit = useCallback(async values => {
        try {
            const body = {
                ...values,
            };
            const response = await axios.post('/login', body);
            await setAuthenticationData({
                ...response.data,
                skipRefreshToken: true,
            });

            history.push('/app');
        } catch (ex) {
            console.warn(ex);
            return extractRequestError(ex, 'Não foi possível fazer login, tente novamente mais tarde.');
        }
        return null;
    }, [axios, history, setAuthenticationData]);

    const onFormSubmit = useCallback(event => {
        event.preventDefault();
        const { valid } = form.getState();
        if (valid) {
            handleSubmit(onSubmit)(event);

        }
    }, [form, handleSubmit, onSubmit]);

    useEffect(() => {
        const { valid } = form.getState();
        if (valid) {
            handleSubmit(onSubmit)();
        }
    }, [form, handleSubmit, onSubmit]);

    const { submitting, submitError } = form.getState();

    return (
        <BoxContainer>
            <SpinnerOverlay spinning={submitting}>
                <div className={styles.header}>
                    <img
                        src={require('../assets/logo.png')}
                        alt="Lyre"
                        className={styles.logotipo}
                    />
                    <h1>Lyre</h1>
                    <span>
                        Serviço de Musicas
                    </span>
                </div>

                <Alert
                    message={submitError}
                    type="error"
                    className={styles.alertError}
                />

                <div className={styles.formContainer}>
                    <Form
                        onSubmit={onFormSubmit}
                    >
                        <Input.Field
                            name="senha"
                            placeholder="Senha"
                            type="password"
                            required
                            validate={validatePassword}
                            size="large"
                        />
                        <Button
                            type="primary"
                            block
                            loading={submitting}
                            htmlType="submit"
                            className={styles.buttonLogIn}
                            size="large"
                        >
                            Entrar
                        </Button>
                    </Form>
                </div>
            </SpinnerOverlay>
        </BoxContainer>
    );
};

const mapDispatchToProps = {
    setAuthenticationData: thunks.usuario.setAuthenticationData,
};

const LoginPageFormWrapped = wrapForm(LoginPage);

export default connect(null, mapDispatchToProps)(LoginPageFormWrapped);
