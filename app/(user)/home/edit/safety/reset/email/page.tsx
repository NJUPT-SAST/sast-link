"use client"
import classNames from 'classnames'
import styles from '../../../page.module.scss'
import resetStyles from './page.module.scss'
import Back from '@/components/back'
import { NextButton } from '@/components/button';
import { Footer } from '@/components/footer';
import { handleError } from '@/components/function';
import { InputWithLabel } from '@/components/input/inputWithLabel';
import { veriRegistAccount, sendMail } from '@/lib/apis/global';
import { RegistContext } from '@/lib/context';
import { useState, useRef, useCallback, useContext } from 'react';
import { Form } from '@/components/form';
import PageTransition from '@/components/pageTransition'
const ResetEmail = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState<
        { error: false } | { error: true; errMsg: string }
    >({ error: false });

    const veridate = useCallback((value: string) => {
        if (value === "") return "学号不可为空";
        return false;
    }, []);

    const { handleStep, handleTicket, handleUsername } =
        useContext(RegistContext);
    return (
        <div>
            <PageTransition>
                <div className={classNames(styles.settingPanel)}>
                    <Back />
                    <div className={styles.settingPanelTitle}>修改邮箱</div>
                    <div className={styles.formContainer}>
                        <Form
                            className={[resetStyles.form]}
                            onSubmit={(args) => {
                                setLoading(true);
                                if (typeof args.mail === "string") {
                                    const mail = args.mail;
                                    handleUsername(mail);
                                    veriRegistAccount(mail)
                                        .then((res) => {
                                            let ticket = "";
                                            if (res.data.Success === true) {
                                                ticket = res.data.Data.registerTicket;
                                                handleTicket(ticket);
                                                return sendMail(ticket).then((res) => {
                                                    if (res.data.Success) handleStep(1);
                                                    else setError(handleError(res.data.ErrMsg));
                                                });
                                            }
                                            setError(handleError(res.data.ErrMsg));
                                        })
                                        .catch((err) => console.log(err))
                                        .finally(() => {
                                            setLoading(false);
                                        });
                                    return;
                                }
                            }}
                            names={["mail"]}
                        >
                            <div className={`${styles.inputDiv} ${styles.mailInput}`}>
                                <InputWithLabel
                                    setErrorState={setError}
                                    veridate={veridate}
                                    label="邮箱"
                                    error={error}
                                    ref={inputRef}
                                    maxLength={9}
                                    name="mail"
                                    palceholder="邮箱"
                                >
                                </InputWithLabel>
                                <div className={resetStyles.description}>
                                    确认后，我们将会往你的邮箱发送一封验证邮件，请在验证后继续。
                                </div>
                            </div>

                            <Footer>
                                <NextButton
                                    loading={loading}
                                    onClick={(e) => {
                                        if (veridate(inputRef.current!.value)) {
                                            setError(handleError(veridate(inputRef.current!.value)));
                                            e.preventDefault();
                                        }
                                    }}
                                    type="submit"
                                />
                            </Footer>
                        </Form>
                    </div>
                </div>
            </PageTransition>
        </div>
    )
}

export default ResetEmail